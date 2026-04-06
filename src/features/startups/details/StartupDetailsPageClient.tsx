
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
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { StartupProjects } from '@/features/startups/details/components/StartupProjects';
import { ContactCard } from '@/features/startups/details/components/ContactCard';

const formatTeamSize = (min: number, max: number) => {
  if (min === 1 && max === 1) return '1';
  if (max >= 999999) return `${min}+`;
  if (min === max) return `${min}`;
  return `${min}-${max}`;
};

export function StartupDetailsPageClient({ startup }: { startup: StartupProfile }) {

  // This is a temporary solution for the mock data.
  // In a real app, this would be a proper query.
  const startupProjects = projectWorkspaces.slice(0, startup.projectsCount);
  
  // Client-side safeguard for the logo
  const logoUrl = startup.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=random`;
  const location = [startup.city, startup.country].filter(Boolean).join(', ');
  const teamSizeDisplay = formatTeamSize(startup.teamSizeMin, startup.teamSizeMax);

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <Link href="/startups" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to startups</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Header Card */}
          <div className="relative">
            <div className="h-48 w-full rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary opacity-10 absolute -top-4 -left-4 -right-4" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-32 h-32 rounded-[2rem] bg-white shadow-2xl p-2 border">
                 <img src={logoUrl} alt={startup.name} className="w-full h-full object-cover rounded-[1.5rem]" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-headline font-bold">{startup.name}</h1>
                  <Badge className="bg-primary/10 text-primary border-none">{startup.stage.toUpperCase()}</Badge>
                </div>
                <p className="text-xl font-bold text-primary">{startup.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
                   {location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {location}</span>}
                   <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {teamSizeDisplay} Builders</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold">About the Venture</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {startup.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {startup.sector.map(s => (
                <Badge key={s} variant="outline" className="rounded-xl px-4 py-1.5 border-muted text-muted-foreground font-bold text-[11px]">
                  {s.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>

          <StartupProjects projects={startupProjects} />
        </div>

        <aside className="space-y-8">
          <ContactCard startup={startup} />
        </aside>
      </div>
    </main>
  )
}
