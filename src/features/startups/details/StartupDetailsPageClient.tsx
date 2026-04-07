
"use client";

import { StartupProfile } from '@/features/startups/types';
import { projectWorkspaces } from '@/lib/mock-data';
import {
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { StartupProjects } from '@/features/startups/details/components/StartupProjects';
import { ContactCard } from '@/features/startups/details/components/ContactCard';
import { FounderCard } from '@/features/users/components/FounderCard';
import { FounderProfile } from '@/features/users/types';
import { StartupHeader } from '../components/StartupHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StartupDetailsPageClient({ startup, founder, isFounder }: { startup: StartupProfile, founder: FounderProfile, isFounder: boolean }) {
  // This is a temporary solution for the mock data.
  // In a real app, this would be a proper query.
  const startupProjects = projectWorkspaces.slice(0, startup.projectsCount);
  
  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/startups" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to startups</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <StartupHeader startup={startup} isFounder={isFounder} />
          
          <Card>
            <CardHeader>
              <CardTitle>About the Venture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {startup.description || <span className="italic text-gray-400">Tell the world about your mission. What problem are you solving? Why now? Go into more detail here.</span>}
              </p>
            </CardContent>
          </Card>

          <StartupProjects projects={startupProjects} />
        </div>

        <aside className="space-y-8">
          <FounderCard founder={founder} />
          <ContactCard startup={startup} isFounder={isFounder} />
        </aside>
      </div>
    </main>
  )
}
