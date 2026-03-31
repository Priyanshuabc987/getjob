import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces } from '@/lib/mock-data';
import { getCachedUserProfile } from '@/features/users/services/read';
import { ProfileView } from '@/features/users/components/ProfileView';
import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/actions';

export const metadata = {
  title: 'Builder Profile | PrepLinc',
  description: 'Verified proof-of-work and building history.',
};

export default async function ProfilePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ id?: string }> 
}) {
  const { id } = await searchParams;
  const sessionUid = await getSession();
  
  // Use session UID if no specific profile ID is provided in the URL
  const targetUid = id || sessionUid;

  if (!targetUid) {
    redirect('/login');
  }

  const profileData = await getCachedUserProfile(targetUid);
  
  console.log("Profile Fetch Result:", profileData ? profileData.displayName : "null");

  if (!profileData) {
    // If it's the current user and no profile exists, send to onboarding
    if (targetUid === sessionUid) {
      redirect('/onboarding');
    }
    // If looking for another user that doesn't exist
    redirect('/404');
  }

  // Filter projects owned by this user
  const userProjects = projectWorkspaces.filter(p => p.ownerId === targetUid);

  return (
    <div className="min-h-screen bg-[#F4F3F8]">
      <Navbar />
      <div className="md:pl-64 pt-16">
        <main className="w-full">
          <ProfileView 
            profile={profileData} 
            projects={userProjects}
            isOwnProfile={targetUid === sessionUid}
          />
        </main>
      </div>
    </div>
  );
}
