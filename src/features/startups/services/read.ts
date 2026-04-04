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
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { StartupProfile } from '../types';
import { STARTUPS_PER_PAGE, STARTUP_REVALIDATE_TIME } from '../constants';

/**
 * Converts a Firestore document into a serializable StartupProfile object.
 * Handles the conversion of Firestore Timestamps to ISO strings.
 */
const startupFromDoc = (doc: QueryDocumentSnapshot): StartupProfile => {
  const data = doc.data();
  // Convert Firestore Timestamp to a serializable format (ISO string)
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();

  return {
    id: doc.id,
    name: data.name,
    logo: data.logo,
    tagline: data.tagline,
    description: data.description,
    city: data.city, 
    country: data.country,
    stage: data.stage,
    fundingStage: data.fundingStage,
    sector: data.sector,
    teamSize: data.teamSize,
    founderId: data.founderId,
    openRolesCount: data.openRolesCount,
    projectsCount: data.projectsCount,
    score: data.score,
    createdAt: createdAt,
  } as StartupProfile;
};

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
