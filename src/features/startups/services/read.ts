
// src/features/startups/services/read.ts
import 'server-only';
import { cache as reactCache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { StartupProfile } from '../types';
import { STARTUPS_PER_PAGE, STARTUP_REVALIDATE_TIME } from '../constants';

/**
 * Converts a Firestore document into a serializable StartupProfile object.
 * Handles the conversion of Firestore Timestamps to ISO strings and provides default values.
 */
const startupFromDoc = (doc: DocumentSnapshot): StartupProfile => {
  const data = doc.data();
  const createdAt = data?.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();
  const name = data?.name ?? 'Startup'; // Default to 'Startup' if name is missing

  // Generate a dynamic avatar if no logo is provided
  const logo = data?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  return {
    id: doc.id,
    slug: data?.slug ?? doc.id, // Use slug, or fallback to ID
    name: name,
    logo: logo,
    tagline: data?.tagline ?? '',
    description: data?.description ?? '',
    city: data?.city ?? '',
    country: data?.country ?? '',
    stage: data?.stage ?? 'Idea',
    fundingStage: data?.fundingStage ?? 'Bootstrapped',
    sector: data?.sector ?? [],
    teamSizeMin: data?.teamSizeMin ?? 1,
    teamSizeMax: data?.teamSizeMax ?? 1,
    founderId: data?.founderId ?? '',
    openRolesCount: data?.openRolesCount ?? 0,
    projectsCount: data?.projectsCount ?? 0,
    score: data?.score ?? 0,
    createdAt: createdAt,
  } as StartupProfile;
};

/**
 * [UNCACHED WORKER] Fetches a single startup by its ID from Firestore.
 */
const _getStartupById = async (id: string) => {
  const startupDocRef = doc(db, 'startups', id);
  const startupDoc = await getDoc(startupDocRef);

  if (!startupDoc.exists()) {
    return null;
  }

  return startupFromDoc(startupDoc);
};

/**
 * [PUBLIC] Cached: Fetches a single startup by its ID.
 * Caches the result for a specific startup ID.
 * Revalidates when the startup data changes.
 */
export const getStartupById = reactCache(
  (id: string) => {
    return nextCache(
      () => _getStartupById(id),
      [`startup:${id}`],
      {
        revalidate: STARTUP_REVALIDATE_TIME,
        tags: [`startup:${id}`],
      }
    )();
  }
);

/**
 * [UNCACHED WORKER] Fetches a list of startups from Firestore.
 *
 * @param cursor - An optional Firestore DocumentSnapshot to paginate from.
 * @returns An object with the list of startups and the next cursor.
 */
const _uncachedGetStartups = async (cursor?: DocumentSnapshot) => {
  let q = query(
    collection(db, 'startups'),
    orderBy('score', 'desc'),
    limit(STARTUPS_PER_PAGE)
  );

  if (cursor) {
    q = query(q, startAfter(cursor));
  }

  try {
    const querySnapshot = await getDocs(q);
    const startups = querySnapshot.docs.map(startupFromDoc);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      startups,
      nextCursor: lastVisible || null,
    };
  } catch (error) {
    console.error("Error fetching startups:", error);
    return { startups: [], nextCursor: null };
  }
};

/**
 * [PUBLIC] Cached: Fetches the initial list of startups for the first page load.
 */
export const getCachedInitialStartups = reactCache(
  nextCache(
    () => _uncachedGetStartups(), // No cursor for the initial fetch
    ['initial-startups-list', STARTUPS_PER_PAGE.toString()],
    {
      revalidate: STARTUP_REVALIDATE_TIME,
      tags: ['startups-list', 'initial-startups'],
    }
  )
);

/**
 * [PUBLIC] Cached: Fetches the next page of startups using a cursor.
 */
export const getCachedNextPageStartups = reactCache(
  async (cursor: DocumentSnapshot) => {
    // The cache is keyed by the cursor's ID to store each page separately.
    const cachedFn = nextCache(
      () => _uncachedGetStartups(cursor),
      ['next-startups-page', cursor.id],
      {
        revalidate: STARTUP_REVALIDATE_TIME,
        tags: ['startups-list', 'paginated-startups'],
      }
    );
    return cachedFn();
  }
);
