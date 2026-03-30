
/**
 * @fileOverview Auth Service
 * Handles Google Authentication popup.
 */

import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';

export const authService = {
  async signInWithGoogle(): Promise<FirebaseUser> {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  async logout(): Promise<void> {
    await signOut(auth);
  }
};
