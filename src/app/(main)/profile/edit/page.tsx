
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Briefcase, GraduationCap, Loader2, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { updateProfile } from '@/features/users/services/write';
import { UserProfileData } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function EditProfilePage() {
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await updateProfile(profile.uid, profile);
      toast({ title: "Profile Updated!", description: "Your changes are now live on the platform." });
      router.push(`/profile/${profile.uid}`);
    } catch (e) {
      toast({ variant: "destructive", title: "Update Failed", description: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href={`/profile/${profile.uid}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium font-bold">Back to Profile</span>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Edit Builder Settings</h1>
            <p className="text-muted-foreground">Manage your identity, professional history, and showcase preferences.</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-8">
            {/* General Info */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b">
                <CardTitle className="flex items-center gap-3"><User className="w-5 h-5 text-primary" /> General Identity</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Display Name</Label>
                    <Input 
                      value={profile.displayName} 
                      onChange={e => setProfile({...profile, displayName: e.target.value})} 
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">College / University</Label>
                    <Input 
                      value={profile.collegeName} 
                      onChange={e => setProfile({...profile, collegeName: e.target.value})} 
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">About Builder (Bio)</Label>
                  <Textarea 
                    value={profile.bio} 
                    onChange={e => setProfile({...profile, bio: e.target.value})} 
                    placeholder="Tell your story..." 
                    className="min-h-[150px] rounded-2xl leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">City</Label>
                    <Input 
                      value={profile.location.city} 
                      onChange={e => setProfile({...profile, location: {...profile.location, city: e.target.value}})} 
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Country</Label>
                    <Input 
                      value={profile.location.country} 
                      onChange={e => setProfile({...profile, location: {...profile.location, country: e.target.value}})} 
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Settings */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b">
                <CardTitle className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-primary" /> Visual Assets</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Profile Picture URL</Label>
                    <Input value={profile.photoURL} onChange={e => setProfile({...profile, photoURL: e.target.value})} className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Banner Image URL</Label>
                    <Input value={profile.bannerUrl} onChange={e => setProfile({...profile, bannerUrl: e.target.value})} className="rounded-xl h-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4 flex items-center justify-between gap-4 sticky bottom-4">
              <Link href={`/profile/${profile.uid}`} className="flex-1">
                <Button variant="outline" type="button" className="w-full h-14 rounded-full font-bold bg-white shadow-xl">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading} className="flex-[2] h-14 rounded-full font-bold text-lg action-button-glow">
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
