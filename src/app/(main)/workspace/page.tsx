import { MyProjectsContent } from '@/features/projects/components/MyProjectsContent';
import { getSession } from '@/features/auth/services/read';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'My Workspace | PrepLinc',
  description: 'Manage your projects, post proof, and build your credibility.',
};

export default async function WorkspacePage() {
  const sessionUid = await getSession();

  if (!sessionUid) {
    redirect('/login');
  }

  return <MyProjectsContent />;
}
