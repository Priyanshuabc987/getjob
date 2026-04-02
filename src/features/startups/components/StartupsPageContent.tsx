
"use client";

import { startups } from '@/lib/mock-data';
import { Rocket, Users, Plus, Globe, Search, UserPlus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function StartupsPageContent() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative">

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Rocket className="w-4 h-4" /> Startup Discovery
            </div>
            <h1 className="text-4xl font-headline mb-4">Meet the Builders</h1>
            <p className="text-lg text-muted-foreground">Find student-led startups, explore their journeys, and join as a collaborator.</p>
          </div>
          
          <Link href="/startups/create">
            <Button className="rounded-full px-8 h-14 font-bold text-lg">
              <Plus className="w-5 h-5 mr-2" /> Register Startup
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              {startups.map((startup) => (
                <Card key={startup.id} className="glass-card group overflow-hidden border-none shadow-xl bg-white">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-3xl bg-muted overflow-hidden border-4 border-white shadow-lg">
                          <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-headline font-bold">{startup.name}</h3>
                          <p className="text-primary font-bold text-sm">{startup.tagline}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-none rounded-lg text-[10px] font-bold">
                              {startup.stage.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <UserPlus className="w-5 h-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {startup.description}
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <div className="flex items-center gap-2">
                         <Users className="w-4 h-4 text-muted-foreground" />
                         <span className="text-xs font-bold text-muted-foreground">{startup.teamSize} Builders</span>
                      </div>
                      {startup.openRoles.length > 0 && (
                        <div className="flex items-center gap-2">
                           <Zap className="w-4 h-4 text-orange-500" />
                           <span className="text-xs font-bold text-orange-600">{startup.openRoles.length} Roles Open</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>

           <aside className="space-y-8">
             <Card className="glass-card bg-primary text-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
               <CardContent className="p-8 space-y-6">
                 <h3 className="font-headline text-2xl font-bold">Start a Squad</h3>
                 <p className="text-sm text-white/80 leading-relaxed">
                   Building something new? Post your idea and find co-founders.
                 </p>
                 <Button disabled className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold shadow-xl">
                   Find Co-Founders
                 </Button>
               </CardContent>
             </Card>
           </aside>
        </div>
      </main>
    </div>
  );
}
