import { LoginPageComponent } from '@/features/auth/components/LoginPageComponent';
import { getSession } from '@/features/auth/services/read';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect('/feed');
  }

  return <LoginPageComponent />;
}
