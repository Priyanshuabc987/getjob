"use client";

import { useState } from 'react';
import { Briefcase, GraduationCap, Plus, Trash2, Loader2, X, Check, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  
  const [editingExp, setEditingExp] = useState<ExperienceEntry | null>(null);
  const [editingEdu, setEditingEdu] = useState<EducationEntry | null>(null);

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

  const handleUpdateExp = async () => {
    if (!editingExp) return;
    setLoading(true);
    try {
      // For simple array management, we remove the old and add the new
      const oldVersion = profile.experience.find(e => e.id === editingExp.id);
      if (oldVersion) await removeExperience(profile.uid, oldVersion);
      await addExperience(profile.uid, editingExp);
      setEditingExp(null);
      toast({ title: "Experience updated" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to update" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEdu = async () => {
    if (!editingEdu) return;
    setLoading(true);
    try {
      const oldVersion = profile.education.find(e => e.id === editingEdu.id);
      if (oldVersion) await removeEducation(profile.uid, oldVersion);
      await addEducation(profile.uid, editingEdu);
      setEditingEdu(null);
      toast({ title: "Education updated" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to update" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExp = async (entry: ExperienceEntry) => {
    try {
      await removeExperience(profile.uid, entry);
      setEditingExp(null);
      toast({ title: "Experience removed" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to remove" });
    }
  };

  const handleRemoveEdu = async (entry: EducationEntry) => {
    try {
      await removeEducation(profile.uid, entry);
      setEditingEdu(null);
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
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h3 className="font-headline text-lg font-bold flex items-center gap-3 text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          Professional History
        </h3>
        {isOwnProfile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditMode(!isEditMode)}
            className={cn("h-8 w-8 rounded-full transition-colors", isEditMode ? "text-primary bg-primary/10" : "text-muted-foreground")}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>

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
              <div key={exp.id} className="flex gap-4 group relative">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-sm leading-tight truncate">{exp.role}</p>
                    {isEditMode && isOwnProfile && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-primary hover:bg-primary/5" onClick={() => setEditingExp(exp)}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold">
                    {exp.company} • {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                  </p>
                </div>
              </div>
            )) : !isAddingExp && (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile 
                    ? "Add your work history to show what you're capable of." 
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
              <div key={edu.id} className="flex gap-4 group relative">
                <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-sm leading-tight truncate">{edu.degree}</p>
                    {isEditMode && isOwnProfile && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-secondary hover:bg-secondary/5" onClick={() => setEditingEdu(edu)}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold">
                    {edu.school} • {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endDate}
                  </p>
                </div>
              </div>
            )) : !isAddingEdu && (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile 
                    ? "Add your school to complete your builder profile." 
                    : "No education listed."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Dialogs */}
      <Dialog open={!!editingExp} onOpenChange={(open) => !open && setEditingExp(null)}>
        <DialogContent className="rounded-[2rem]">
          <DialogHeader><DialogTitle>Edit Experience</DialogTitle></DialogHeader>
          {editingExp && (
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>Company</Label><Input value={editingExp.company} onChange={e => setEditingExp({...editingExp, company: e.target.value})} /></div>
              <div className="space-y-2"><Label>Role</Label><Input value={editingExp.role} onChange={e => setEditingExp({...editingExp, role: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Start</Label><DatePicker value={editingExp.startDate} onChange={handleDateChange('startDate', (val) => setEditingExp(prev => ({...prev!, ...val})))} /></div>
                <div className="space-y-2"><Label>End</Label><DatePicker value={editingExp.endDate} onChange={handleDateChange('endDate', (val) => setEditingExp(prev => ({...prev!, ...val})))} showPresentButton /></div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="destructive" className="rounded-full" onClick={() => editingExp && handleRemoveExp(editingExp)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            <div className="flex-1" />
            <Button variant="ghost" onClick={() => setEditingExp(null)} className="rounded-full">Cancel</Button>
            <Button onClick={handleUpdateExp} disabled={loading} className="rounded-full px-8">{loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingEdu} onOpenChange={(open) => !open && setEditingEdu(null)}>
        <DialogContent className="rounded-[2rem]">
          <DialogHeader><DialogTitle>Edit Education</DialogTitle></DialogHeader>
          {editingEdu && (
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>School</Label><Input value={editingEdu.school} onChange={e => setEditingEdu({...editingEdu, school: e.target.value})} /></div>
              <div className="space-y-2"><Label>Degree</Label><Input value={editingEdu.degree} onChange={e => setEditingEdu({...editingEdu, degree: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Start</Label><DatePicker value={editingEdu.startYear} onChange={handleDateChange('startYear', (val) => setEditingEdu(prev => ({...prev!, ...val})))} /></div>
                <div className="space-y-2"><Label>End</Label><DatePicker value={editingEdu.endDate} onChange={handleDateChange('endDate', (val) => setEditingEdu(prev => ({...prev!, ...val})))} showPresentButton /></div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="destructive" className="rounded-full" onClick={() => editingEdu && handleRemoveEdu(editingEdu)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            <div className="flex-1" />
            <Button variant="ghost" onClick={() => setEditingEdu(null)} className="rounded-full">Cancel</Button>
            <Button onClick={handleUpdateEdu} disabled={loading} className="rounded-full px-8">{loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
