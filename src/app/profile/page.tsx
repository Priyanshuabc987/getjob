"use client";

import { Navbar } from '@/components/layout/Navbar';
import { currentUser, projectWorkspaces } from '@/lib/mock-data';
import { 
  Share2, 
  Edit2, 
  Zap, 
  Trophy, 
  TrendingUp, 
  ExternalLink, 
  Mail, 
  Github, 
  Twitter, 
  Globe, 
  ShieldCheck, 
  Clock, 
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function ProfilePage() {
  // Get projects owned by the user for the showcase
  const myProjects = projectWorkspaces.filter(p => p.ownerId === currentUser.id);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Profile Header - Enhanced Showcase Style */}
        <div className="relative mb-12">
          <div className="h-64 w-full rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-secondary overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             
             {/* Credibility Badge Floating */}
             <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] mb-1">Credibility</span>
                <span className="text-4xl font-headline font-bold text-white">{currentUser.credibilityScore}</span>
                <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-white" style={{ width: `${currentUser.credibilityScore}%` }} />
                </div>
             </div>
          </div>
          
          <div className="px-6 md:px-12 -mt-20 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="w-40 h-40 rounded-[2.5rem] p-1.5 bg-white shadow-2xl relative">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover rounded-[2rem]" />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-2xl shadow-lg border-4 border-white">
                   <ShieldCheck className="w-6 h-6 fill-current" />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-headline font-bold text-foreground">{currentUser.name}</h1>
                  <Badge className="bg-primary/10 text-primary border-none font-bold">TOP BUILDER</Badge>
                </div>
                <p className="text-primary font-bold text-lg">@{currentUser.username}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Bangalore, India</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Building for 2+ years</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mb-4">
              <Button className="rounded-full gap-2 px-8 h-12 action-button-glow font-bold">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-white border-none shadow-sm">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Sidebar - Quick Insights */}
          <div className="space-y-8">
            <Card className="glass-card border-none shadow-xl rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="font-headline text-lg font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" /> The Pitch
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{currentUser.bio}"
                  </p>
                </div>

                <div className="space-y-4">
                   <h3 className="font-headline text-lg font-bold">Core Stack</h3>
                   <div className="flex flex-wrap gap-2">
                     {currentUser.skills.map(skill => (
                       <Badge key={skill} variant="secondary" className="rounded-xl px-4 py-1.5 font-bold text-[11px] bg-secondary/5 text-secondary border-none hover:bg-secondary/10 transition-colors cursor-default">
                         {skill}
                       </Badge>
                     ))}
                   </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                   <h3 className="font-headline text-lg font-bold">Network</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-muted/30 p-4 rounded-3xl text-center">
                        <p className="text-2xl font-headline font-bold">{currentUser.stats.connections}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Followers</p>
                     </div>
                     <div className="bg-muted/30 p-4 rounded-3xl text-center">
                        <p className="text-2xl font-headline font-bold">12</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sponsorships</p>
                     </div>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-primary text-primary-foreground shadow-2xl rounded-[2rem] relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Trophy className="w-32 h-32" />
              </div>
              <CardContent className="p-8 text-center space-y-6 relative z-10">
                 <div>
                    <p className="text-[11px] font-bold text-primary-foreground/60 uppercase tracking-[0.3em] mb-2">Total Proof Earnings</p>
                    <div className="text-5xl font-headline font-bold">{currentUser.earnings}</div>
                 </div>
                 <div className="h-px bg-white/20 w-full" />
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold">{currentUser.stats.tasksCompleted}</p>
                      <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Verified Tasks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{currentUser.stats.collaborations}</p>
                      <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Squad Projects</p>
                    </div>
                 </div>
                 <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-12 font-bold shadow-xl">
                   View Earning History
                 </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - The Showcase Feed */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-[2rem] w-full h-auto mb-10 shadow-sm border border-white/20">
                <TabsTrigger value="portfolio" className="flex-1 rounded-[1.5rem] py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl gap-2 font-bold">
                  <Eye className="w-4 h-4" /> Proof Portfolio
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1 rounded-[1.5rem] py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl gap-2 font-bold">
                  <Zap className="w-4 h-4" /> Work History
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex-1 rounded-[1.5rem] py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl gap-2 font-bold">
                  <Trophy className="w-4 h-4" /> Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {myProjects.map((project) => (
                  <Card key={project.id} className="glass-card group overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white">
                    <div className="flex flex-col">
                      <div className="h-48 bg-muted relative overflow-hidden">
                        <img 
                          src={project.coverImageUrl || `https://picsum.photos/seed/${project.id}/1200/400`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                          alt={project.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                          <div>
                            <h3 className="text-3xl font-headline font-bold text-white mb-1">{project.title}</h3>
                            <p className="text-white/80 text-sm font-medium italic">"{project.tagline}"</p>
                          </div>
                          <Link href={`/projects/${project.id}`}>
                            <Button size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-none rounded-xl font-bold">
                              View Workspace <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map(tag => (
                            <Badge key={tag} className="bg-primary/5 text-primary border-primary/10 rounded-lg px-3 py-1 text-[10px] font-bold">#{tag.toUpperCase()}</Badge>
                          ))}
                        </div>
                        
                        <div className="space-y-6">
                           <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Key Proofs of Effort</h4>
                              <div className="text-[10px] font-bold text-primary flex items-center gap-1.5 uppercase tracking-widest">
                                <TrendingUp className="w-3 h-3" /> {project.stats.momentum}% Momentum
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Representative Progress Updates as Proof Highlights */}
                              {[
                                { title: 'v1.0 Launch', type: 'Launch', date: 'Feb 15' },
                                { title: 'Auth Architecture', type: 'Milestone', date: 'Feb 10' }
                              ].map((proof, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all cursor-default group/proof">
                                   <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover/proof:scale-110 transition-transform">
                                      {proof.type === 'Launch' ? <Zap className="w-5 h-5 text-orange-500 fill-current" /> : <ShieldCheck className="w-5 h-5 text-primary" />}
                                   </div>
                                   <div className="flex-1">
                                      <p className="text-xs font-bold leading-tight">{proof.title}</p>
                                      <p className="text-[10px] text-muted-foreground font-medium">{proof.type} • {proof.date}</p>
                                   </div>
                                   <CheckCircle2 className="w-4 h-4 text-green-500 opacity-60" />
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="mt-8 pt-8 border-t flex items-center justify-between">
                           <div className="flex -space-x-3">
                              {project.team.map((mate, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden shadow-sm">
                                   <img src={mate.avatarUrl} alt={mate.name} className="w-full h-full object-cover" />
                                </div>
                              ))}
                              <div className="w-10 h-10 rounded-full border-4 border-white bg-accent flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
                                +2
                              </div>
                           </div>
                           <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-full gap-2 group">
                             Explore Detailed Roadmap <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="mt-8 space-y-6">
                 <div className="space-y-4">
                    {[
                      { title: 'Landing Page Hero UI', company: 'DesignFlow', reward: '₹2,500', date: 'Oct 12', skills: ['React', 'Figma'] },
                      { title: 'Bug Fix: Auth Flow', company: 'SwiftPay', reward: '₹1,200', date: 'Oct 10', skills: ['TypeScript', 'Node.js'] },
                      { title: 'User Research Synthesis', company: 'Healthify', reward: '₹4,000', date: 'Oct 05', skills: ['UX Research'] },
                      { title: 'Dashboard Data Viz', company: 'FinPulse', reward: '₹3,500', date: 'Sep 28', skills: ['D3.js', 'React'] },
                    ].map((task, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] bg-white border border-transparent shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-300 group">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7 text-primary fill-primary/10" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-headline font-bold text-lg leading-tight">{task.title}</p>
                            <div className="flex items-center gap-2">
                               <span className="text-xs font-bold text-primary">{task.company}</span>
                               <span className="text-[10px] text-muted-foreground">• {task.date}</span>
                            </div>
                            <div className="flex gap-1.5 mt-2">
                               {task.skills.map(s => (
                                 <span key={s} className="text-[9px] font-bold bg-muted px-2 py-0.5 rounded-md text-muted-foreground uppercase">{s}</span>
                               ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                          <p className="font-headline font-bold text-xl text-primary">{task.reward}</p>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
                            <ShieldCheck className="w-3.5 h-3.5" /> Verified Work
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-8">
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {[
                      { name: 'Early Adopter', rarity: 'Legendary', icon: Zap },
                      { name: 'Bug Hunter', rarity: 'Rare', icon: ShieldCheck },
                      { name: 'Speed Demon', rarity: 'Common', icon: Clock },
                      { name: 'Top Builder', rarity: 'Epic', icon: Trophy },
                      { name: 'Team Player', rarity: 'Common', icon:Globe },
                      { name: 'Code Ninja', rarity: 'Rare', icon: Github },
                    ].map(badge => (
                      <div key={badge.name} className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white border border-transparent shadow-sm group hover:shadow-2xl hover:scale-105 transition-all text-center space-y-4">
                         <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                           badge.rarity === 'Legendary' ? 'bg-orange-100 text-orange-600' : 
                           badge.rarity === 'Epic' ? 'bg-purple-100 text-purple-600' :
                           badge.rarity === 'Rare' ? 'bg-blue-100 text-blue-600' : 'bg-muted text-muted-foreground'
                         }`}>
                           <badge.icon className="w-10 h-10" />
                         </div>
                         <div>
                            <p className="font-headline font-bold text-lg">{badge.name}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                               badge.rarity === 'Legendary' ? 'text-orange-600' : 
                               badge.rarity === 'Epic' ? 'text-purple-600' :
                               badge.rarity === 'Rare' ? 'text-blue-600' : 'text-muted-foreground'
                            }`}>{badge.rarity}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Recruiter CTA */}
        <div className="mt-20 text-center bg-white p-12 rounded-[3rem] shadow-xl border border-primary/5">
           <h2 className="text-3xl font-headline font-bold mb-4">Want to hire Alex for a project?</h2>
           <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
             Alex is currently open to micro-internships and collaborative projects in the EdTech and FinTech space.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="rounded-full px-10 h-14 font-bold text-lg action-button-glow">
                 <Mail className="w-5 h-5 mr-2" /> Message Alex
              </Button>
              <Button variant="outline" className="rounded-full px-10 h-14 font-bold text-lg border-primary/20 text-primary hover:bg-primary/5">
                 <CreditCard className="w-5 h-5 mr-2" /> Sponsor a Milestone
              </Button>
           </div>
        </div>
      </main>
    </div>
  );
}
