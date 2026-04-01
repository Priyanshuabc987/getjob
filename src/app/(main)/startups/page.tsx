import { mockStartups } from '@/features/startups/data';
import { StartupsPageContent } from '@/features/startups/components/StartupsPageContent';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Startup Discovery | ${APP_NAME}`,
  description: 'Find student-led startups and join as a collaborator.',
};

export default async function StartupsPage() {
  // Data fetching logic would go here
  return <StartupsPageContent />;
}
