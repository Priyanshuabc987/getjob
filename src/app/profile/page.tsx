import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces } from '@/lib/mock-data';
import { getCachedUserProfile } from '@/features/users/services/read';
import { ProfileView } from '@/features/users/components/ProfileView';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase'; // Note: In Server Components we'd normally use a session cookie, but for this prototype we'll mock the check or use searchParams

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
  
  // In a real production app, we get the UID from the session cookie.
  // For this environment, we expect an ID or we'll need to redirect to login.
  if (!id) {
    // For demo purposes, we'll try to find any profile if no ID is passed, 
    // but in reality this should be redirect('/login');
    // For now, let's assume 'user-123' exists as our mock active user if nothing else
  }

  const userId = id || 'user-123';
  
  // Fetch real data from Firestore (Server-side)
  const profileData = await getCachedUserProfile(userId);
  
  if (!profileData) {
    // If user is logged in but has no profile, send to onboarding
    redirect('/onboarding');
  }

  // Filter projects owned by this user
  const myProjects = projectWorkspaces.filter(p => p.ownerId === userId);

  return (
    <div className="min-h-screen bg-[#F8F9FC] md:pl-64 pt-16">
      <Navbar />
      <main className="w-full">
        <ProfileView 
          profile={profileData} 
          projects={myProjects}
          isOwnProfile={!id || id === 'user-123'}
        />
      </main>
    </div>
  );
}
