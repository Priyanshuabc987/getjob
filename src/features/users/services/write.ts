
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { UserProfileData } from '../types';
import { revalidateTag } from 'next/cache';

/**
 * Initialize a new user in both public and private collections.
 */
export async function createInitialUser(
  uid: string, 
  email: string,
  displayName: string,
  photoURL: string
): Promise<void> {
  const publicRef = doc(db, 'users', uid);
  const privateRef = doc(db, 'users_private', uid);

  const timestamp = new Date().toISOString();
  const defaultBanner = `https://picsum.photos/seed/${uid}/1200/400`;

  await Promise.all([
    setDoc(publicRef, {
      uid,
      displayName,
      photoURL,
      bannerUrl: defaultBanner,
      role: 'builder',
      domains: [],
      experienceLevel: 'Beginner',
      goals: [],
      collegeName: '',
      location: { city: '', country: 'India' },
      credibilityScore: 50,
      onboardingCompleted: false,
      lastLogin: timestamp,
      createdAt: timestamp,
    }, { merge: true }),
    setDoc(privateRef, {
      uid,
      email,
      accountStatus: 'active',
      lastLogin: timestamp
    }, { merge: true })
  ]);
  
  revalidateTag(`user:${uid}:profile`);
  revalidateTag(`user:${uid}:private`);
}

/**
 * Update the public user profile after onboarding.
 */
export async function completeOnboarding(
  uid: string, 
  data: Partial<UserProfileData>
): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    ...data,
    onboardingCompleted: true,
    lastLogin: new Date().toISOString()
  });
  
  revalidateTag(`user:${uid}:profile`);
}

/**
 * Record a new login timestamp.
 */
export async function recordLogin(uid: string): Promise<void> {
  const publicRef = doc(db, 'users', uid);
  const privateRef = doc(db, 'users_private', uid);
  const timestamp = new Date().toISOString();

  await Promise.all([
    updateDoc(publicRef, { lastLogin: timestamp }),
    updateDoc(privateRef, { lastLogin: timestamp })
  ]);

  revalidateTag(`user:${uid}:profile`);
  revalidateTag(`user:${uid}:private`);
}
