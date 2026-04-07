
"use client";

import { StartupProfile } from '@/features/startups/types';
import { projectWorkspaces } from '@/lib/mock-data';
import {
  MapPin,
  Users,
  Globe,
  Zap,
  ArrowLeft,
  LayoutGrid,
  Rocket,
  ExternalLink,
  Pencil
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { StartupProjects } from '@/features/startups/details/components/StartupProjects';
import { ContactCard } from '@/features/startups/details/components/ContactCard';
import { FounderCard } from '@/features/users/components/FounderCard';
import { FounderProfile } from '@/features/users/types';
import { formatTeamSize } from '../utils';

export function StartupDetailsPageClient({ startup, founder, isFounder }: { startup: StartupProfile, founder: FounderProfile, isFounder: boolean }) {
  // This is a temporary solution for the mock data.
  // In a real app, this would be a proper query.
  const startupProjects = projectWorkspaces.slice(0, startup.projectsCount);
  // Client-side safeguard for the logo
  const logoUrl = startup.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=random`;
  const location = [startup.city, startup.country].filter(Boolean).join(', ');
  const teamSizeDisplay = formatTeamSize(startup.teamSizeMin, startup.teamSizeMax);

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
          {/* Header Card */}
          <div className="relative">
            <div className="h-48 w-full rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary opacity-10 absolute -top-4 -left-4 -right-4" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-white shadow-2xl p-2 border">
                <img src={logoUrl} alt={startup.name} className="w-full h-full object-cover rounded-[1.5rem]" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-headline font-bold">{startup.name}</h1>
                    <Badge className="bg-primary/10 text-primary border-none">{startup.stage.toUpperCase()}</Badge>
                  </div>
                  {isFounder && (
                    <Link href={`/startups/${startup.slug}/edit/basics`}>
                      <Button variant="outline" size="icon" className="ml-4 flex-shrink-0">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}

                </div>
                 
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
                  {location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {location}</span>}
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {teamSizeDisplay} Builders</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {startup.sector.map((s, index) => (
                        <span key={s} className="font-semibold">
                            {s}{index < startup.sector.length - 1 ? ',' : ''}
                        </span>
                    ))}
                </div>

              </div>
            </div>
            <p className="text-xl font-bold text-primary pt-3 pl-6 ">{startup.tagline || <span className="italic text-gray-400">Your startup's mission in a single sentence.</span>}</p>
          </div>

                  
          <div className="space-y-6">
         
            <div className="flex justify-start items-center">
              <h2 className="text-2xl font-headline font-bold pr-4">About the Venture</h2>
              {isFounder && (
                <Link href={`/startups/${startup.slug}/edit/description`}>
                  {/* <Button className="gap-2"> */}
                  <Pencil className="w-4 h-4" />
                  {/* Edit Description */}
                  {/* </Button> */}
                </Link>
              )}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {startup.description || <span className="italic text-gray-400">Tell the world about your mission. What problem are you solving? Why now? Go into more detail here.</span>}
            </p>

          </div>

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
