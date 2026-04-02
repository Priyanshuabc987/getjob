
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CreateStartupForm } from '@/features/startups/components/CreateStartupForm';
import { sectors } from '@/features/startups/sector_data';

export default async function CreateStartupPage() {

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/startups" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium font-bold">Back to Startup Hub</span>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Register Startup</h1>
            <p className="text-muted-foreground text-lg">Showcase your venture and find co-founders or builders.</p>
          </div>

          <CreateStartupForm sectors={sectors} />
        </div>
      </main>
    </div>
  );
}
