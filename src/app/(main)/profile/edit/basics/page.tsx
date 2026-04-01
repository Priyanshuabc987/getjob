
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, ShieldCheck, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { updateProfile } from '@/features/users/services/write';
import { UserProfileData } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function EditBasicsPage() {
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await updateProfile(profile.uid, profile);
      toast({ title: "Identity Updated!", description: "Basic details have been refreshed." });
      router.push(`/profile/${profile.uid}`);
    } catch (e) {
      toast({ variant: "destructive", title: "Update Failed" });
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
          <h1 className="text-4xl font-headline font-bold">Identity Settings</h1>
          
          <form onSubmit={handleUpdate} className="space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
              <CardHeader className="p-8 border-b bg-muted/20">
                <CardTitle className="flex items-center gap-3 text-xl"><User className="w-6 h-6 text-primary" /> Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Display Name <span className="text-destructive">*</span></Label>
                    <Input value={profile.displayName} onChange={e => setProfile({...profile, displayName: e.target.value})} className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">College / University <span className="text-destructive">*</span></Label>
                    <Input value={profile.collegeName} onChange={e => setProfile({...profile, collegeName: e.target.value})} className="h-12 rounded-xl" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">City <span className="text-destructive">*</span></Label>
                    <Input value={profile.location.city} onChange={e => setProfile({...profile, location: {...profile.location, city: e.target.value}})} className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Country <span className="text-destructive">*</span></Label>
                    <Input value={profile.location.country} onChange={e => setProfile({...profile, location: {...profile.location, country: e.target.value}})} className="h-12 rounded-xl" required />
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
                    <Input value={profile.photoURL} onChange={e => setProfile({...profile, photoURL: e.target.value})} className="h-12 rounded-xl" placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Banner Image URL</Label>
                    <Input value={profile.bannerUrl} onChange={e => setProfile({...profile, bannerUrl: e.target.value})} className="h-12 rounded-xl" placeholder="https://..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4 sticky bottom-4">
              <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                Save Identity
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
