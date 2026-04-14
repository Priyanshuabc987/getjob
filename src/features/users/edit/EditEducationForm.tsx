
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Plus, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { addEducation, removeEducation } from '@/features/users/services/write';
import { EducationEntry } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import EducationForm from '@/features/users/components/EducationForm';
import { formatProfessionalDate, calculateDuration } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

interface EditEducationFormProps {
  userId: string;
  education: EducationEntry[];
}

// NOTE: This is a simplified ExpandableText, ideal for this controlled component context.
const ExpandableText = ({ text }: { text: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    // Simple check: if text is longer than a certain amount, it's expandable.
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

export function EditEducationForm({ userId, education: initialEducation }: EditEducationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [education, setEducation] = useState<EducationEntry[]>(initialEducation || []);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = async (form: Partial<EducationEntry>) => {
    if (!form.school || !form.degree || !form.fieldOfStudy || !form.startYear) {
      toast({ variant: "destructive", title: "Missing fields", description: "School, Degree, Field of Study, and Start Year are required." });
      return;
    }
    setLoading(true);
    try {
      const isNew = !editingId;
      let updatedEducationList = [...education];

      if (isNew) {
        const newEntry: EducationEntry = {
            id: uuidv4(),
            school: form.school,
            degree: form.degree,
            fieldOfStudy: form.fieldOfStudy,
            startYear: form.startYear!,
            endDate: form.endDate || undefined,
            isCurrent: form.isCurrent || false,
            description: form.description || undefined,
        };
        await addEducation(userId, newEntry);
        updatedEducationList.push(newEntry);
        toast({ title: "Education added!" });
      } else {
        const oldEntry = education.find(e => e.id === editingId);
        if (!oldEntry) throw new Error("Original entry not found");

        const newEntry: EducationEntry = { ...oldEntry, ...form };

        // The backend functions are atomic array operations (add/remove).
        // To 'update', we remove the old and add the new.
        await removeEducation(userId, oldEntry);
        await addEducation(userId, newEntry);
        
        updatedEducationList = education.map(e => e.id === editingId ? newEntry : e);
        toast({ title: "Education updated!" });
      }

      setEducation(updatedEducationList);
      setIsAdding(false);
      setEditingId(null);
      router.refresh(); // Refresh server components
    } catch  {
      toast({ variant: "destructive", title: "Failed to save education" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (edu: EducationEntry) => {
    if (!edu.id) return;
    setDeletingId(edu.id);
    try {
      await removeEducation(userId, edu);
      setEducation(prev => prev.filter(e => e.id !== edu.id));
      toast({ title: "Education removed" });
      setEditingId(null); // Close the form after deletion
      router.refresh();
    } catch {
        toast({ variant: "destructive", title: "Failed to remove education" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-headline font-bold">Education History</h1>
        {!isAdding && !editingId && (
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
            entry={{ school: '', degree: '', fieldOfStudy: '', startYear: '' }} // Set default value for fieldOfStudy
            onSave={handleSave}
            onCancel={() => setIsAdding(false)}
            loading={loading}
            deleting={false}
          />
        </Card>
      )}

      <div className="space-y-4">
        {education.map(edu => (
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
                  <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="font-bold text-lg">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{edu.school}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {formatProfessionalDate(edu.startYear)} - {edu.isCurrent ? 'Present' : formatProfessionalDate(edu.endDate || '')}
                      {edu.startYear && <span className="ml-2">({calculateDuration(edu.startYear, edu.isCurrent ? new Date().toISOString() : (edu.endDate || ''))})</span>}
                    </p>
                    {edu.description && <ExpandableText text={edu.description} />}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditingId(edu.id)} className="rounded-full text-muted-foreground hover:text-secondary shrink-0">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </Card>
            )}
          </div>
        ))}
        {education.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-4 border-dashed">
            <p className="text-muted-foreground italic font-medium">No education entries yet. Share your learning path.</p>
          </div>
        )}
      </div>
    </div>
  );
}
