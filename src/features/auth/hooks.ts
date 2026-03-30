
/**
 * @fileOverview Auth Hooks
 * React hooks to manage Firebase Auth state and navigation logic.
 */

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { authService } from './services';
import { createInitialUser, recordLogin } from '@/features/users/services/write';
import { getCachedUserProfile } from '@/features/users/services/read';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const fbUser = await authService.signInWithGoogle();
      
      // Check for existing profile on the server (via read service)
      const profile = await getCachedUserProfile(fbUser.uid);
      
      if (!profile) {
        await createInitialUser(
          fbUser.uid, 
          fbUser.email || '', 
          fbUser.displayName || 'Builder', 
          fbUser.photoURL || ''
        );
        router.push('/onboarding');
      } else {
        await recordLogin(fbUser.uid);
        if (!profile.onboardingCompleted) {
          router.push('/onboarding');
        } else {
          router.push('/feed');
        }
      }
      
      toast({
        title: "Welcome to PrepLinc!",
        description: `Successfully signed in as ${fbUser.displayName}`,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Authentication Failed",
        description: error.message || "Something went wrong during sign-in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    isLoading,
    loginWithGoogle,
    logout,
  };
}
