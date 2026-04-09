import { getSession } from '@/features/auth/services/read';
import { redirect } from 'next/navigation';

export default async function ProfileRedirectPage() {
  const sessionUid = await getSession();

  if (!sessionUid) {
    redirect('/login');
  }

  // Redirect to the public profile ID route
  redirect(`/profile/${sessionUid}`);
}
