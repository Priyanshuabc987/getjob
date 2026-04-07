
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateStartupDescription } from '@/features/startups/actions/update';
import { StartupProfile } from '@/features/startups/types';
import { useToast } from '@/hooks/use-toast';

export function EditStartupDescriptionForm({ startup }: { startup: StartupProfile }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [description, setDescription] = useState(startup.description);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isDirty) {
      setIsDirty(true);
    }
    setDescription(e.target.value);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('description', description);

    const result = await updateStartupDescription(startup.id, null, form);

    if (result.success) {
        toast({ title: "Description Saved!", description: "Your startup's story has been updated." });
        router.push(`/startups/${result.startupSlug}`);
    } else {
      toast({ variant: "destructive", title: "Update Failed", description: result.message });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
        <div className="space-y-4">
            <Label htmlFor="description" className="text-[10px] uppercase font-bold text-muted-foreground">Startup Story <span className="text-destructive">*</span></Label>
            <Textarea 
                id="description"
                name="description"
                value={description} 
                onChange={handleChange} 
                placeholder="Tell your startup's story, its mission, and the problem it solves..." 
                className="min-h-[400px] rounded-2xl leading-relaxed text-lg"
                required
            />
            <p className="text-xs text-muted-foreground italic">This is your chance to shine. Make it compelling!</p>
        </div>

        <div className="pt-6">
            <Button type="submit" disabled={loading || !isDirty} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                Update Description
            </Button>
        </div>
    </form>
  );
}
