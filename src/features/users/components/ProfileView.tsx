
"use client";

import { useState } from 'react';
import { 
  Edit2, 
  Zap, 
  Trophy, 
  Globe, 
  ChevronRight,
  Eye,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfileData } from '../types';
import { ProjectWorkspace, ProjectWorkspaceTeamMember } from '@/features/projects/types';

interface ProfileViewProps {
  profile: UserProfileData;
  projects: ProjectWorkspace[];
  isOwnProfile: boolean;
}

export function ProfileView({ profile, projects, isOwnProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Professional Banner & Profile Image */}
      <div className="relative mb-24 md:mb-16">
        <div className="h-48 md:h-64 w-full rounded-[1.5rem] md:rounded-[2.5rem] bg-muted overflow-hidden shadow-xl relative">
          <img 
            src={profile.bannerUrl || `https://picsum.photos/seed/${profile.uid}/1200/400`} 
            alt="Banner" 
            className="w-full h-full object-cover" 
            data-ai-hint="builder banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-xl border border-white/30 p-3 md:p-4 rounded-2xl flex flex-col items-center">
            <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest mb-1">Credibility</span>
            <span className="text-2xl md:text-4xl font-headline font-bold text-white">{profile.credibilityScore}</span>
          </div>
        </div>
        
        <div className="absolute -bottom-16 left-6 md:left-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-8 w-full pr-12">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] p-1.5 bg-white shadow-2xl shrink-0">
            <img 
              src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/200/200`} 
              alt={profile.displayName} 
              className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem]" 
              data-ai-hint="profile picture"
            />
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl md:text-4xl font-headline font-bold text-foreground">{profile.displayName}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">
                  {profile.role?.toUpperCase() || 'BUILDER'}
                </Badge>
                <span className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> {profile.location?.city || 'India'}
                </span>
              </div>
            </div>
            
            {isOwnProfile && (
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="rounded-full gap-2 px-6 h-10 md:h-12 action-button-glow font-bold text-sm">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-[2rem]">
                  <DialogHeader><DialogTitle className="text-2xl font-headline">Update Your Showcase</DialogTitle></DialogHeader>
                  <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={profile.displayName} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input defaultValue={profile.location?.city} className="rounded-xl" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="w-full rounded-full h-12 action-button-glow font-bold">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <aside className="space-y-8">
          <Card className="glass-card border-none shadow-xl rounded-[2rem] bg-white p-6 md:p-8">
             <h3 className="font-headline text-lg font-bold mb-6 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Profile Details</h3>
             <div className="space-y-6">
                <div className="space-y-4">
                   <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight">{profile.collegeName || 'Education Not Added'}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">University</p>
                      </div>
                   </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Core Domains</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains?.map((domain: string) => (
                      <Badge key={domain} variant="secondary" className="bg-muted text-muted-foreground border-none text-[10px] font-bold">
                        {domain.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
             </div>
          </Card>

          <Card className="glass-card border-none bg-primary text-white shadow-2xl rounded-[2rem] p-8 text-center space-y-6">
               <div>
                  <p className="text-[11px] font-bold text-white/60 uppercase tracking-[0.3em] mb-2">Credibility Momentum</p>
                  <div className="text-5xl font-headline font-bold">{profile.credibilityScore}</div>
               </div>
               <div className="flex justify-center items-center gap-6 border-t border-white/20 pt-6">
                  <div><p className="text-2xl font-bold">12</p><p className="text-[10px] text-white/60 font-bold uppercase">Tasks</p></div>
                  <Separator orientation="vertical" className="h-8 bg-white/20" />
                  <div><p className="text-2xl font-bold">3</p><p className="text-[10px] text-white/60 font-bold uppercase">Squads</p></div>
               </div>
          </Card>
        </aside>

        <section className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="bg-white p-1.5 rounded-[2rem] w-full h-auto mb-6 shadow-sm border border-muted">
              <TabsTrigger value="portfolio" className="flex-1 rounded-[1.5rem] py-3 md:py-4 gap-2 font-bold text-xs md:text-sm"><Eye className="w-4 h-4" /> Proof Portfolio</TabsTrigger>
              <TabsTrigger value="achievements" className="flex-1 rounded-[1.5rem] py-3 md:py-4 gap-2 font-bold text-xs md:text-sm"><Trophy className="w-4 h-4" /> Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {projects.length > 0 ? projects.map((project: ProjectWorkspace) => (
                <Card key={project.id} className="glass-card group overflow-hidden border-none shadow-xl rounded-[2rem] bg-white">
                  <div className="h-40 md:h-48 bg-muted relative">
                    <img src={project.coverImageUrl} className="w-full h-full object-cover" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <h3 className="text-2xl md:text-3xl font-headline font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag: string) => (
                        <Badge key={tag} className="bg-primary/5 text-primary border-none text-[10px] font-bold">
                          #{tag.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex -space-x-3">
                         {project.team.slice(0, 3).map((mate: ProjectWorkspaceTeamMember, i: number) => (
                           <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white bg-muted overflow-hidden">
                             <img src={mate.avatarUrl} className="w-full h-full object-cover" alt={mate.name} />
                           </div>
                         ))}
                       </div>
                       <Link href={`/projects/${project.id}`}>
                        <Button variant="ghost" className="text-primary font-bold text-sm">
                          View Roadmap <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                       </Link>
                    </div>
                  </div>
                </Card>
              )) : (
                <div className="text-center py-16 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                  <Zap className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground font-medium">No verified projects yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
