
"use client";

import { Eye, Trophy, Zap, LayoutGrid, ChevronRight, User, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfileData } from '../types';
import { ProjectWorkspace } from '@/features/projects/types';
import Link from 'next/link';
import { ProfileHeader } from './ProfileHeader';
import { ProfessionalHistory } from './ProfessionalHistory';

interface ProfileViewProps {
  profile: UserProfileData;
  projects: ProjectWorkspace[];
  isOwnProfile: boolean;
}

export function ProfileView({ profile, projects, isOwnProfile }: ProfileViewProps) {
  return (
    <div className="space-y-4 md:space-y-8 pb-20 bg-background min-h-screen">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
        {/* Left Sidebar - Bio & History */}
        <aside className="space-y-6 md:space-y-8 order-2 lg:order-1">
          {/* Bio Section */}
          <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-card p-6 md:p-8 group relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-lg font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary" />
                </div>
                About Builder
              </h3>
              {isOwnProfile && (
                <Link href="/profile/edit">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Edit3 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground leading-relaxed">
              {profile.bio ? (
                profile.bio
              ) : isOwnProfile ? (
                <p className="italic">Proof-of-work speaks volumes, but a bio helps tell the narrative. Update your profile to share your journey.</p>
              ) : (
                <p className="italic">This builder has not shared their bio yet.</p>
              )}
            </div>

            {profile.domains && profile.domains.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {profile.domains.map((domain: string) => (
                  <Badge key={domain} variant="outline" className="rounded-lg text-[10px] font-bold text-muted-foreground uppercase py-1 px-3">
                    {domain}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          <ProfessionalHistory profile={profile} isOwnProfile={isOwnProfile} />
        </aside>

        {/* Main Content - Portfolio */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="bg-card p-1.5 md:p-2 rounded-2xl md:rounded-[2rem] w-full h-auto mb-6 md:mb-10 shadow-sm flex border border-muted/20">
              <TabsTrigger value="portfolio" className="flex-1 rounded-xl md:rounded-[1.5rem] py-3 md:py-4 gap-2 md:gap-3 font-bold text-xs md:text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Eye className="w-4 h-4" /> Portfolio
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex-1 rounded-xl md:rounded-[1.5rem] py-3 md:py-4 gap-2 md:gap-3 font-bold text-xs md:text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Zap className="w-4 h-4" /> Jobs
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 rounded-xl md:rounded-[1.5rem] py-3 md:py-4 gap-2 md:gap-3 font-bold text-xs md:text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Trophy className="w-4 h-4" /> Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-6 md:space-y-8 outline-none pt-2">
              {projects && projects.length > 0 ? projects.map(project => (
                <Card key={project.id} className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border-none shadow-sm group hover:shadow-lg transition-all duration-500 bg-card">
                  <div className="h-48 sm:h-64 md:h-72 relative">
                    <img src={project.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                      <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag: string) => (
                          <Badge key={tag} className="bg-white/20 text-white backdrop-blur-md border-none text-[10px] font-bold px-3 md:px-4 py-1.5 rounded-lg">
                            #{tag.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">"{project.tagline}"</p>
                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 group/btn rounded-full whitespace-nowrap px-6">
                      View Roadmap <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              )) : (
                <div className="text-center py-20 md:py-32 bg-card rounded-2xl md:rounded-[2.5rem] border-4 border-dashed border-muted shadow-sm p-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <LayoutGrid className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-headline font-bold mb-2">
                    {isOwnProfile ? "Build Your First Proof" : "No Projects Found"}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto font-medium leading-relaxed">
                    {isOwnProfile 
                      ? "Proof-of-work speaks louder than words. Start a project today to show the community your impact." 
                      : "This builder has not shared any projects in their portfolio yet."
                    }
                  </p>
                  {isOwnProfile && (
                    <Button asChild className="rounded-full px-10 h-14 action-button-glow font-bold text-lg w-full sm:w-auto">
                      <Link href="/projects/create">Start Building</Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="jobs" className="outline-none py-10">
               <div className="text-center py-20 bg-card rounded-2xl border-none shadow-sm p-6">
                 <Zap className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                 <h4 className="text-xl font-headline font-bold mb-2">Work History</h4>
                 <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                   {isOwnProfile 
                     ? "Take on micro-jobs to build your verified work history and earn rewards." 
                     : "This builder has not completed any micro-jobs yet."}
                 </p>
               </div>
            </TabsContent>

            <TabsContent value="badges" className="outline-none py-10">
               <div className="text-center py-20 bg-card rounded-2xl border-none shadow-sm p-6">
                 <Trophy className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                 <h4 className="text-xl font-headline font-bold mb-2">Builder Badges</h4>
                 <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                   {isOwnProfile 
                    ? "Complete challenges and hit milestones to earn verified badges." 
                    : "No verified badges earned yet."}
                 </p>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
