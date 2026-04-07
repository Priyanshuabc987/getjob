'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfileData, UserPrivateData, FounderProfile } from '../types';
import { cache as reactCache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import { PROFILE_REVALIDATE_TIME } from '../constants';

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
 * Cached Public Profile using dual-layer caching.
 */
export const getCachedUserProfile = reactCache(
  async (uid: string): Promise<UserProfileData | null> => {
    return nextCache(
      () => _uncachedGetUserProfile(uid),
      ['user-profile', uid],
      {
        revalidate: PROFILE_REVALIDATE_TIME,
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
        revalidate: PROFILE_REVALIDATE_TIME,
        tags: [`user:${uid}:private`],
      }
    )();
  }
);

/**
 * Fetches a user's public profile and returns a lightweight founder object.
 * This is built on top of the cached getCachedUserProfile function.
 * @param uid - The user ID of the founder.
 * @returns A promise that resolves to a FounderProfile object or null.
 */
export const getCachedFounderProfile = async (uid: string): Promise<FounderProfile | null> => {
    const userProfile = await getCachedUserProfile(uid);
    if (!userProfile) {
        return null;
    }

    return {
        uid: userProfile.uid,
        displayName: userProfile.displayName,
        photoURL: userProfile.photoURL,
    };
};
