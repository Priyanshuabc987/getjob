
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Briefcase, GraduationCap, Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { addExperience, removeExperience, addEducation, removeEducation } from '@/features/users/services/write';
import { UserProfileData, ExperienceEntry, EducationEntry } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function EditHistoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getCachedUserProfile(user.uid).then(data => {
        setProfile(data);
        setInitialLoading(false);
      });
    }
  }, [user]);

  const handleRemoveExp = async (exp: ExperienceEntry) => {
    if (!profile) return;
    setLoading(true);
    try {
      await removeExperience(profile.uid, exp);
      setProfile({ ...profile, experience: profile.experience.filter(e => e.id !== exp.id) });
      toast({ title: "Experience removed" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEdu = async (edu: EducationEntry) => {
    if (!profile) return;
    setLoading(true);
    try {
      await removeEducation(profile.uid, edu);
      setProfile({ ...profile, education: profile.education.filter(e => e.id !== edu.id) });
      toast({ title: "Education removed" });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Link href={`/profile/${profile.uid}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Profile</span>
        </Link>

        <div className="space-y-12">
          <h1 className="text-4xl font-headline font-bold">Building History</h1>
          
          {/* Experience Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3"><Briefcase className="w-6 h-6 text-primary" /> Professional Path</h2>
              <Button variant="outline" className="rounded-full gap-2 border-primary/20 text-primary h-10 px-6 font-bold">
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {profile.experience.map((exp) => (
                <Card key={exp.id} className="rounded-2xl border-none shadow-md bg-white p-6 hover:shadow-lg transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{exp.role}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{exp.company} • {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveExp(exp)}
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
              {profile.experience.length === 0 && <p className="text-muted-foreground italic text-center py-10">No experience entries yet.</p>}
            </div>
          </section>

          {/* Education Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3"><GraduationCap className="w-6 h-6 text-secondary" /> Learning Path</h2>
              <Button variant="outline" className="rounded-full gap-2 border-secondary/20 text-secondary h-10 px-6 font-bold">
                <Plus className="w-4 h-4" /> Add Education
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {profile.education.map((edu) => (
                <Card key={edu.id} className="rounded-2xl border-none shadow-md bg-white p-6 hover:shadow-lg transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{edu.school} • {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endDate}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveEdu(edu)}
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
              {profile.education.length === 0 && <p className="text-muted-foreground italic text-center py-10">No education entries yet.</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
