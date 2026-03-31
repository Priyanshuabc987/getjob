"use client";

import { useState } from 'react';
import { Eye, Trophy, Zap, LayoutGrid, ChevronRight, User, Edit3, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { UserProfileData } from '../types';
import { ProjectWorkspace } from '@/features/projects/types';
import Link from 'next/link';
import { ProfileHeader } from './ProfileHeader';
import { ProfessionalHistory } from './ProfessionalHistory';
import { updateProfile } from '../services/write';
import { useToast } from '@/hooks/use-toast';

interface ProfileViewProps {
  profile: UserProfileData;
  projects: ProjectWorkspace[];
  isOwnProfile: boolean;
}

export function ProfileView({ profile, projects, isOwnProfile }: ProfileViewProps) {
  const { toast } = useToast();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [loadingBio, setLoadingBio] = useState(false);
  const [bioText, setBioText] = useState(profile.bio || '');

  const handleUpdateBio = async () => {
    setLoadingBio(true);
    try {
      await updateProfile(profile.uid, { bio: bioText });
      setIsEditingBio(false);
      toast({ title: "Bio updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to update bio" });
    } finally {
      setLoadingBio(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <aside className="space-y-8">
          {/* Bio Section */}
          <Card className="rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-card p-8 group relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-lg font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary" />
                </div>
                About Builder
              </h3>
              {isOwnProfile && (
                <Dialog open={isEditingBio} onOpenChange={setIsEditingBio}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2rem]">
                    <DialogHeader><DialogTitle>Edit Builder Bio</DialogTitle></DialogHeader>
                    <div className="py-4">
                      <Textarea 
                        value={bioText} 
                        onChange={e => setBioText(e.target.value)} 
                        placeholder="Tell the community about your journey, skills, and vision..." 
                        className="min-h-[150px] rounded-2xl"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateBio} disabled={loadingBio} className="w-full rounded-full h-12 font-bold">
                        {loadingBio ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Bio"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile.bio || "This builder hasn't shared their story yet. Proof-of-work speaks volumes, but a bio helps tell the narrative."}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {profile.domains?.map((domain: string) => (
                <Badge key={domain} variant="outline" className="rounded-lg text-[10px] font-bold text-muted-foreground uppercase py-1">
                  {domain}
                </Badge>
              ))}
            </div>
          </Card>

          <ProfessionalHistory profile={profile} isOwnProfile={isOwnProfile} />
        </aside>

        {/* Main Content - Portfolio */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="bg-white dark:bg-card p-2 rounded-[2rem] w-full h-auto mb-10 shadow-lg flex border border-muted/20">
              <TabsTrigger value="portfolio" className="flex-1 rounded-[1.5rem] py-4 gap-3 font-bold text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Eye className="w-4 h-4" /> Proof Portfolio
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex-1 rounded-[1.5rem] py-4 gap-3 font-bold text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Zap className="w-4 h-4" /> Micro-Jobs
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 rounded-[1.5rem] py-4 gap-3 font-bold text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Trophy className="w-4 h-4" /> Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-8">
              {projects.length > 0 ? projects.map(project => (
                <Card key={project.id} className="rounded-[2.5rem] overflow-hidden border-none shadow-xl group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-card">
                  <div className="h-72 relative">
                    <img src={project.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-3xl font-headline font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag: string) => (
                          <Badge key={tag} className="bg-primary/20 text-white backdrop-blur-md border-none text-[10px] font-bold px-4 py-1.5 rounded-lg">
                            #{tag.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">"{project.tagline}"</p>
                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 group/btn rounded-full whitespace-nowrap">
                      View Roadmap <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              )) : (
                <div className="text-center py-24 bg-white dark:bg-card rounded-[2.5rem] border-4 border-dashed border-muted shadow-sm">
                  <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <LayoutGrid className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h4 className="text-2xl font-headline font-bold mb-2">Build Your First Proof</h4>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto font-medium">Proof-of-work speaks louder than words. Start a project today.</p>
                  <Button asChild className="rounded-full px-10 h-14 action-button-glow font-bold text-lg"><Link href="/projects">Start Building</Link></Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
