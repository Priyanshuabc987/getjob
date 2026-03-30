'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfileData, UserPrivateData } from '@/features/auth/types';
import { cache as reactCache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';

const CACHE_DURATION = 3600; // 1 hour

/**
 * Internal un-cached fetch for public profile.
 */
async function _uncachedGetUserProfile(uid: string): Promise<UserProfileData | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data() as UserProfileData;
}

/**
 * Internal un-cached fetch for private data.
 */
async function _uncachedGetUserPrivateData(uid: string): Promise<UserPrivateData | null> {
  const docRef = doc(db, 'users_private', uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data() as UserPrivateData;
}

/**
 * Cached Public Profile using dual-layer caching (React Cache + Next Unstable Cache).
 * This function is an async Server Action that provides high-performance profile access.
 */
export const getCachedUserProfile = reactCache(
  async (uid: string): Promise<UserProfileData | null> => {
    return nextCache(
      () => _uncachedGetUserProfile(uid),
      ['user-profile', uid],
      {
        revalidate: CACHE_DURATION,
        tags: [`user:${uid}:profile`],
      }
    )();
  }
);

/**
 * Cached Private Data using dual-layer caching.
 */
export const getCachedUserPrivateData = reactCache(
  async (uid: string): Promise<UserPrivateData | null> => {
    return nextCache(
      () => _uncachedGetUserPrivateData(uid),
      ['user-private', uid],
      {
        revalidate: CACHE_DURATION,
        tags: [`user:${uid}:private`],
      }
    )();
  }
);
