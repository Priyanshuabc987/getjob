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
  Plus,
  MapPin,
  Clock,
  LayoutGrid
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
import { ProjectWorkspace } from '@/features/projects/types';
import { updateProfile } from '../services/write';
import { useToast } from '@/hooks/use-toast';

interface ProfileViewProps {
  profile: UserProfileData;
  projects: ProjectWorkspace[];
  isOwnProfile: boolean;
}

export function ProfileView({ profile, projects, isOwnProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    collegeName: profile.collegeName,
    city: profile.location.city,
  });

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(profile.uid, {
        displayName: formData.displayName,
        collegeName: formData.collegeName,
        location: { ...profile.location, city: formData.city }
      });
      setIsEditing(false);
      toast({ title: "Profile updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Update failed" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Professional Banner & Overlapping Avatar */}
      <div className="relative">
        <div className="h-64 md:h-80 w-full rounded-[2.5rem] bg-gradient-to-br from-[#6626D9] to-[#3B82F6] overflow-hidden shadow-2xl relative group">
          {profile.bannerUrl && (
            <img 
              src={profile.bannerUrl} 
              alt="Banner" 
              className="w-full h-full object-cover" 
              data-ai-hint="builder banner"
            />
          )}
          <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[2rem] flex flex-col items-center shadow-2xl scale-90 md:scale-100">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1">Credibility</span>
            <span className="text-4xl font-headline font-bold text-white">{profile.credibilityScore}</span>
          </div>
        </div>
        
        <div className="px-6 md:px-12 -mt-20 md:-mt-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-[3rem] p-2 bg-white shadow-2xl shrink-0 group relative">
              <img 
                src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/300/300`} 
                alt={profile.displayName} 
                className="w-full h-full object-cover rounded-[2.5rem]" 
                data-ai-hint="profile picture"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center cursor-pointer">
                <Edit2 className="text-white w-6 h-6" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">{profile.displayName}</h1>
                <div className="space-y-3">
                  <p className="text-primary font-bold text-lg md:text-xl flex items-center gap-2">
                    @{profile.domains?.[0]?.toLowerCase() || 'builder'}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-sm">
                    <span className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm">
                      <MapPin className="w-4 h-4 text-primary" /> {profile.location?.city}, {profile.location?.country}
                    </span>
                    <span className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm">
                      <Clock className="w-4 h-4 text-primary" /> Building for 2+ years
                    </span>
                  </div>
                </div>
              </div>
              
              {isOwnProfile && (
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full gap-3 px-10 h-14 action-button-glow font-bold shadow-xl text-lg">
                      <Edit2 className="w-5 h-5" /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] rounded-[2.5rem]">
                    <DialogHeader><DialogTitle className="text-2xl font-headline">Update Your Identity</DialogTitle></DialogHeader>
                    <div className="grid gap-6 py-6 pr-2">
                      <div className="space-y-2">
                        <Label>Display Name</Label>
                        <Input value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>College/University</Label>
                        <Input value={formData.collegeName} onChange={(e) => setFormData({...formData, collegeName: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="rounded-xl h-12" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateProfile} className="w-full rounded-full h-14 action-button-glow font-bold text-lg">Commit Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar */}
        <aside className="space-y-8">
          <Card className="glass-card border-none shadow-xl rounded-[2.5rem] bg-white p-10">
             <div className="flex items-center justify-between mb-10">
               <h3 className="font-headline text-xl font-bold flex items-center gap-3"><Briefcase className="w-6 h-6 text-primary" /> Professional History</h3>
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 text-primary">
                 <Plus className="w-5 h-5" />
               </Button>
             </div>
             
             <div className="space-y-10">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Experiences</p>
                  {profile.experience.length > 0 ? profile.experience.map((exp, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">{exp.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{exp.company} • {exp.startDate.split('-')[0]}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/20 text-center space-y-2">
                      <p className="text-xs font-bold text-primary">Add your experience</p>
                      <p className="text-[10px] text-muted-foreground">Show recruiters your real-world contributions.</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6 pt-6 border-t border-muted">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Education</p>
                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center shrink-0 border border-secondary/20">
                        <GraduationCap className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">{profile.collegeName || 'Not Set'}</p>
                        <p className="text-xs text-muted-foreground mt-1">B.Tech • 2021-2025</p>
                      </div>
                  </div>
                </div>
             </div>
          </Card>

          <Card className="glass-card border-none bg-[#F4F3F8] shadow-inner rounded-[2.5rem] p-10 space-y-6">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Current Domains</h4>
            <div className="flex flex-wrap justify-center gap-2">
               {profile.domains.map(d => (
                 <Badge key={d} className="bg-white text-primary border-none shadow-sm px-4 py-1.5 font-bold rounded-xl text-[10px]">
                   #{d.toUpperCase()}
                 </Badge>
               ))}
            </div>
          </Card>
        </aside>

        <section className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="bg-white p-2 rounded-[2.5rem] w-full h-auto mb-10 shadow-lg border border-muted/50">
              <TabsTrigger value="portfolio" className="flex-1 rounded-[2rem] py-5 gap-3 font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300">
                <Eye className="w-4 h-4" /> Proof Portfolio
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex-1 rounded-[2rem] py-5 gap-3 font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300">
                <Zap className="w-4 h-4" /> Micro-Jobs
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 rounded-[2rem] py-5 gap-3 font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300">
                <Trophy className="w-4 h-4" /> Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {projects.length > 0 ? projects.map((project) => (
                <Card key={project.id} className="glass-card group overflow-hidden border-none shadow-xl rounded-[3rem] bg-white hover:shadow-2xl transition-all duration-700">
                  <div className="h-64 bg-muted relative overflow-hidden">
                    <img src={project.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10">
                      <h3 className="text-4xl font-headline font-bold text-white tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tags.map((tag) => (
                        <Badge key={tag} className="bg-primary/5 text-primary border-none text-[10px] font-bold px-4 py-1.5 rounded-lg">
                          #{tag.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-muted">
                       <div className="flex -space-x-3">
                         {project.team.slice(0, 3).map((mate, i) => (
                           <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg bg-muted">
                             <img src={mate.avatarUrl} className="w-full h-full object-cover" alt={mate.name} />
                           </div>
                         ))}
                       </div>
                       <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 group/btn rounded-full px-6">
                         View Roadmap <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                       </Button>
                    </div>
                  </div>
                </Card>
              )) : (
                <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-muted flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <LayoutGrid className="w-10 h-10 text-primary opacity-50" />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="text-2xl font-bold">Your portfolio is empty</h4>
                    <p className="text-muted-foreground text-sm">Add your first project to prove your skills to the next generation of hiring managers.</p>
                  </div>
                  <Button asChild className="rounded-full px-12 h-14 action-button-glow font-bold mt-4 text-lg">
                    <Link href="/projects"><Plus className="w-5 h-5 mr-2" /> Start Building</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
