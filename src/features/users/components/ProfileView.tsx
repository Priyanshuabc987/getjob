
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
  GraduationCap,
  Plus
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
      <div className="relative">
        <div className="h-48 md:h-72 w-full rounded-[1.5rem] md:rounded-[2.5rem] bg-muted overflow-hidden shadow-xl relative">
          <img 
            src={profile.bannerUrl || `https://picsum.photos/seed/${profile.uid}/1200/400`} 
            alt="Banner" 
            className="w-full h-full object-cover" 
            data-ai-hint="builder banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl flex flex-col items-center shadow-2xl">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Credibility</span>
            <span className="text-3xl font-headline font-bold text-white">{profile.credibilityScore}</span>
          </div>
        </div>
        
        {/* Overlapping Profile Info Container */}
        <div className="px-6 md:px-12 -mt-16 md:-mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] p-2 bg-white shadow-2xl shrink-0">
              <img 
                src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/200/200`} 
                alt={profile.displayName} 
                className="w-full h-full object-cover rounded-[2rem]" 
                data-ai-hint="profile picture"
              />
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl font-headline font-bold text-foreground drop-shadow-sm">{profile.displayName}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary text-white border-none text-[10px] font-bold px-4 h-6">
                    {profile.role?.toUpperCase() || 'BUILDER'}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-bold flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full">
                    <Globe className="w-4 h-4 text-primary" /> {profile.location?.city || 'India'}
                  </span>
                </div>
              </div>
              
              {isOwnProfile && (
                <div className="flex gap-3">
                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                      <Button className="rounded-full gap-2 px-8 h-12 action-button-glow font-bold shadow-lg">
                        <Edit2 className="w-4 h-4" /> Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] rounded-[2.5rem]">
                      <DialogHeader><DialogTitle className="text-2xl font-headline">Update Your Showcase</DialogTitle></DialogHeader>
                      <div className="grid gap-6 py-6 max-h-[70vh] overflow-y-auto pr-2">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input defaultValue={profile.displayName} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input defaultValue={profile.location?.city} className="rounded-xl h-12" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="w-full rounded-full h-14 action-button-glow font-bold text-lg">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
        <aside className="space-y-8">
          <Card className="glass-card border-none shadow-xl rounded-[2.5rem] bg-white p-8">
             <h3 className="font-headline text-lg font-bold mb-8 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Builder Dossier</h3>
             <div className="space-y-8">
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="text-base font-bold leading-tight">{profile.collegeName || 'Education Not Added'}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">University</p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-muted">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Core Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains?.length > 0 ? profile.domains.map((domain: string) => (
                      <Badge key={domain} variant="secondary" className="bg-[#F4F3F8] text-primary border-none text-[10px] font-bold px-3 py-1">
                        {domain.toUpperCase()}
                      </Badge>
                    )) : (
                      <p className="text-xs text-muted-foreground italic">No domains selected</p>
                    )}
                  </div>
                </div>
             </div>
          </Card>

          <Card className="glass-card border-none bg-primary text-white shadow-2xl rounded-[2.5rem] p-10 text-center space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Zap className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                  <p className="text-[11px] font-bold text-white/60 uppercase tracking-[0.4em] mb-4">Credibility Index</p>
                  <div className="text-6xl font-headline font-bold">{profile.credibilityScore}</div>
               </div>
               <div className="flex justify-center items-center gap-8 border-t border-white/20 pt-8 relative z-10">
                  <div className="text-center">
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Tasks</p>
                  </div>
                  <Separator orientation="vertical" className="h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Squads</p>
                  </div>
               </div>
          </Card>
        </aside>

        <section className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="bg-white p-2 rounded-[2.5rem] w-full h-auto mb-8 shadow-md border border-muted/50">
              <TabsTrigger value="portfolio" className="flex-1 rounded-[2rem] py-4 gap-3 font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <Eye className="w-4 h-4" /> Proof Portfolio
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex-1 rounded-[2rem] py-4 gap-3 font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <Trophy className="w-4 h-4" /> Verified Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {projects.length > 0 ? projects.map((project: ProjectWorkspace) => (
                <Card key={project.id} className="glass-card group overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="h-48 md:h-56 bg-muted relative overflow-hidden">
                    <img src={project.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-10 right-10 flex justify-between items-end">
                      <h3 className="text-3xl font-headline font-bold text-white tracking-tight">{project.title}</h3>
                      <Badge className="bg-white/20 backdrop-blur-md border-none text-white text-[10px] font-bold">
                        {project.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2 italic">
                      "{project.tagline}"
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag: string) => (
                        <Badge key={tag} className="bg-primary/5 text-primary border-none text-[10px] font-bold px-3">
                          #{tag.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-muted">
                       <div className="flex -space-x-3">
                         {project.team.slice(0, 3).map((mate: ProjectWorkspaceTeamMember, i: number) => (
                           <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-muted overflow-hidden shadow-sm">
                             <img src={mate.avatarUrl} className="w-full h-full object-cover" alt={mate.name} />
                           </div>
                         ))}
                         {project.team.length > 3 && (
                           <div className="w-10 h-10 rounded-full border-4 border-white bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                             +{project.team.length - 3}
                           </div>
                         )}
                       </div>
                       <Link href={`/projects/${project.id}`}>
                        <Button className="rounded-full px-8 h-12 action-button-glow font-bold group">
                          View Build Log <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                       </Link>
                    </div>
                  </div>
                </Card>
              )) : (
                <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-muted flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                    <Zap className="w-10 h-10 text-muted-foreground opacity-30" />
                  </div>
                  <div className="space-y-2 max-w-xs">
                    <h4 className="text-xl font-bold">No projects yet</h4>
                    <p className="text-sm text-muted-foreground">Start building your first proof-of-work project to earn credibility.</p>
                  </div>
                  <Button asChild className="rounded-full px-10 h-14 action-button-glow font-bold mt-4">
                    <Link href="/projects"><Plus className="w-5 h-5 mr-2" /> Start Building</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="achievements">
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                 {['Early Adopter', 'Bug Hunter', 'Ship It'].map(badge => (
                   <Card key={badge} className="p-8 flex flex-col items-center text-center gap-4 rounded-[2.5rem] glass-card border-none">
                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                       <Trophy className="w-8 h-8 text-primary" />
                     </div>
                     <p className="font-bold text-sm">{badge}</p>
                   </Card>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
