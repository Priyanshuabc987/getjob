"use client";

import { useState } from 'react';
import { Edit2, MapPin, Clock, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfileData } from '../types';
import { updateProfile } from '../services/write';
import { useToast } from '@/hooks/use-toast';
import { formatBuildingDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  profile: UserProfileData;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    displayName: profile.displayName || '',
    collegeName: profile.collegeName || '',
    city: profile.location?.city || '',
    country: profile.location?.country || '',
    photoURL: profile.photoURL || '',
    bannerUrl: profile.bannerUrl || '',
  });

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(profile.uid, {
        displayName: formData.displayName,
        collegeName: formData.collegeName,
        photoURL: formData.photoURL,
        bannerUrl: formData.bannerUrl,
        location: { city: formData.city, country: formData.country }
      });
      setIsEditing(false);
      toast({ title: "Profile updated!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  const buildingDuration = formatBuildingDuration(profile.createdAt);

  const EditButtonContent = () => (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2rem] w-[calc(100%-2rem)] max-w-md">
        <DialogHeader><DialogTitle className="text-xl font-headline">Update Profile</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-2"><Label>Display Name</Label><Input value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} className="rounded-xl" /></div>
          <div className="space-y-2"><Label>College</Label><Input value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} className="rounded-xl" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>City</Label><Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Country</Label><Input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="rounded-xl" /></div>
          </div>
          <div className="space-y-2"><Label>Avatar URL</Label><Input value={formData.photoURL} onChange={e => setFormData({...formData, photoURL: e.target.value})} className="rounded-xl" /></div>
          <div className="space-y-2"><Label>Banner Image URL</Label><Input value={formData.bannerUrl} onChange={e => setFormData({...formData, bannerUrl: e.target.value})} className="rounded-xl" /></div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateProfile} disabled={loading} className="w-full h-12 rounded-full font-bold">{loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="relative pt-4 md:pt-6 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Banner Container */}
      <div className={cn(
        "h-48 md:h-64 w-full rounded-2xl md:rounded-[2.5rem] relative overflow-hidden shadow-lg",
        !profile.bannerUrl && "bg-gradient-to-r from-primary to-secondary"
      )}>
        <img 
          src={profile.bannerUrl || "https://picsum.photos/seed/preplinc-hero/1200/600"} 
          alt="Banner" 
          className="w-full h-full object-cover" 
        />
        
        {/* Credibility Score - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 md:px-5 md:py-2.5 rounded-[1.2rem] md:rounded-[1.5rem] flex flex-col items-center shadow-2xl z-20">
          <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Credibility</span>
          <span className="text-xl md:text-3xl font-headline font-bold text-white">{profile.credibilityScore}</span>
        </div>
      </div>

      {/* User Info & Avatar Overlap */}
      <div className="px-4 md:px-12 relative z-10 -mt-20 md:-mt-28">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
          {/* Avatar - Circular and Overlapping */}
          <div className="w-32 h-32 md:w-56 md:h-56 rounded-full p-1.5 md:p-2 bg-card shadow-2xl shrink-0">
            <img 
              src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/400/400`} 
              alt={profile.displayName} 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>

          {/* User Details */}
          <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-2 md:pb-4">
            <div className="space-y-1.5 md:space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-headline font-bold text-foreground flex items-center gap-2 md:gap-3">
                  {profile.displayName}
                  {profile.credibilityScore > 80 && <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-primary fill-current text-white" />}
                </h1>
                {isOwnProfile && <EditButtonContent />}
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                 <p className="text-primary font-bold text-xs md:text-base">@{profile.role || 'builder'}</p>
                 {profile.collegeName && (
                   <span className="text-muted-foreground font-bold text-[10px] md:text-sm">• {profile.collegeName}</span>
                 )}
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-muted-foreground font-bold text-[10px] md:text-xs mt-1 md:mt-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-card rounded-full shadow-sm border border-muted/50">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {profile.location?.city || 'Earth'}, {profile.location?.country || 'Core'}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-card rounded-full shadow-sm border border-muted/50">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Building for {buildingDuration}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
