"use client";

import { useState } from 'react';
import { Briefcase, GraduationCap, Plus, Trash2, Loader2, X, Check, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfileData, ExperienceEntry, EducationEntry } from '../types';
import { addExperience, addEducation, removeExperience, removeEducation } from '../services/write';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProfessionalHistoryProps {
  profile: UserProfileData;
  isOwnProfile: boolean;
}

export function ProfessionalHistory({ profile, isOwnProfile }: ProfessionalHistoryProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Section Edit Modes
  const [isManagingExp, setIsManagingExp] = useState(false);
  const [isManagingEdu, setIsManagingEdu] = useState(false);
  
  // Form Addition States
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  
  // Entry Editing States (Tracking ID of entry being edited inline)
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);

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

  const handleUpdateExp = async (updatedEntry: ExperienceEntry) => {
    setLoading(true);
    try {
      const oldVersion = profile.experience.find(e => e.id === updatedEntry.id);
      if (oldVersion) await removeExperience(profile.uid, oldVersion);
      await addExperience(profile.uid, updatedEntry);
      setEditingExpId(null);
      toast({ title: "Experience updated" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to update" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEdu = async (updatedEntry: EducationEntry) => {
    setLoading(true);
    try {
      const oldVersion = profile.education.find(e => e.id === updatedEntry.id);
      if (oldVersion) await removeEducation(profile.uid, oldVersion);
      await addEducation(profile.uid, updatedEntry);
      setEditingEduId(null);
      toast({ title: "Education updated" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to update" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExp = async (entry: ExperienceEntry) => {
    setLoading(true);
    try {
      await removeExperience(profile.uid, entry);
      setEditingExpId(null);
      toast({ title: "Experience removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEdu = async (entry: EducationEntry) => {
    setLoading(true);
    try {
      await removeEducation(profile.uid, entry);
      setEditingEduId(null);
      toast({ title: "Education removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    } finally {
      setLoading(false);
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
  };

  return (
    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl bg-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h3 className="font-headline text-lg font-bold flex items-center gap-3 text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          Professional History
        </h3>
      </div>

      <div className="space-y-8 md:space-y-10">
        {/* Experience Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
            {isOwnProfile && (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsAddingExp(true)}
                  className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsManagingExp(!isManagingExp)}
                  className={cn("h-6 w-6 rounded-full transition-colors", isManagingExp ? "text-primary bg-primary/10" : "text-muted-foreground")}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {isAddingExp && (
            <div className="p-4 rounded-2xl bg-muted/20 border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <div className="space-y-1"><Label className="text-[10px] uppercase">Company</Label><Input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="h-9 rounded-lg text-sm" /></div>
                <div className="space-y-1"><Label className="text-[10px] uppercase">Role</Label><Input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="h-9 rounded-lg text-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label className="text-[10px] uppercase">Start</Label><DatePicker value={expForm.startDate} onChange={handleDateChange('startDate', setExpForm)} className="h-9" /></div>
                  <div className="space-y-1"><Label className="text-[10px] uppercase">End</Label><DatePicker value={expForm.endDate} onChange={handleDateChange('endDate', setExpForm)} showPresentButton className="h-9" /></div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddExp} disabled={loading} size="sm" className="flex-1 rounded-full font-bold h-9">{loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-1" /> Save</>}</Button>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingExp(false)} className="rounded-full h-9 px-4"><X className="w-3 h-3" /></Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {profile.experience && profile.experience.length > 0 ? profile.experience.map(exp => (
              <div key={exp.id}>
                {editingExpId === exp.id ? (
                  <div className="p-4 rounded-2xl bg-muted/20 border border-primary/20 space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1"><Label className="text-[10px] uppercase">Company</Label><Input defaultValue={exp.company} onChange={e => exp.company = e.target.value} className="h-9 rounded-lg text-sm" /></div>
                      <div className="space-y-1"><Label className="text-[10px] uppercase">Role</Label><Input defaultValue={exp.role} onChange={e => exp.role = e.target.value} className="h-9 rounded-lg text-sm" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><Label className="text-[10px] uppercase">Start</Label><DatePicker value={exp.startDate} onChange={(date) => { if(date === 'Present') { exp.startDate = 'Present'; exp.isCurrent = true; } else if(date) { exp.startDate = format(date, 'MM/yyyy'); } }} className="h-9" /></div>
                        <div className="space-y-1"><Label className="text-[10px] uppercase">End</Label><DatePicker value={exp.endDate} onChange={(date) => { if(date === 'Present') { exp.endDate = 'Present'; exp.isCurrent = true; } else if(date) { exp.endDate = format(date, 'MM/yyyy'); } }} showPresentButton className="h-9" /></div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={() => handleUpdateExp(exp)} disabled={loading} size="sm" className="flex-1 rounded-full font-bold h-9">Save</Button>
                      <Button onClick={() => handleRemoveExp(exp)} disabled={loading} variant="destructive" size="sm" className="rounded-full h-9"><Trash2 className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditingExpId(null)} className="rounded-full h-9 px-4"><X className="w-3 h-3" /></Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 group relative">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-sm leading-tight truncate">{exp.role}</p>
                        {isManagingExp && (
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-primary hover:bg-primary/5" onClick={() => setEditingExpId(exp.id)}>
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground font-bold">{exp.company} • {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                    </div>
                  </div>
                )}
              </div>
            )) : !isAddingExp && (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile ? "Show the builders your potential to get jobs/tasks easily." : "No experience listed."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
            {isOwnProfile && (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsAddingEdu(true)}
                  className="h-6 w-6 rounded-full hover:bg-primary/5 text-primary"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsManagingEdu(!isManagingEdu)}
                  className={cn("h-6 w-6 rounded-full transition-colors", isManagingEdu ? "text-primary bg-primary/10" : "text-muted-foreground")}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {isAddingEdu && (
            <div className="p-4 rounded-2xl bg-muted/20 border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <div className="space-y-1"><Label className="text-[10px] uppercase">School</Label><Input value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} className="h-9 rounded-lg text-sm" /></div>
                <div className="space-y-1"><Label className="text-[10px] uppercase">Degree</Label><Input value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} className="h-9 rounded-lg text-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label className="text-[10px] uppercase">Start</Label><DatePicker value={eduForm.startYear} onChange={handleDateChange('startYear', setEduForm)} className="h-9" /></div>
                  <div className="space-y-1"><Label className="text-[10px] uppercase">End</Label><DatePicker value={eduForm.endDate} onChange={handleDateChange('endDate', setEduForm)} showPresentButton className="h-9" /></div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddEdu} disabled={loading} size="sm" className="flex-1 rounded-full font-bold h-9">{loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-1" /> Save</>}</Button>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingEdu(false)} className="rounded-full h-9 px-4"><X className="w-3 h-3" /></Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {profile.education && profile.education.length > 0 ? profile.education.map(edu => (
              <div key={edu.id}>
                {editingEduId === edu.id ? (
                  <div className="p-4 rounded-2xl bg-muted/20 border border-primary/20 space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1"><Label className="text-[10px] uppercase">School</Label><Input defaultValue={edu.school} onChange={e => edu.school = e.target.value} className="h-9 rounded-lg text-sm" /></div>
                      <div className="space-y-1"><Label className="text-[10px] uppercase">Degree</Label><Input defaultValue={edu.degree} onChange={e => edu.degree = e.target.value} className="h-9 rounded-lg text-sm" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><Label className="text-[10px] uppercase">Start</Label><DatePicker value={edu.startYear} onChange={(date) => { if(date === 'Present') { edu.startYear = 'Present'; edu.isCurrent = true; } else if(date) { edu.startYear = format(date, 'MM/yyyy'); } }} className="h-9" /></div>
                        <div className="space-y-1"><Label className="text-[10px] uppercase">End</Label><DatePicker value={edu.endDate} onChange={(date) => { if(date === 'Present') { edu.endDate = 'Present'; edu.isCurrent = true; } else if(date) { edu.endDate = format(date, 'MM/yyyy'); } }} showPresentButton className="h-9" /></div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={() => handleUpdateEdu(edu)} disabled={loading} size="sm" className="flex-1 rounded-full font-bold h-9">Save</Button>
                      <Button onClick={() => handleRemoveEdu(edu)} disabled={loading} variant="destructive" size="sm" className="rounded-full h-9"><Trash2 className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditingEduId(null)} className="rounded-full h-9 px-4"><X className="w-3 h-3" /></Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 group relative">
                    <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-sm leading-tight truncate">{edu.degree}</p>
                        {isManagingEdu && (
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-secondary hover:bg-secondary/5" onClick={() => setEditingEduId(edu.id)}>
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground font-bold">{edu.school} • {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endDate}</p>
                    </div>
                  </div>
                )}
              </div>
            )) : !isAddingEdu && (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile ? "Show the builders your potential to get jobs/tasks easily." : "No education listed."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}