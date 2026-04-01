import { events } from '@/features/events/data';
import { EventsPageContent } from '@/features/events/components/EventsPageContent';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Events & Hackathons | ${APP_NAME}`,
  description: 'Participate in hackathons and workshops to turn events into real work.',
};

export default async function EventsPage() {
  // Data fetching logic would go here
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <EventsPageContent events={events} />
    </div>
  );
}
