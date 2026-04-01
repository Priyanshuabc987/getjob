import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces } from '@/lib/mock-data';
import { getCachedUserProfile } from '@/features/users/services/read';
import { ProfileView } from '@/features/users/components/ProfileView';
import { notFound } from 'next/navigation';
import { getSession } from '@/features/auth/actions';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getCachedUserProfile(id);
  
  if (!profile) return { title: 'Builder Not Found' };

  return {
    title: `${profile.displayName} | Builder Profile | PrepLinc`,
    description: `Verified proof-of-work and building history for ${profile.displayName}.`,
  };
}

export default async function PublicProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const sessionUid = await getSession();
  
  const profileData = await getCachedUserProfile(id);
  
  if (!profileData) {
    notFound();
  }

  // Filter projects owned by this user
  const userProjects = projectWorkspaces.filter(p => p.ownerId === id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="md:pl-64 pt-16">
        <main className="w-full">
          <ProfileView 
            profile={profileData} 
            projects={userProjects}
            isOwnProfile={id === sessionUid}
          />
        </main>
      </div>
    </div>
  );
}
