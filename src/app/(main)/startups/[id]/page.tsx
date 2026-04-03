
import { startups } from '@/lib/mock-data';
import { StartupDetailsPageClient } from '@/features/startups/details/StartupDetailsPageClient';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';

export default async function StartupDetailsPage({ params }: { params: { id: string } }) {
  const resolvedparams = await params ;
  const startup = startups.find(s => s.id === resolvedparams.id);

  if (!startup) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
        <Navbar />
        <StartupDetailsPageClient startup={startup} />
    </div>
  );
}
