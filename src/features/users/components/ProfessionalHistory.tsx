"use client";

import { useState } from 'react';
import { Briefcase, GraduationCap, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfileData, ExperienceEntry, EducationEntry } from '../types';
import { addExperience, addEducation, removeExperience, removeEducation } from '../services/write';
import { useToast } from '@/hooks/use-toast';

interface ProfessionalHistoryProps {
  profile: UserProfileData;
  isOwnProfile: boolean;
}

export function ProfessionalHistory({ profile, isOwnProfile }: ProfessionalHistoryProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  const [eduForm, setEduForm] = useState<Partial<EducationEntry>>({
    school: '', degree: '', fieldOfStudy: '', startYear: '', description: ''
  });

  const [expForm, setExpForm] = useState<Partial<ExperienceEntry>>({
    company: '', role: '', startDate: '', description: '', isCurrent: false
  });

  const handleAddEdu = async () => {
    if (!eduForm.school || !eduForm.degree) return;
    setLoading(true);
    try {
      const entry: EducationEntry = {
        ...eduForm as EducationEntry,
        id: Math.random().toString(36).substr(2, 9)
      };
      await addEducation(profile.uid, entry);
      setEduOpen(false);
      setEduForm({ school: '', degree: '', fieldOfStudy: '', startYear: '', description: '' });
      toast({ title: "Education added!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add education" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddExp = async () => {
    if (!expForm.company || !expForm.role) return;
    setLoading(true);
    try {
      const entry: ExperienceEntry = {
        ...expForm as ExperienceEntry,
        id: Math.random().toString(36).substr(2, 9)
      };
      await addExperience(profile.uid, entry);
      setExpOpen(false);
      setExpForm({ company: '', role: '', startDate: '', description: '', isCurrent: false });
      toast({ title: "Experience added!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add experience" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExp = async (entry: ExperienceEntry) => {
    if (!confirm("Are you sure?")) return;
    try {
      await removeExperience(profile.uid, entry);
      toast({ title: "Experience removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    }
  };

  const handleRemoveEdu = async (entry: EducationEntry) => {
    if (!confirm("Are you sure?")) return;
    try {
      await removeEducation(profile.uid, entry);
      toast({ title: "Education removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    }
  };

  return (
    <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
      <h3 className="font-headline text-lg font-bold flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-primary" />
        </div>
        Professional History
      </h3>

      <div className="space-y-10">
        {/* Experience Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
            {isOwnProfile && (
              <Dialog open={expOpen} onOpenChange={setExpOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem]">
                  <DialogHeader><DialogTitle>Add Experience</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-1"><Label>Company</Label><Input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="rounded-xl" /></div>
                    <div className="space-y-1"><Label>Role</Label><Input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="rounded-xl" /></div>
                    <div className="space-y-1"><Label>Start Date</Label><Input placeholder="MM/YYYY" value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} className="rounded-xl" /></div>
                    <div className="space-y-1"><Label>Description</Label><Textarea value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} className="rounded-xl" /></div>
                  </div>
                  <DialogFooter><Button onClick={handleAddExp} disabled={loading} className="w-full rounded-full h-12 font-bold">{loading ? <Loader2 className="animate-spin" /> : "Save Experience"}</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {profile.experience?.length > 0 ? profile.experience.map(exp => (
            <div key={exp.id} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <p className="font-bold text-sm leading-tight">{exp.role}</p>
                  {isOwnProfile && <button onClick={() => handleRemoveExp(exp)} className="opacity-0 group-hover:opacity-100 text-destructive hover:scale-110 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>}
                </div>
                <p className="text-[10px] text-muted-foreground font-bold">{exp.company} • {exp.startDate}</p>
                {exp.description && <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{exp.description}</p>}
              </div>
            </div>
          )) : (
            <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
              <p className="text-[10px] text-muted-foreground italic font-medium">Add experience to show builders your journey.</p>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
            {isOwnProfile && (
              <Dialog open={eduOpen} onOpenChange={setEduOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem]">
                  <DialogHeader><DialogTitle>Add Education</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-1"><Label>School</Label><Input value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} className="rounded-xl" /></div>
                    <div className="space-y-1"><Label>Degree</Label><Input value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} className="rounded-xl" /></div>
                    <div className="space-y-1"><Label>Field of Study</Label><Input value={eduForm.fieldOfStudy} onChange={e => setEduForm({...eduForm, fieldOfStudy: e.target.value})} className="rounded-xl" /></div>
                    <div className="space-y-1"><Label>Start Year</Label><Input value={eduForm.startYear} onChange={e => setEduForm({...eduForm, startYear: e.target.value})} className="rounded-xl" /></div>
                  </div>
                  <DialogFooter><Button onClick={handleAddEdu} disabled={loading} className="w-full rounded-full h-12 font-bold">{loading ? <Loader2 className="animate-spin" /> : "Save Education"}</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {profile.education?.length > 0 ? profile.education.map(edu => (
            <div key={edu.id} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <p className="font-bold text-sm leading-tight">{edu.degree}</p>
                  {isOwnProfile && <button onClick={() => handleRemoveEdu(edu)} className="opacity-0 group-hover:opacity-100 text-destructive hover:scale-110 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>}
                </div>
                <p className="text-[10px] text-muted-foreground font-bold">{edu.school} • {edu.startYear}</p>
                {edu.fieldOfStudy && <p className="text-[10px] text-muted-foreground mt-0.5">{edu.fieldOfStudy}</p>}
              </div>
            </div>
          )) : (
            <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
              <p className="text-[10px] text-muted-foreground italic font-medium">Your academic roots help connect you with alumni.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
