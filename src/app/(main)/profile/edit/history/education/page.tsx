"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, GraduationCap, Plus, Trash2, Loader2, Check, X, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { addEducation, removeEducation } from '@/features/users/services/write';
import { UserProfileData, EducationEntry } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ManageEducationPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<EducationEntry>>({
    school: '', degree: '', fieldOfStudy: '', startYear: '', endDate: '', isCurrent: false, description: ''
  });

  useEffect(() => {
    if (user) {
      getCachedUserProfile(user.uid).then(data => {
        setProfile(data);
        setInitialLoading(false);
      });
    }
  }, [user]);

  const handleSave = async (isNew: boolean = true, entryId?: string) => {
    if (!form.school || !form.degree) {
      toast({ variant: "destructive", title: "Missing fields", description: "School and Degree are required." });
      return;
    }
    if (!profile) return;
    setLoading(true);
    try {
      if (!isNew && entryId) {
        const old = profile.education.find(e => e.id === entryId);
        if (old) await removeEducation(profile.uid, old);
      }
      const entry: EducationEntry = {
        ...form as EducationEntry,
        id: isNew ? Math.random().toString(36).substr(2, 9) : entryId!
      };
      await addEducation(profile.uid, entry);
      
      const updatedProfile = await getCachedUserProfile(profile.uid);
      setProfile(updatedProfile);
      
      setIsAdding(false);
      setEditingId(null);
      setForm({ school: '', degree: '', fieldOfStudy: '', startYear: '', endDate: '', isCurrent: false, description: '' });
      toast({ title: isNew ? "Education added!" : "Education updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to save" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (edu: EducationEntry) => {
    if (!profile) return;
    setLoading(true);
    try {
      await removeEducation(profile.uid, edu);
      const updatedProfile = await getCachedUserProfile(profile.uid);
      setProfile(updatedProfile);
      toast({ title: "Education removed" });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-3xl mx-auto p-4 sm:p-6">
        <Link href={`/profile/${profile.uid}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Profile</span>
        </Link>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-headline font-bold">Education History</h1>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} className="rounded-full gap-2 px-6 action-button-glow font-bold">
                <Plus className="w-4 h-4" /> Add Education
              </Button>
            )}
          </div>

          {isAdding && (
            <Card className="rounded-3xl border-2 border-secondary/20 shadow-xl bg-white dark:bg-card overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <CardHeader className="p-6 border-b bg-secondary/5">
                <CardTitle className="text-lg">New Education</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">School / University <span className="text-destructive">*</span></Label>
                    <Input value={form.school} onChange={e => setForm({...form, school: e.target.value})} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Degree <span className="text-destructive">*</span></Label>
                    <Input value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Start Date <span className="text-destructive">*</span></Label>
                    <DatePicker value={form.startYear} onChange={d => setForm({...form, startYear: d === 'Present' ? 'Present' : d ? format(d, 'MM/yyyy') : ''})} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">End Date</Label>
                    <DatePicker value={form.endDate} onChange={d => setForm({...form, endDate: d === 'Present' ? 'Present' : d ? format(d, 'MM/yyyy') : '', isCurrent: d === 'Present'})} showPresentButton className="h-12" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => handleSave(true)} disabled={loading} className="flex-1 h-14 rounded-full font-bold text-lg action-button-glow bg-secondary hover:bg-secondary/90">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <><Check className="w-5 h-5 mr-2" /> Save Education</>}
                  </Button>
                  <Button variant="ghost" onClick={() => setIsAdding(false)} className="h-14 px-8 rounded-full font-bold">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {profile.education.map(edu => (
              <div key={edu.id}>
                {editingId === edu.id ? (
                  <Card className="rounded-3xl border-2 border-secondary/20 shadow-xl bg-white dark:bg-card p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold">School <span className="text-destructive">*</span></Label>
                        <Input defaultValue={edu.school} onChange={e => setForm({...form, school: e.target.value})} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold">Degree <span className="text-destructive">*</span></Label>
                        <Input defaultValue={edu.degree} onChange={e => setForm({...form, degree: e.target.value})} className="h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSave(false, edu.id)} disabled={loading} className="flex-1 h-12 rounded-full font-bold bg-secondary hover:bg-secondary/90">Update</Button>
                      <Button onClick={() => handleDelete(edu)} disabled={loading} variant="destructive" className="h-12 rounded-full px-6"><Trash2 className="w-5 h-5" /></Button>
                      <Button variant="ghost" onClick={() => setEditingId(null)} className="h-12 rounded-full px-6">Cancel</Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="rounded-2xl border-none shadow-md bg-white dark:bg-card p-6 flex items-center justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{edu.school} • {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endDate}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => { setEditingId(edu.id); setForm(edu); }} className="rounded-full text-muted-foreground hover:text-secondary">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Card>
                )}
              </div>
            ))}
            {profile.education.length === 0 && !isAdding && (
              <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-4 border-dashed">
                <p className="text-muted-foreground italic font-medium">No education entries yet. Share your learning path.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
