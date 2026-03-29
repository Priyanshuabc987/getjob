"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { currentUser, projectWorkspaces } from '@/lib/mock-data';
import { 
  Share2, 
  Edit2, 
  Zap, 
  Trophy, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Eye,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const myProjects = projectWorkspaces.filter(p => p.ownerId === currentUser.id);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="relative mb-12">
          <div className="h-64 w-full rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-secondary overflow-hidden shadow-2xl relative">
             <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] mb-1">Credibility</span>
                <span className="text-4xl font-headline font-bold text-white">{currentUser.credibilityScore}</span>
             </div>
          </div>
          
          <div className="px-6 md:px-12 -mt-20 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="w-40 h-40 rounded-[2.5rem] p-1.5 bg-white shadow-2xl">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover rounded-[2rem]" />
              </div>
              <div className="mb-4">
                <h1 className="text-4xl font-headline font-bold text-foreground">{currentUser.name}</h1>
                <p className="text-primary font-bold text-lg">@{currentUser.username}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Bangalore, India</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Building for 2+ years</span>
                </div>
              </div>
            </div>
            
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button className="rounded-full gap-2 px-8 h-12 action-button-glow font-bold">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rounded-[2rem]">
                <DialogHeader><DialogTitle className="text-2xl font-headline">Update Your Showcase</DialogTitle></DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={currentUser.name} className="rounded-xl" /></div>
                  <div className="space-y-2"><Label>Bio</Label><Textarea defaultValue={currentUser.bio} className="rounded-xl" /></div>
                  <div className="space-y-2"><Label>Core Skills (comma separated)</Label><Input defaultValue={currentUser.skills.join(', ')} className="rounded-xl" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Degree</Label><Input placeholder="B.Tech CS" className="rounded-xl" /></div>
                    <div className="space-y-2"><Label>College</Label><Input placeholder="IIT Delhi" className="rounded-xl" /></div>
                  </div>
                </div>
                <DialogFooter><Button className="w-full rounded-full h-12 action-button-glow font-bold">Save Changes</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-8">
            <Card className="glass-card border-none shadow-xl rounded-[2rem] bg-white p-8">
               <h3 className="font-headline text-lg font-bold mb-6 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Professional History</h3>
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Experiences</p>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                         <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0"><Briefcase className="w-5 h-5 text-primary" /></div>
                         <div><p className="text-sm font-bold leading-none">Frontend Intern</p><p className="text-xs text-muted-foreground">ZettaCloud • 2023</p></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Education</p>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                         <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0"><GraduationCap className="w-5 h-5 text-secondary" /></div>
                         <div><p className="text-sm font-bold leading-none">B.Tech Computer Science</p><p className="text-xs text-muted-foreground">IIT Bombay • 2021-2025</p></div>
                      </div>
                    </div>
                  </div>
               </div>
            </Card>

            <Card className="glass-card border-none bg-primary text-white shadow-2xl rounded-[2rem] p-8 text-center space-y-6">
                 <div>
                    <p className="text-[11px] font-bold text-white/60 uppercase tracking-[0.3em] mb-2">Total Proof Earnings</p>
                    <div className="text-5xl font-headline font-bold">{currentUser.earnings}</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                    <div><p className="text-2xl font-bold">{currentUser.stats.tasksCompleted}</p><p className="text-[10px] text-white/60 font-bold">Tasks</p></div>
                    <div><p className="text-2xl font-bold">{currentUser.stats.collaborations}</p><p className="text-[10px] text-white/60 font-bold">Squads</p></div>
                 </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="bg-white p-1.5 rounded-[2rem] w-full h-auto mb-10 shadow-sm border border-muted">
                <TabsTrigger value="portfolio" className="flex-1 rounded-[1.5rem] py-4 gap-2 font-bold"><Eye className="w-4 h-4" /> Proof Portfolio</TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1 rounded-[1.5rem] py-4 gap-2 font-bold"><Zap className="w-4 h-4" /> Micro-Jobs</TabsTrigger>
                <TabsTrigger value="achievements" className="flex-1 rounded-[1.5rem] py-4 gap-2 font-bold"><Trophy className="w-4 h-4" /> Badges</TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {myProjects.map((project) => (
                  <Card key={project.id} className="glass-card group overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white">
                    <div className="h-48 bg-muted relative">
                      <img src={project.coverImageUrl} className="w-full h-full object-cover" alt={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-6 left-8"><h3 className="text-3xl font-headline font-bold text-white">{project.title}</h3></div>
                    </div>
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => <Badge key={tag} className="bg-primary/5 text-primary border-none text-[10px] font-bold">#{tag.toUpperCase()}</Badge>)}
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex -space-x-3">{project.team.map((mate, i) => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-muted overflow-hidden"><img src={mate.avatarUrl} className="w-full h-full object-cover" alt="" /></div>)}</div>
                         <Link href={`/projects/${project.id}`}><Button variant="ghost" className="text-primary font-bold">View Roadmap <ChevronRight className="w-4 h-4" /></Button></Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
