
/**
 * @fileOverview Auth & Firestore Service
 * Handles real Firebase Authentication and User Profile persistence.
 */

import { auth, db, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserProfileData } from './types';

export const authService = {
  async signInWithGoogle(): Promise<{ user: FirebaseUser; isNewUser: boolean }> {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    return {
      user,
      isNewUser: !userDoc.exists()
    };
  },

  async createUserProfile(user: FirebaseUser): Promise<void> {
    const userDocRef = doc(db, 'users', user.uid);
    const initialProfile: UserProfileData = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Builder',
      photoURL: user.photoURL || '',
      role: 'student', // Default role
      bio: '',
      education: [],
      experience: [],
      credibilityScore: 50, // Starting score
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(userDocRef, initialProfile, { merge: true });
  },

  async updateOnboardingData(uid: string, data: Partial<UserProfileData>): Promise<void> {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      ...data,
      onboardingCompleted: true
    });
  },

  async logout(): Promise<void> {
    await signOut(auth);
  }
};
