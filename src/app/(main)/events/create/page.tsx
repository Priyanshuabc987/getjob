import CreateEventForm from '@/features/events/components/CreateEventForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium font-bold">Back to Events</span>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Host an Event</h1>
            <p className="text-muted-foreground text-lg">Hackathons, workshops, or building sessions. Bring the community together.</p>
          </div>
          <CreateEventForm />
        </div>
      </main>
    </div>
  );
}
