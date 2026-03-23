"use client";

import { use, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { startups, projectWorkspaces } from '@/lib/mock-data';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Zap, 
  Rocket, 
  ArrowLeft, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function StartupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const startup = useMemo(() => startups.find(s => s.id === id), [id]);
  const startupProjects = useMemo(() => 
    projectWorkspaces.filter(p => startup?.projects.includes(p.id)), 
    [startup]
  );

  if (!startup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-headline">Startup not found</h1>
          <Button asChild><Link href="/network">Back to Hub</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/network" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Network</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Header Card */}
            <div className="relative">
              <div className="h-48 w-full rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary opacity-10 absolute -top-4 -left-4 -right-4" />
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="w-32 h-32 rounded-[2rem] bg-white shadow-2xl p-2 border">
                   <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover rounded-[1.5rem]" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-headline font-bold">{startup.name}</h1>
                    <Badge className="bg-primary/10 text-primary border-none">{startup.stage.toUpperCase()}</Badge>
                  </div>
                  <p className="text-xl font-bold text-primary">{startup.tagline}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
                     <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Global / Hybrid</span>
                     <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {startup.teamSize} Builders</span>
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

            {/* Active Projects */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <LayoutGrid className="w-6 h-6 text-primary" /> Active Projects
                </h2>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{startupProjects.length} Building</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startupProjects.map(proj => (
                  <Link key={proj.id} href={`/projects/${proj.id}`}>
                    <Card className="glass-card hover:border-primary/20 transition-all group border-none shadow-lg bg-white overflow-hidden">
                      <div className="h-32 bg-muted relative">
                        <img src={proj.coverImageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                           <h4 className="text-white font-bold">{proj.title}</h4>
                        </div>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <p className="text-xs text-muted-foreground line-clamp-2 italic">"{proj.tagline}"</p>
                        <div className="flex justify-between items-center pt-2">
                           <div className="flex items-center gap-2">
                              <TrendingUp className="w-3 h-3 text-primary" />
                              <span className="text-[10px] font-bold text-primary">{proj.stats.momentum}% Momentum</span>
                           </div>
                           <ShieldCheck className="w-4 h-4 text-primary opacity-60" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <Card className="glass-card bg-primary text-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24" />
              </div>
              <CardContent className="p-8 space-y-6 relative z-10">
                 <h3 className="font-headline text-2xl font-bold">Open Roles</h3>
                 <div className="space-y-4">
                   {startup.openRoles.length > 0 ? startup.openRoles.map(role => (
                     <div key={role} className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/20 group cursor-pointer hover:bg-white/20 transition-colors">
                        <span className="text-sm font-bold">{role}</span>
                        <Zap className="w-4 h-4 text-orange-400 group-hover:scale-125 transition-transform" />
                     </div>
                   )) : (
                     <p className="text-sm text-white/60">No open roles currently.</p>
                   )}
                 </div>
                 <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold shadow-xl">
                   Join as Collaborator
                 </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-none shadow-lg bg-white rounded-[2.5rem]">
               <CardHeader className="p-8 border-b">
                 <h3 className="font-headline text-lg font-bold">Contact & Links</h3>
               </CardHeader>
               <CardContent className="p-8 space-y-4">
                 {[
                   { label: 'Official Website', icon: Globe },
                   { label: 'LinkedIn Page', icon: Users },
                   { label: 'Founder Profile', icon: Rocket }
                 ].map(link => (
                   <Button key={link.label} variant="ghost" className="w-full justify-between hover:bg-primary/5 rounded-xl h-12 text-muted-foreground hover:text-primary">
                      <div className="flex items-center gap-3">
                         <link.icon className="w-5 h-5" />
                         <span className="text-sm font-bold">{link.label}</span>
                      </div>
                      <ExternalLink className="w-4 h-4" />
                   </Button>
                 ))}
               </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
