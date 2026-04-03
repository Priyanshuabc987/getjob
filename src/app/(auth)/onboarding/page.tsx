import { OnboardingFlow } from '@/features/auth/components/OnboardingFlow';
import { getSession } from '@/features/auth/services/read';
import { redirect } from 'next/navigation';
import { getCachedUserProfile } from '@/features/users/services/read';

export const metadata = {
  title: 'Setup Your Builder Profile | PrepLinc',
  description: 'Add your education and experience to get noticed by top startups.',
};

export default async function OnboardingPage() {
  const sessionUid = await getSession();

  if (!sessionUid) {
    redirect('/login');
  }

  const profile = await getCachedUserProfile(sessionUid);
  
  // If profile is already complete, redirect to feed
  if (profile?.onboardingCompleted) {
    redirect('/feed');
  }

  return <OnboardingFlow />;
}
