"use client";

import { useState } from 'react';
import { Briefcase, GraduationCap, Plus, Trash2, Loader2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfileData, ExperienceEntry, EducationEntry } from '../types';
import { addExperience, addEducation, removeExperience, removeEducation } from '../services/write';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProfessionalHistoryProps {
  profile: UserProfileData;
  isOwnProfile: boolean;
}

export function ProfessionalHistory({ profile, isOwnProfile }: ProfessionalHistoryProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Inline Form States
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [isAddingEdu, setIsAddingEdu] = useState(false);

  const [eduForm, setEduForm] = useState<Partial<EducationEntry>>({
    school: '', degree: '', fieldOfStudy: '', startYear: '', endDate: '', isCurrent: false, description: ''
  });

  const [expForm, setExpForm] = useState<Partial<ExperienceEntry>>({
    company: '', role: '', startDate: '', endDate: '', description: '', isCurrent: false
  });

  const handleAddEdu = async () => {
    if (!eduForm.school || !eduForm.degree) {
      toast({ variant: "destructive", title: "Missing fields", description: "School and Degree are required." });
      return;
    }
    setLoading(true);
    try {
      const entry: EducationEntry = {
        ...eduForm as EducationEntry,
        id: Math.random().toString(36).substr(2, 9)
      };
      await addEducation(profile.uid, entry);
      setIsAddingEdu(false);
      setEduForm({ school: '', degree: '', fieldOfStudy: '', startYear: '', endDate: '', isCurrent: false, description: '' });
      toast({ title: "Education added!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add education" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddExp = async () => {
    if (!expForm.company || !expForm.role) {
      toast({ variant: "destructive", title: "Missing fields", description: "Company and Role are required." });
      return;
    }
    setLoading(true);
    try {
      const entry: ExperienceEntry = {
        ...expForm as ExperienceEntry,
        id: Math.random().toString(36).substr(2, 9)
      };
      await addExperience(profile.uid, entry);
      setIsAddingExp(false);
      setExpForm({ company: '', role: '', startDate: '', endDate: '', description: '', isCurrent: false });
      toast({ title: "Experience added!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add experience" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExp = async (entry: ExperienceEntry) => {
    try {
      await removeExperience(profile.uid, entry);
      toast({ title: "Experience removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    }
  };

  const handleRemoveEdu = async (entry: EducationEntry) => {
    try {
      await removeEducation(profile.uid, entry);
      toast({ title: "Education removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    }
  };
  
  const handleDateChange = (field: string, formSetter: React.Dispatch<React.SetStateAction<any>>) => (date: Date | 'Present' | undefined) => {
    if (date === 'Present') {
      formSetter((prev: any) => ({...prev, [field]: 'Present', isCurrent: true}));
    } else if (date) {
      formSetter((prev: any) => ({...prev, [field]: format(date, 'MM/yyyy')}));
    } else {
      formSetter((prev: any) => ({...prev, [field]: ''}));
    }
  }

  return (
    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl bg-card p-6 md:p-8">
      <h3 className="font-headline text-lg font-bold flex items-center gap-3 mb-6 md:mb-8 text-foreground">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-primary" />
        </div>
        Professional History
      </h3>

      <div className="space-y-8 md:space-y-10">
        {/* Experience Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
            {isOwnProfile && !isAddingExp && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsAddingExp(true)}
                className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Inline Form: Experience */}
          {isAddingExp && (
            <div className="p-4 rounded-2xl bg-muted/20 border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase">Company</Label>
                  <Input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="h-9 rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase">Role</Label>
                  <Input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="h-9 rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase">Start</Label>
                    <DatePicker value={expForm.startDate} onChange={handleDateChange('startDate', setExpForm)} className="h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase">End</Label>
                    <DatePicker value={expForm.endDate} onChange={handleDateChange('endDate', setExpForm)} showPresentButton className="h-9" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="exp-current" checked={expForm.isCurrent} onCheckedChange={(checked) => setExpForm({...expForm, isCurrent: !!checked, endDate: checked ? 'Present' : expForm.endDate})} />
                  <label htmlFor="exp-current" className="text-[11px] font-bold text-muted-foreground">Currently working here</label>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddExp} disabled={loading} size="sm" className="flex-1 rounded-full font-bold h-9">
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-1" /> Save</>}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingExp(false)} className="rounded-full h-9 px-4">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {profile.experience && profile.experience.length > 0 ? profile.experience.map(exp => (
              <div key={exp.id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-sm leading-tight truncate">{exp.role}</p>
                    {isOwnProfile && <button onClick={() => handleRemoveExp(exp)} className="md:opacity-0 group-hover:opacity-100 text-destructive hover:scale-110 transition-all shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold">
                    {exp.company} • {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{exp.description}</p>}
                </div>
              </div>
            )) : !isAddingExp && (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile 
                    ? "Your work history tells a story of effort. Add your experiences to build credibility." 
                    : "No experience listed."
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
            {isOwnProfile && !isAddingEdu && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsAddingEdu(true)}
                className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Inline Form: Education */}
          {isAddingEdu && (
            <div className="p-4 rounded-2xl bg-muted/20 border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase">School</Label>
                  <Input value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} className="h-9 rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase">Degree</Label>
                  <Input value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} className="h-9 rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase">Start</Label>
                    <DatePicker value={eduForm.startYear} onChange={handleDateChange('startYear', setEduForm)} className="h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase">End</Label>
                    <DatePicker value={eduForm.endDate} onChange={handleDateChange('endDate', setEduForm)} showPresentButton className="h-9" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddEdu} disabled={loading} size="sm" className="flex-1 rounded-full font-bold h-9">
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-1" /> Save</>}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingEdu(false)} className="rounded-full h-9 px-4">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {profile.education && profile.education.length > 0 ? profile.education.map(edu => (
              <div key={edu.id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-sm leading-tight truncate">{edu.degree}</p>
                    {isOwnProfile && <button onClick={() => handleRemoveEdu(edu)} className="md:opacity-0 group-hover:opacity-100 text-destructive hover:scale-110 transition-all shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold">
                    {edu.school} • {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endDate}
                  </p>
                  {edu.fieldOfStudy && <p className="text-[10px] text-muted-foreground mt-0.5">{edu.fieldOfStudy}</p>}
                </div>
              </div>
            )) : !isAddingEdu && (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile 
                    ? "Academic roots help connect you with your community. Add your school to complete your builder profile." 
                    : "No education listed."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
