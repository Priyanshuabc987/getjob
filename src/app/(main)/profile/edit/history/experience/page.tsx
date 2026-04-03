
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Briefcase, Plus, Loader2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { addExperience, removeExperience } from '@/features/users/services/write';
import { UserProfileData, ExperienceEntry } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import ExperienceForm from '@/features/users/components/ExperienceForm';
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

export default function ManageExperiencePage() {
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

  const handleSave = async (form: Partial<ExperienceEntry>) => {
    if (!form.company || !form.role) {
      toast({ variant: "destructive", title: "Missing fields", description: "Company and Role are required." });
      return;
    }
    if (!profile) return;
    setLoading(true);
    try {
      const isNew = !editingId;
      if (!isNew && editingId) {
        const old = profile.experience.find(e => e.id === editingId);
        if (old) await removeExperience(profile.uid, old);
      }
      const entry: ExperienceEntry = {
        ...form as ExperienceEntry,
        id: isNew ? Math.random().toString(36).substr(2, 9) : editingId!
      };
      await addExperience(profile.uid, entry);
      
      const updatedProfile = await getCachedUserProfile(profile.uid);
      setProfile(updatedProfile);
      
      setIsAdding(false);
      setEditingId(null);
      toast({ title: isNew ? "Experience added!" : "Experience updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to save" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (exp: ExperienceEntry) => {
    if (!profile) return;
    setDeletingId(exp.id);
    try {
      await removeExperience(profile.uid, exp);
      const updatedProfile = await getCachedUserProfile(profile.uid);
      setProfile(updatedProfile);
      toast({ title: "Experience removed" });
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
            <h1 className="text-4xl font-headline font-bold">Experience History</h1>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} className="rounded-full gap-2 px-6 action-button-glow font-bold">
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            )}
          </div>

          {isAdding && (
             <Card className="rounded-3xl border-2 border-primary/20 shadow-xl bg-white dark:bg-card overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <CardHeader className="p-6 border-b bg-primary/5">
                <CardTitle className="text-lg">New Experience</CardTitle>
              </CardHeader>
              <ExperienceForm
                entry={{}}
                onSave={handleSave}
                onCancel={() => setIsAdding(false)}
                loading={loading}
                deleting={false}
              />
            </Card>
          )}

          <div className="space-y-4">
            {profile.experience.map(exp => (
              <div key={exp.id}>
                {editingId === exp.id ? (
                  <Card className="rounded-3xl border-2 border-primary/20 shadow-xl bg-white dark:bg-card overflow-hidden">
                     <CardHeader className="p-6 border-b bg-primary/5">
                        <CardTitle className="text-lg">Edit Experience</CardTitle>
                     </CardHeader>
                    <ExperienceForm
                      entry={exp}
                      onSave={handleSave}
                      onDelete={() => handleDelete(exp)}
                      onCancel={() => setEditingId(null)}
                      loading={loading}
                      deleting={deletingId === exp.id}
                    />
                  </Card>
                ) : (
                  <Card className="rounded-2xl border-none shadow-md bg-white dark:bg-card p-6 flex items-start justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h4 className="font-bold text-lg">{exp.role}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          {formatProfessionalDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatProfessionalDate(exp.endDate || '')}
                          <span className="ml-2">({calculateDuration(new Date(exp.startDate), exp.isCurrent ? new Date() : new Date(exp.endDate || ''))})</span>
                        </p>
                        {exp.description && <ExpandableText text={exp.description} />}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setEditingId(exp.id)} className="rounded-full text-muted-foreground hover:text-primary">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Card>
                )}
              </div>
            ))}
            {profile.experience.length === 0 && !isAdding && (
              <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-4 border-dashed">
                <p className="text-muted-foreground italic font-medium">No experience entries yet. Add your first proof-of-work.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
