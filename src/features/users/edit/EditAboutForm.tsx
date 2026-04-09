
"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfile } from '@/features/users/services/write';
import { UserProfileData } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';

export function EditAboutForm({ userProfile }: { userProfile: UserProfileData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDirty, setIsDirty] = useState(false);
  const [bio, setBio] = useState(userProfile.bio || '');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;

    startTransition(async () => {
      try {
        await updateProfile(userProfile.uid, { bio });
        toast({ title: "Story Saved!", description: "Your bio has been updated." });
        setIsDirty(false);
        router.refresh();
      } catch (e) {
        toast({ variant: "destructive", title: "Update Failed", description: "Could not save your story." });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isDirty) setIsDirty(true);
    setBio(e.target.value);
  };

  return (
    <form onSubmit={handleUpdate}>
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-muted/20">
          <CardTitle className="flex items-center gap-3 text-xl"><Edit3 className="w-6 h-6 text-primary" /> Your Narrative</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-[10px] uppercase font-bold text-muted-foreground">About the Builder <span className="text-destructive">*</span></Label>
            <Textarea 
              value={bio} 
              onChange={handleChange} 
              placeholder="Tell your story, your vision, and what you are building..." 
              className="min-h-[400px] rounded-2xl leading-relaxed text-lg"
              required
            />
            <p className="text-xs text-muted-foreground italic">Use this space to highlight your unique value and passion for building.</p>
          </div>

          <div className="pt-6">
            <Button type="submit" disabled={isPending || !isDirty} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
              {isPending ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
              Update Story
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
