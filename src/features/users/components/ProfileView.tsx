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
  LayoutGrid,
  Loader2,
  ShieldCheck
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
import { Textarea } from '@/components/ui/textarea';
import { UserProfileData, ExperienceEntry, EducationEntry } from '../types';
import { ProjectWorkspace } from '@/features/projects/types';
import { updateProfile, addExperience, addEducation } from '../services/write';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProfileViewProps {
  profile: UserProfileData;
  projects: ProjectWorkspace[];
  isOwnProfile: boolean;
}

export function ProfileView({ profile, projects, isOwnProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    displayName: profile.displayName || '',
    collegeName: profile.collegeName || '',
    city: profile.location?.city || '',
    country: profile.location?.country || '',
    photoURL: profile.photoURL || '',
  });

  const [expData, setExpData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: ''
  });

  const [eduData, setEduData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    description: ''
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

  const handleAddExp = async () => {
    setLoading(true);
    try {
      const newExp: ExperienceEntry = {
        id: crypto.randomUUID(),
        ...expData
      };
      await addExperience(profile.uid, newExp);
      setIsAddingExp(false);
      setExpData({ company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' });
      toast({ title: "Experience added!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add experience" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdu = async () => {
    setLoading(true);
    try {
      const newEdu: EducationEntry = {
        id: crypto.randomUUID(),
        ...eduData
      };
      await addEducation(profile.uid, newEdu);
      setIsAddingEdu(false);
      setEduData({ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' });
      toast({ title: "Education added!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add education" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Professional Banner & Overlapping Avatar */}
      <div className="relative">
        <div className="h-64 md:h-80 w-full rounded-[2.5rem] bg-gradient-to-br from-[#6626D9] to-[#3B82F6] overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-black/10" />
          {profile.bannerUrl && (
            <img 
              src={profile.bannerUrl} 
              alt="Banner" 
              className="w-full h-full object-cover" 
            />
          )}
          {/* Credibility Badge - Top Left as per Image */}
          <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[2rem] flex flex-col items-center shadow-2xl scale-90 md:scale-100">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1">Credibility</span>
            <span className="text-4xl font-headline font-bold text-white">{profile.credibilityScore}</span>
          </div>
        </div>

        <div className="px-6 md:px-12 -mt-20 md:-mt-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            {/* Rounded Square Avatar */}
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-[3rem] p-2 bg-white shadow-2xl shrink-0 group relative overflow-hidden">
              <img 
                src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/300/300`} 
                alt={profile.displayName} 
                className="w-full h-full object-cover rounded-[2.5rem]" 
              />
            </div>

            <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">{profile.displayName}</h1>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {profile?.domains?.map((domain) => (
                      <Badge 
                        key={domain} 
                        className="bg-primary/10 text-primary border-none text-sm px-3 py-1 font-bold"
                      >
                        @{domain}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground font-bold text-base">{profile.collegeName}</p>
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-sm">
                    <span className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm">
                      <MapPin className="w-4 h-4 text-primary" /> {profile.location?.city || 'City'}, {profile.location?.country || 'Country'}
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
                        <Label>Profile Picture URL</Label>
                        <Input value={formData.photoURL} onChange={(e) => setFormData({...formData, photoURL: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>College/University</Label>
                        <Input value={formData.collegeName} onChange={(e) => setFormData({...formData, collegeName: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label>Country</Label>
                          <Input value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="rounded-xl h-12" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateProfile} disabled={loading} className="w-full rounded-full h-14 action-button-glow font-bold text-lg">
                        {loading ? <Loader2 className="animate-spin" /> : "Commit Changes"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar - Left side as per image */}
        <aside className="space-y-8">
          <Card className="glass-card border-none shadow-xl rounded-[2.5rem] bg-white p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-headline text-xl font-bold flex items-center gap-3"><Briefcase className="w-6 h-6 text-primary" /> Building History</h3>
            </div>

            <div className="space-y-10">
              {/* Experiences */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Experiences</p>
                  {isOwnProfile && (
                    <Dialog open={isAddingExp} onOpenChange={setIsAddingExp}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/10 text-primary">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2.5rem]">
                        <DialogHeader><DialogTitle className="font-headline">Add Experience</DialogTitle></DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2"><Label>Role</Label><Input placeholder="Frontend Engineer" value={expData.role} onChange={e => setExpData({...expData, role: e.target.value})} /></div>
                          <div className="space-y-2"><Label>Company</Label><Input placeholder="Acme Inc" value={expData.company} onChange={e => setExpData({...expData, company: e.target.value})} /></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={expData.startDate} onChange={e => setExpData({...expData, startDate: e.target.value})} /></div>
                            <div className="space-y-2"><Label>End Date</Label><Input type="date" value={expData.endDate} onChange={e => setExpData({...expData, endDate: e.target.value})} /></div>
                          </div>
                          <div className="space-y-2"><Label>Description</Label><Textarea placeholder="What did you build?" value={expData.description} onChange={e => setExpData({...expData, description: e.target.value})} /></div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddExp} disabled={loading} className="w-full rounded-full h-12 action-button-glow font-bold">
                            {loading ? <Loader2 className="animate-spin" /> : "Save Experience"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                {profile?.experience?.length > 0 ? profile.experience.map((exp) => (
                  <div key={exp.id} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/20">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base leading-tight">{exp.role}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-bold">{exp.company} • {exp.startDate.split('-')[0]}</p>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/20 text-center space-y-2">
                    <p className="text-xs font-bold text-primary italic">"Proof-of-work speaks louder than words."</p>
                    <p className="text-[10px] text-muted-foreground">Add your experience to get noticed by top startups.</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Education</p>
                  {isOwnProfile && (
                    <Dialog open={isAddingEdu} onOpenChange={setIsAddingEdu}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/10 text-primary">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2.5rem]">
                        <DialogHeader><DialogTitle className="font-headline">Add Education</DialogTitle></DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2"><Label>School/University</Label><Input placeholder="IIT Delhi" value={eduData.school} onChange={e => setEduData({...eduData, school: e.target.value})} /></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Degree</Label><Input placeholder="B.Tech" value={eduData.degree} onChange={e => setEduData({...eduData, degree: e.target.value})} /></div>
                            <div className="space-y-2"><Label>Field of Study</Label><Input placeholder="Computer Science" value={eduData.fieldOfStudy} onChange={e => setEduData({...eduData, fieldOfStudy: e.target.value})} /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Start Year</Label><Input placeholder="2021" value={eduData.startYear} onChange={e => setEduData({...eduData, startYear: e.target.value})} /></div>
                            <div className="space-y-2"><Label>End Year (Expected)</Label><Input placeholder="2025" value={eduData.endYear} onChange={e => setEduData({...eduData, endYear: e.target.value})} /></div>
                          </div>
                          <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Relevant courses or activities" value={eduData.description} onChange={e => setEduData({...eduData, description: e.target.value})} /></div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddEdu} disabled={loading} className="w-full rounded-full h-12 action-button-glow font-bold">
                            {loading ? <Loader2 className="animate-spin" /> : "Save Education"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                {profile?.education?.length > 0 ? profile.education.map((edu) => (
                  <div key={edu.id} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center shrink-0 border border-secondary/20">
                      <GraduationCap className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base leading-tight">{edu.degree} {edu.fieldOfStudy}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-bold">{edu.school} • {edu.startYear}-{edu.endYear}</p>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 rounded-2xl bg-secondary/5 border border-dashed border-secondary/20 text-center space-y-2">
                    <p className="text-xs font-bold text-secondary italic">"Always be learning."</p>
                    <p className="text-[10px] text-muted-foreground">Recruiters want to see your academic foundation.</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </aside>

        {/* Portfolio Tabs & Main Column */}
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
              {projects?.length > 0 ? projects.map((project) => (
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
                      {project.tags?.map((tag: string) => (
                        <Badge key={tag} className="bg-primary/5 text-primary border-none text-[10px] font-bold px-4 py-1.5 rounded-lg">
                          #{tag.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-muted">
                      <div className="flex -space-x-3">
                        {project.team?.slice(0, 3).map((mate: any, i: number) => (
                          <div key={mate.userId} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg bg-muted">
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

            <TabsContent value="jobs" className="space-y-6">
              <div className="text-center py-20">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold">Active Micro-Jobs</h3>
                <p className="text-sm text-muted-foreground">Complete tasks to build your credibility score.</p>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <div className="text-center py-20">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold">Achievements</h3>
                <p className="text-sm text-muted-foreground">Proof of excellence in your domain.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
