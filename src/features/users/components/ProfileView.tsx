"use client";

import { useState } from 'react';
import { 
  Edit2, 
  Zap, 
  Trophy, 
  Eye, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  MapPin, 
  Clock,
  LayoutGrid,
  Loader2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfileData, ExperienceEntry, EducationEntry } from '../types';
import { ProjectWorkspace } from '@/features/projects/types';
import { updateProfile, addExperience, addEducation } from '../services/write';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface ProfileViewProps {
  profile: UserProfileData;
  projects: ProjectWorkspace[];
  isOwnProfile: boolean;
}

export function ProfileView({ profile, projects, isOwnProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    displayName: profile.displayName || '',
    collegeName: profile.collegeName || '',
    city: profile.location?.city || '',
    country: profile.location?.country || '',
    photoURL: profile.photoURL || '',
  });

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(profile.uid, {
        displayName: formData.displayName,
        collegeName: formData.collegeName,
        photoURL: formData.photoURL,
        location: { city: formData.city, country: formData.country }
      });
      setIsEditing(false);
      toast({ title: "Profile updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-64 md:h-80 w-full rounded-b-[2.5rem] bg-gradient-to-br from-[#6B21A8] via-[#8B5CF6] to-[#3B82F6] overflow-hidden relative shadow-lg">
          {profile.bannerUrl && (
            <img src={profile.bannerUrl} alt="Banner" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
          )}
          {/* Credibility Badge */}
          <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-[2rem] flex flex-col items-center shadow-xl">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Credibility</span>
            <span className="text-4xl font-headline font-bold text-white">{profile.credibilityScore}</span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-20 md:-mt-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar - Rounded-3xl overlapping */}
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-[3rem] p-2 bg-white shadow-2xl shrink-0">
              <img 
                src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/400/400`} 
                alt={profile.displayName} 
                className="w-full h-full object-cover rounded-[2.5rem]" 
              />
            </div>

            <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold text-foreground">{profile.displayName}</h1>
                <div className="flex flex-wrap items-center gap-3">
                   <Badge className="bg-primary/10 text-primary border-none text-xs font-bold py-1 px-4">{profile.role?.toUpperCase() || 'BUILDER'}</Badge>
                   <span className="text-muted-foreground font-bold text-sm">{profile.collegeName}</span>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-xs mt-3">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {profile.location?.city || 'Location'}, {profile.location?.country || 'India'}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Building for 2+ years
                  </span>
                </div>
              </div>

              {isOwnProfile && (
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full gap-2 px-10 h-14 bg-primary text-white hover:bg-primary/90 font-bold shadow-xl transition-all active:scale-95 action-button-glow">
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] sm:max-w-lg">
                    <DialogHeader><DialogTitle className="text-2xl font-headline">Update Profile</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2"><Label>Display Name</Label><Input value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} /></div>
                      <div className="space-y-2"><Label>College</Label><Input value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>City</Label><Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div>
                        <div className="space-y-2"><Label>Country</Label><Input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} /></div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateProfile} disabled={loading} className="w-full h-12 rounded-full font-bold">{loading ? <Loader2 className="animate-spin" /> : "Save Changes"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar - Professional History */}
        <aside className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
            <h3 className="font-headline text-lg font-bold flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              Professional History
            </h3>

            <div className="space-y-10">
              {/* Experiences */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
                  {isOwnProfile && <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary"><Plus className="w-4 h-4" /></Button>}
                </div>
                {profile.experience?.length > 0 ? profile.experience.map(exp => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{exp.role}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">{exp.company} • {exp.startDate}</p>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                    <p className="text-[10px] text-muted-foreground italic font-medium">Add your experience to build recruiter trust.</p>
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
                  {isOwnProfile && <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary"><Plus className="w-4 h-4" /></Button>}
                </div>
                {profile.education?.length > 0 ? profile.education.map(edu => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{edu.degree}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">{edu.school} • {edu.startYear}</p>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                    <p className="text-[10px] text-muted-foreground italic font-medium">Your degree is part of your story.</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </aside>

        {/* Portfolio Tabs Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="bg-white p-2 rounded-[2rem] w-full h-auto mb-10 shadow-lg flex border border-muted/20">
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
                <Card key={project.id} className="rounded-[2.5rem] overflow-hidden border-none shadow-xl group hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="h-72 relative">
                    <img src={project.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-6 right-6">
                      {project.isVerified && <Badge className="bg-white/20 backdrop-blur-md border-none text-white"><ShieldCheck className="w-3 h-3 mr-1" /> Verified Proof</Badge>}
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-3xl font-headline font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map(tag => (
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
                <div className="text-center py-24 bg-white rounded-[2.5rem] border-4 border-dashed border-muted shadow-sm">
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
