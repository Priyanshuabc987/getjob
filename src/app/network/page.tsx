"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { currentUser } from '@/lib/mock-data';
import { Users, UserPlus, MapPin, Target, Sparkles, Zap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { aiConnectionsDiscovery, type AIConnectionsDiscoveryOutput } from '@/ai/flows/ai-connections-discovery';

export default function NetworkPage() {
  const [suggestions, setSuggestions] = useState<AIConnectionsDiscoveryOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSuggestions() {
      try {
        const data = await aiConnectionsDiscovery({
          skills: currentUser.skills,
          interests: currentUser.interests,
          pastActivities: ['Completed Landing Page Design', 'Joined Community Garden Project']
        });
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getSuggestions();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4 fill-current" /> AI Powered Networking
          </div>
          <h1 className="text-4xl font-headline mb-4">Find Your Tribe</h1>
          <p className="text-lg text-muted-foreground">Smart suggestions based on your building habits, skills, and interests.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           <Card className="glass-card lg:col-span-2 overflow-hidden">
             <CardHeader className="p-6 border-b">
                <h2 className="text-xl font-headline flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Suggested Peers
                </h2>
             </CardHeader>
             <CardContent className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Zap className="w-12 h-12 text-primary animate-bounce" />
                    <p className="text-muted-foreground font-medium">Brewing smart connections...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {suggestions?.suggestedConnections.map((peer) => (
                      <div key={peer.id} className="group relative bg-muted/40 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-primary/10">
                        <div className="absolute top-4 right-4">
                          <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full">
                            {peer.matchScore}% Match
                          </div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary">
                            <img src={`https://picsum.photos/seed/${peer.id}/200/200`} alt={peer.name} className="w-full h-full object-cover rounded-full border-2 border-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{peer.name}</h3>
                            <p className="text-xs text-muted-foreground">Looking for {peer.lookingFor}</p>
                          </div>
                          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                            {peer.commonSkills.slice(0, 3).map(skill => (
                              <span key={skill} className="text-[9px] font-bold bg-primary/5 text-primary px-2 py-0.5 rounded-md border border-primary/10">{skill}</span>
                            ))}
                          </div>
                          <div className="w-full pt-4 flex gap-2">
                            <Button className="flex-1 rounded-full h-10 gap-2">
                              Connect
                            </Button>
                            <Button variant="outline" className="w-10 h-10 p-0 rounded-full flex items-center justify-center">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </CardContent>
           </Card>

           <aside className="space-y-8">
             <Card className="glass-card bg-secondary text-white">
               <CardContent className="p-6 space-y-4">
                 <h3 className="font-headline text-xl">Start a Squad</h3>
                 <p className="text-sm text-white/80">Small groups of 5-20 people building similar ideas. Better feedback, faster growth.</p>
                 <Button className="w-full bg-white text-secondary hover:bg-white/90 rounded-full">Explore Squads</Button>
               </CardContent>
             </Card>

             <Card className="glass-card border-dashed border-2 bg-transparent">
               <CardHeader className="p-6">
                 <h3 className="font-headline text-lg flex items-center gap-2">
                   <Target className="w-5 h-5 text-primary" /> Active Hubs
                 </h3>
               </CardHeader>
               <CardContent className="p-6 pt-0 space-y-4">
                 {[
                   { name: 'Bangalore Builders', members: 1240, location: 'Remote/Hybrid' },
                   { name: 'AI Safety Research', members: 450, location: 'Online' },
                   { name: 'NextJS Ninjas', members: 890, location: 'Global' }
                 ].map((hub) => (
                   <div key={hub.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-primary/10">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                         <MapPin className="w-5 h-5 text-primary" />
                       </div>
                       <div>
                         <p className="text-sm font-bold">{hub.name}</p>
                         <p className="text-[10px] text-muted-foreground">{hub.members} active builders</p>
                       </div>
                     </div>
                     <UserPlus className="w-4 h-4 text-primary" />
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