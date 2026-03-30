import { Navbar } from '@/components/layout/Navbar';
import { currentUser as mockUser, projectWorkspaces } from '@/lib/mock-data';
import { getCachedUserProfile } from '@/features/users/services/read';
import { ProfileView } from '@/features/users/components/ProfileView';

// NOTE: In a production app with real auth, we would get the UID from a session cookie
// For this prototype, we'll default to the mock user if no ID is provided, 
// but the architecture is ready for server-side fetching.

export default async function ProfilePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ id?: string }> 
}) {
  const { id } = await searchParams;
  const userId = id || mockUser.id;
  
  // Attempt to fetch real data from Firestore (Server-side)
  const profileData = await getCachedUserProfile(userId);
  
  // Filter projects owned by this user
  const myProjects = projectWorkspaces.filter(p => p.ownerId === userId);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <ProfileView 
          profile={profileData || mockUser} 
          projects={myProjects}
          isOwnProfile={!id || id === mockUser.id}
        />
      </main>
    </div>
  );
}
