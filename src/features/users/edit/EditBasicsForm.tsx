
"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfile } from '@/features/users/services/write';
import { UserProfileData } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';

export function EditBasicsForm({ userProfile }: { userProfile: UserProfileData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDirty, setIsDirty] = useState(false);
  const [profile, setProfile] = useState(userProfile);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;

    startTransition(async () => {
      try {
        await updateProfile(profile.uid, profile);
        toast({ title: "Identity Updated!", description: "Basic details have been refreshed." });
        setIsDirty(false);
        router.refresh();
      } catch (e) {
        toast({ variant: "destructive", title: "Update Failed", description: "Could not save changes." });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDirty) setIsDirty(true);
    const { name, value } = e.target;
    const [field, subfield] = name.split('.');

    if (subfield) {
        setProfile(prev => ({
            ...prev,
            [field]: {
                ...(prev as any)[field],
                [subfield]: value
            }
        }));
    } else {
        setProfile(prev => ({...prev, [name]: value}));
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-muted/20">
          <CardTitle className="flex items-center gap-3 text-xl"><User className="w-6 h-6 text-primary" /> Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Display Name <span className="text-destructive">*</span></Label>
              <Input name="displayName" value={profile.displayName} onChange={handleChange} className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">College / University <span className="text-destructive">*</span></Label>
              <Input name="collegeName" value={profile.collegeName} onChange={handleChange} className="h-12 rounded-xl" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">City <span className="text-destructive">*</span></Label>
              <Input name="location.city" value={profile.location.city} onChange={handleChange} className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Country <span className="text-destructive">*</span></Label>
              <Input name="location.country" value={profile.location.country} onChange={handleChange} className="h-12 rounded-xl" required />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-muted/20">
          <CardTitle className="flex items-center gap-3 text-xl"><ShieldCheck className="w-6 h-6 text-primary" /> Visual Assets</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Profile Picture URL</Label>
              <Input name="photoURL" value={profile.photoURL} onChange={handleChange} className="h-12 rounded-xl" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Banner Image URL</Label>
              <Input name="bannerUrl" value={profile.bannerUrl} onChange={handleChange} className="h-12 rounded-xl" placeholder="https://..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4 sticky bottom-4">
        <Button type="submit" disabled={isPending || !isDirty} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
          {isPending ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
          Save Identity
        </Button>
      </div>
    </form>
  );
}
