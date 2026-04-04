// src/app/(main)/startups/page.tsx
import { StartupsPageContent } from '@/features/startups/components/StartupsPageContent';
import { getCachedInitialStartups } from '@/features/startups/services/read';
import { StartupProfile } from '@/features/startups/types';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Startup Discovery | ${APP_NAME}`,
  description: 'Find student-led startups and join as a collaborator.',
};

export default async function StartupsPage() {
  const { startups, nextCursor } = await getCachedInitialStartups();

  // We need to pass a serializable cursor to the client.
  // The DocumentSnapshot is not serializable.
  // A simple way is to pass the whole document data and then re-construct the snapshot on the client.
  // However, for Firestore, we can just pass the ID and use that to get the document again for the next query.
  const serializableCursor = nextCursor ? nextCursor.id : null;


  return <StartupsPageContent initialStartups={startups as StartupProfile[]} initialNextCursor={serializableCursor} />;
}
