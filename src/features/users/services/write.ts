'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { UserProfileData, EducationEntry, ExperienceEntry } from '../types';
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
  
  await Promise.all([
    setDoc(publicRef, {
      uid,
      displayName,
      photoURL,
      bannerUrl: '',
      bio: '',
      role: 'builder',
      domains: [],
      experienceLevel: 'Beginner',
      goals: [],
      collegeName: '',
      location: { city: '', country: '' },
      credibilityScore: 50,
      onboardingCompleted: false,
      education: [],
      experience: [],
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
 * Update the public user profile.
 */
export async function updateProfile(
  uid: string, 
  data: Partial<UserProfileData>
): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    ...data,
    lastLogin: new Date().toISOString()
  });
  
  revalidateTag(`user:${uid}:profile`);
}

export async function addEducation(uid: string, entry: EducationEntry) {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    education: arrayUnion(entry)
  });
  revalidateTag(`user:${uid}:profile`);
}

export async function removeEducation(uid: string, entry: EducationEntry) {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    education: arrayRemove(entry)
  });
  revalidateTag(`user:${uid}:profile`);
}

export async function addExperience(uid: string, entry: ExperienceEntry) {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    experience: arrayUnion(entry)
  });
  revalidateTag(`user:${uid}:profile`);
}

export async function removeExperience(uid: string, entry: ExperienceEntry) {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    experience: arrayRemove(entry)
  });
  revalidateTag(`user:${uid}:profile`);
}

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

export async function recordLogin(uid: string): Promise<void> {
  const publicRef = doc(db, 'users', uid);
  const timestamp = new Date().toISOString();
  await updateDoc(publicRef, { lastLogin: timestamp });
  revalidateTag(`user:${uid}:profile`);
}
