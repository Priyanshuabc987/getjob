
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Plus, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { addExperience, removeExperience } from '@/features/users/services/write';
import { ExperienceEntry } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import ExperienceForm from '@/features/users/components/ExperienceForm';
import { formatProfessionalDate, calculateDuration } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

interface EditExperienceFormProps {
  userId: string;
  experience: ExperienceEntry[];
}

const ExpandableText = ({ text }: { text: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = text.length > 100;

    if (!isLongText) {
        return <p className="text-sm text-muted-foreground whitespace-pre-line pt-2">{text}</p>;
    }

    return (
        <div className="pt-2">
            <p className={`text-sm text-muted-foreground whitespace-pre-line ${!isExpanded ? 'line-clamp-2' : ''}`}>
                {text}
            </p>
            <span
                className="text-primary font-medium pl-3 cursor-pointer text-sm"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'see less' : '...see more'}
            </span>
        </div>
    );
};

export function EditExperienceForm({ userId, experience: initialExperience }: EditExperienceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [experience, setExperience] = useState<ExperienceEntry[]>(initialExperience || []);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = async (form: Partial<ExperienceEntry>) => {
    if (!form.role || !form.company || !form.startDate) {
      toast({ variant: "destructive", title: "Missing fields", description: "Role, Company, and Start Date are required." });
      return;
    }
    setLoading(true);
    try {
      const isNew = !editingId;
      let updatedExperienceList = [...experience];

      if (isNew) {
        const newEntry: ExperienceEntry = {
            id: uuidv4(),
            role: form.role,
            company: form.company,
            startDate: form.startDate!,
            endDate: form.endDate || undefined,
            isCurrent: form.isCurrent || false,
            description: form.description || undefined,
        };
        await addExperience(userId, newEntry);
        updatedExperienceList.push(newEntry);
        toast({ title: "Experience added!" });
      } else {
        const oldEntry = experience.find(e => e.id === editingId);
        if (!oldEntry) throw new Error("Original entry not found");

        const newEntry: ExperienceEntry = { ...oldEntry, ...form };

        await removeExperience(userId, oldEntry);
        await addExperience(userId, newEntry);
        
        updatedExperienceList = experience.map(e => e.id === editingId ? newEntry : e);
        toast({ title: "Experience updated!" });
      }

      setExperience(updatedExperienceList);
      setIsAdding(false);
      setEditingId(null);
      router.refresh();
    } catch  {
      toast({ variant: "destructive", title: "Failed to save experience" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (exp: ExperienceEntry) => {
    if (!exp.id) return;
    setDeletingId(exp.id);
    try {
      await removeExperience(userId, exp);
      setExperience(prev => prev.filter(e => e.id !== exp.id));
      toast({ title: "Experience removed" });
      setEditingId(null);
      router.refresh();
    } catch {
        toast({ variant: "destructive", title: "Failed to remove experience" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-headline font-bold">Experience History</h1>
        {!isAdding && !editingId && (
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
            entry={{ role: '', company: '', startDate: '' }}
            onSave={handleSave}
            onCancel={() => setIsAdding(false)}
            loading={loading}
            deleting={false}
          />
        </Card>
      )}

      <div className="space-y-4">
        {experience.map(exp => (
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
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="font-bold text-lg">{exp.role}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {formatProfessionalDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatProfessionalDate(exp.endDate || '')}
                      {exp.startDate && <span className="ml-2">({calculateDuration(exp.startDate, exp.isCurrent ? new Date().getFullYear().toString() : (exp.endDate || ''))})</span>}
                    </p>
                    {exp.description && <ExpandableText text={exp.description} />}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditingId(exp.id)} className="rounded-full text-muted-foreground hover:text-primary shrink-0">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </Card>
            )}
          </div>
        ))}
        {experience.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-4 border-dashed">
            <p className="text-muted-foreground italic font-medium">No experience entries yet. Build your professional story.</p>
          </div>
        )}
      </div>
    </div>
  );
}
