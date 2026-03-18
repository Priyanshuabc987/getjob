"use client";

import { Navbar } from '@/components/layout/Navbar';
import { currentUser } from '@/lib/mock-data';
import { Share2, Edit2, Zap, Trophy, TrendingUp, ExternalLink, Mail, Github, Twitter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="h-48 w-full rounded-3xl bg-gradient-to-r from-primary to-secondary overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
          </div>
          
          <div className="px-6 md:px-12 -mt-16 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="w-32 h-32 rounded-3xl p-1 bg-white shadow-2xl">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-headline font-bold text-foreground">{currentUser.name}</h1>
                <p className="text-primary font-medium">@{currentUser.username}</p>
              </div>
            </div>
            
            <div className="flex gap-3 mb-2">
              <Button className="rounded-full gap-2 px-6 action-button-glow">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Info */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-headline text-lg mb-2">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentUser.bio}
                  </p>
                </div>

                <div className="space-y-3">
                   <h3 className="font-headline text-lg">Skills</h3>
                   <div className="flex flex-wrap gap-2">
                     {currentUser.skills.map(skill => (
                       <Badge key={skill} variant="secondary" className="rounded-md font-medium">{skill}</Badge>
                     ))}
                   </div>
                </div>

                <div className="space-y-3">
                   <h3 className="font-headline text-lg">Socials</h3>
                   <div className="flex flex-col gap-3">
                     <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                       <Mail className="w-4 h-4" /> alex@example.com
                     </a>
                     <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                       <Github className="w-4 h-4" /> github.com/alexj
                     </a>
                     <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                       <Twitter className="w-4 h-4" /> @alex_builds
                     </a>
                     <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                       <Globe className="w-4 h-4" /> alexjohnson.me
                     </a>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-primary text-white">
              <CardContent className="p-6 text-center space-y-4">
                 <div className="text-3xl font-headline font-bold">{currentUser.earnings}</div>
                 <p className="text-sm text-white/80">Total Earnings from Tasks</p>
                 <div className="h-px bg-white/20 w-full" />
                 <div className="flex justify-around">
                    <div>
                      <p className="text-xl font-bold">{currentUser.stats.tasksCompleted}</p>
                      <p className="text-[10px] text-white/60 uppercase font-bold">Tasks Done</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{currentUser.stats.collaborations}</p>
                      <p className="text-[10px] text-white/60 uppercase font-bold">Projects</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs & Portfolio */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="bg-muted p-1 rounded-2xl w-full h-auto">
                <TabsTrigger value="portfolio" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg">
                  Portfolio Entry
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg">
                  Task Log
                </TabsTrigger>
                <TabsTrigger value="badges" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg">
                  Achivements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-8 space-y-6">
                {[1, 2].map((i) => (
                  <Card key={i} className="glass-card group overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 aspect-video md:aspect-auto bg-muted">
                        <img src={`https://picsum.photos/seed/port${i}/400/300`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Project" />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-headline">TaskFlow Dashboard {i === 1 ? 'v1' : 'v2'}</h3>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold">Completed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          Redesigned the entire admin dashboard with focus on data visualization and real-time updates using WebSockets.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="rounded-md">React</Badge>
                            <Badge variant="secondary" className="rounded-md">D3.js</Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 gap-2 rounded-full font-bold">
                            View Live <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="mt-8">
                 <div className="space-y-4">
                    {[
                      { title: 'Landing Page Hero UI', company: 'DesignFlow', reward: '₹2,500', date: 'Oct 12' },
                      { title: 'Bug Fix: Auth Flow', company: 'SwiftPay', reward: '₹1,200', date: 'Oct 10' },
                      { title: 'User Research Synthesis', company: 'Healthify', reward: '₹4,000', date: 'Oct 05' },
                    ].map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{task.title}</p>
                            <p className="text-xs text-muted-foreground">{task.company} • {task.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-headline font-bold text-primary">{task.reward}</p>
                          <p className="text-[10px] font-bold text-green-500 uppercase">Paid</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="badges" className="mt-8">
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {currentUser.badges.map(badge => (
                      <div key={badge} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white border shadow-sm group hover:scale-105 transition-all text-center space-y-3">
                         <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                           <Trophy className="w-8 h-8" />
                         </div>
                         <p className="font-bold text-sm">{badge}</p>
                         <div className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                           <TrendingUp className="w-3 h-3" /> Rare
                         </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}