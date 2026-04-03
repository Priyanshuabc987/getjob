
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, GraduationCap, Plus, Loader2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { addEducation, removeEducation } from '@/features/users/services/write';
import { UserProfileData, EducationEntry } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import EducationForm from '@/features/users/components/EducationForm';
import { formatProfessionalDate, calculateDuration } from '@/lib/utils';

const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkClamping = () => {
      if (textRef.current) {
        setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
      }
    };
    
    checkClamping();
    window.addEventListener('resize', checkClamping);
    return () => window.removeEventListener('resize', checkClamping);
  }, [text]);

  return (
    <div className="pt-2">
      <div className="relative">
        <p
          ref={textRef}
          className={`text-sm text-muted-foreground whitespace-pre-line ${
            !isExpanded ? 'line-clamp-2' : ''
          }`}
        >
          {text}
        </p>
        {isClamped && !isExpanded && (
          <div className="absolute bottom-0 right-0 w-full flex justify-end bg-gradient-to-l pointer-events-none">
             <span
              className="bg-white text-primary font-medium pl-3 pointer-events-auto cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              ...see more
            </span>
          </div>
        )}
      </div>
      {isClamped && isExpanded && (
        <button
          className="text-primary font-medium cursor-pointer text-sm"
          onClick={() => setIsExpanded(false)}
        >
          see less
        </button>
      )}
    </div>
  );
};

export default function ManageEducationPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getCachedUserProfile(user.uid).then(data => {
        setProfile(data);
        setInitialLoading(false);
      });
    }
  }, [user]);

  const handleSave = async (form: Partial<EducationEntry>) => {
    if (!form.school || !form.degree) {
      toast({ variant: "destructive", title: "Missing fields", description: "School and Degree are required." });
      return;
    }
    if (!profile) return;
    setLoading(true);
    try {
      const isNew = !editingId;
      if (!isNew && editingId) {
        const old = profile.education.find(e => e.id === editingId);
        if (old) await removeEducation(profile.uid, old);
      }
      const entry: EducationEntry = {
        ...form as EducationEntry,
        id: isNew ? Math.random().toString(36).substr(2, 9) : editingId!
      };
      await addEducation(profile.uid, entry);
      
      const updatedProfile = await getCachedUserProfile(profile.uid);
      setProfile(updatedProfile);
      
      setIsAdding(false);
      setEditingId(null);
      toast({ title: isNew ? "Education added!" : "Education updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to save" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (edu: EducationEntry) => {
    if (!profile) return;
    setDeletingId(edu.id);
    try {
      await removeEducation(profile.uid, edu);
      const updatedProfile = await getCachedUserProfile(profile.uid);
      setProfile(updatedProfile);
      toast({ title: "Education removed" });
    } finally {
      setDeletingId(null);
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
              <EducationForm
                entry={{}}
                onSave={handleSave}
                onCancel={() => setIsAdding(false)}
                loading={loading}
                deleting={false}
              />
            </Card>
          )}

          <div className="space-y-4">
            {profile.education.map(edu => (
              <div key={edu.id}>
                {editingId === edu.id ? (
                  <Card className="rounded-3xl border-2 border-secondary/20 shadow-xl bg-white dark:bg-card overflow-hidden">
                     <CardHeader className="p-6 border-b bg-secondary/5">
                        <CardTitle className="text-lg">Edit Education</CardTitle>
                     </CardHeader>
                    <EducationForm
                      entry={edu}
                      onSave={handleSave}
                      onDelete={() => handleDelete(edu)}
                      onCancel={() => setEditingId(null)}
                      loading={loading}
                      deleting={deletingId === edu.id}
                    />
                  </Card>
                ) : (
                  <Card className="rounded-2xl border-none shadow-md bg-white dark:bg-card p-6 flex items-start justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h4 className="font-bold text-lg">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{edu.school}</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          {formatProfessionalDate(edu.startYear)} - {edu.isCurrent ? 'Present' : formatProfessionalDate(edu.endDate || '')}
                          <span className="ml-2">({calculateDuration(new Date(edu.startYear), edu.isCurrent ? new Date() : new Date(edu.endDate || ''))})</span>
                        </p>
                        {edu.description && <ExpandableText text={edu.description} />}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setEditingId(edu.id)} className="rounded-full text-muted-foreground hover:text-secondary">
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
