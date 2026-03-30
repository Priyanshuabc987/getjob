
import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfileData, UserPrivateData } from '@/features/auth/types';
import { revalidateTag } from 'next/cache';

/**
 * Initialize a new user in both public and private collections
 */
export async function createInitialUser(
  uid: string, 
  publicData: Partial<UserProfileData>, 
  privateData: Partial<UserPrivateData>
): Promise<void> {
  const publicRef = doc(db, 'users', uid);
  const privateRef = doc(db, 'users_private', uid);

  await Promise.all([
    setDoc(publicRef, {
      ...publicData,
      createdAt: new Date().toISOString(),
      onboardingCompleted: false,
      credibilityScore: 50
    }, { merge: true }),
    setDoc(privateRef, {
      ...privateData,
      accountStatus: 'active',
      lastLogin: new Date().toISOString()
    }, { merge: true })
  ]);
}

/**
 * Complete onboarding and update public profile
 */
export async function completeOnboarding(
  uid: string, 
  data: Partial<UserProfileData>
): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    ...data,
    onboardingCompleted: true
  });
  
  // Revalidate cache
  revalidateTag(`user:${uid}:profile`);
}
