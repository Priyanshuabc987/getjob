
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit3, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks';
import { getCachedUserProfile } from '@/features/users/services/read';
import { updateProfile } from '@/features/users/services/write';
import { UserProfileData } from '@/features/users/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function EditAboutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getCachedUserProfile(user.uid).then(data => {
        if (data) {
          setBio(data.bio || '');
          setUid(data.uid);
        }
        setInitialLoading(false);
      });
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(uid, { bio });
      toast({ title: "Story Saved!", description: "Your bio has been updated." });
      router.push(`/profile/${uid}`);
    } catch (e) {
      toast({ variant: "destructive", title: "Update Failed" });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Link href={`/profile/${uid}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Profile</span>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-headline font-bold">Builder Story</h1>
          
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
                    onChange={e => setBio(e.target.value)} 
                    placeholder="Tell your story, your vision, and what you are building..." 
                    className="min-h-[400px] rounded-2xl leading-relaxed text-lg"
                    required
                  />
                  <p className="text-xs text-muted-foreground italic">Use this space to highlight your unique value and passion for building.</p>
                </div>

                <div className="pt-6">
                  <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                    Update Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
}
