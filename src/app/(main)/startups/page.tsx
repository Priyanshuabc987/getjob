
"use client";

import { startups } from '@/lib/mock-data';
import { Rocket, Users, Plus, Globe, Search, UserPlus, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Rocket className="w-4 h-4" /> Startup Discovery
            </div>
            <h1 className="text-4xl font-headline mb-4 font-bold">Meet the Builders</h1>
            <p className="text-lg text-muted-foreground">Find student-led startups, explore their journeys, and join as a collaborator.</p>
          </div>
          
          <Button className="rounded-full px-8 h-14 font-bold text-lg action-button-glow">
            <Plus className="w-5 h-5 mr-2" /> Register Startup
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              {startups.map((startup) => (
                <Card key={startup.id} className="glass-card group overflow-hidden border-none shadow-xl bg-white hover:shadow-2xl transition-all duration-500">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-3xl bg-white overflow-hidden border-4 border-muted shadow-lg p-2">
                          <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>
                        <div>
                          <Link href={`/startups/${startup.id}`}>
                            <h3 className="text-2xl font-headline font-bold hover:text-primary transition-colors">{startup.name}</h3>
                          </Link>
                          <p className="text-primary font-bold text-sm">{startup.tagline}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-none rounded-lg text-[10px] font-bold">
                              {startup.stage.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 text-muted-foreground hover:text-primary">
                        <UserPlus className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {startup.description}
                    </p>
                    <div className="flex flex-wrap gap-6 items-center border-t pt-6">
                      <div className="flex items-center gap-2">
                         <Users className="w-4 h-4 text-primary" />
                         <span className="text-xs font-bold text-muted-foreground">{startup.teamSize} Builders</span>
                      </div>
                      {startup.openRoles.length > 0 && (
                        <div className="flex items-center gap-2">
                           <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                           <span className="text-xs font-bold text-orange-600">{startup.openRoles.length} Jobs Open</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>

           <aside className="space-y-8">
             <Card className="glass-card bg-primary text-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Building2 className="w-32 h-32" />
               </div>
               <CardContent className="p-8 space-y-6 relative z-10">
                 <h3 className="font-headline text-2xl font-bold">Start a Squad</h3>
                 <p className="text-sm text-white/80 leading-relaxed">
                   Building something new? Post your idea and find co-founders to help you grow.
                 </p>
                 <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold shadow-xl">
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
