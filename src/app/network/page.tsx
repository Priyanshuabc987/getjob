"use client";

import { Navbar } from '@/components/layout/Navbar';
import { startups, currentUser } from '@/lib/mock-data';
import { Users, UserPlus, MapPin, Building2, Zap, Search, Globe, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Rocket className="w-4 h-4" /> Startup Discovery
          </div>
          <h1 className="text-4xl font-headline mb-4">Meet the Builders</h1>
          <p className="text-lg text-muted-foreground">Find student-led startups, explore their build journeys, and join as a collaborator.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search startups by name or sector..." 
              className="pl-12 rounded-2xl h-14 bg-white border-none shadow-sm"
            />
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl bg-white border-none shadow-sm gap-2">
            <Globe className="w-4 h-4" /> All Sectors
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-headline font-bold mb-4">Active Ventures</h2>
              <div className="grid grid-cols-1 gap-6">
                {startups.map((startup) => (
                  <Card key={startup.id} className="glass-card group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-5">
                          <div className="w-20 h-20 rounded-3xl bg-muted overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                            <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{startup.name}</h3>
                            <p className="text-primary font-bold text-sm">{startup.tagline}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary" className="bg-primary/5 text-primary border-none rounded-lg text-[10px] font-bold">
                                {startup.stage.toUpperCase()}
                              </Badge>
                              {startup.sector.map(s => (
                                <Badge key={s} variant="outline" className="border-muted text-[10px] rounded-lg">
                                  {s}
                                </Badge>
                              ))}
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
                             <Zap className="w-4 h-4 text-orange-500 fill-orange-500/10" />
                             <span className="text-xs font-bold text-orange-600">{startup.openRoles.length} Roles Open</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 border-t flex justify-between items-center bg-muted/5 mt-4">
                      <div className="flex -space-x-3">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-accent overflow-hidden shadow-sm">
                             <img src={`https://picsum.photos/seed/sm${i}/100/100`} alt="Teammate" />
                           </div>
                         ))}
                      </div>
                      <Button className="rounded-full px-8 h-12 action-button-glow font-bold">
                        View Hub
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
           </div>

           <aside className="space-y-8">
             <Card className="glass-card bg-primary text-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
               <CardContent className="p-8 space-y-6">
                 <h3 className="font-headline text-2xl font-bold">Start a Squad</h3>
                 <p className="text-sm text-white/80 leading-relaxed">
                   Building something new? Post your idea and find co-founders who resonate with your vision.
                 </p>
                 <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold shadow-xl">
                   Find Co-Founders
                 </Button>
               </CardContent>
             </Card>

             <Card className="glass-card border-none shadow-lg bg-white rounded-[2.5rem]">
               <CardHeader className="p-8 border-b">
                 <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                   <Building2 className="w-5 h-5 text-primary" /> Active Hubs
                 </h3>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                 {[
                   { name: 'Bangalore Builders', members: 1240, location: 'Remote/Hybrid' },
                   { name: 'AI Safety Research', members: 450, location: 'Online' },
                   { name: 'NextJS Ninjas', members: 890, location: 'Global' }
                 ].map((hub) => (
                   <div key={hub.name} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                         <MapPin className="w-6 h-6" />
                       </div>
                       <div>
                         <p className="text-sm font-bold">{hub.name}</p>
                         <p className="text-[10px] text-muted-foreground font-bold">{hub.members} active builders</p>
                       </div>
                     </div>
                     <Button variant="ghost" size="sm" className="rounded-full text-primary h-8 px-4 font-bold">Join</Button>
                   </div>
                 ))}
               </CardContent>
             </Card>
           </aside>
        </div>
      </main>
    </div>
  );
}