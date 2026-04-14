
"use client";

import { Edit2, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfileData } from '../types';
import { formatBuildingDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';

interface ProfileHeaderProps {
  profile: UserProfileData;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  const buildingDuration = formatBuildingDuration(profile.createdAt);

  return (
    <div className="relative pt-4 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Banner Container */}
      <div className={cn(
        "h-48 md:h-64 w-full rounded-2xl md:rounded-[2.5rem] relative overflow-hidden shadow-sm",
        !profile.bannerUrl && "bg-gradient-to-r from-primary to-secondary"
      )}>
        <Image 
          src={profile.bannerUrl || `https://picsum.photos/seed/${APP_NAME}-hero/1200/600`} 
          alt="Banner" 
          layout="fill" 
          objectFit="cover" 
          className="w-full h-full object-cover" 
        />
        
        {/* Credibility Score - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 md:px-5 md:py-2.5 rounded-[1.2rem] md:rounded-[1.5rem] flex flex-col items-center shadow-2xl z-20">
          <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Credibility</span>
          <span className="text-xl md:text-3xl font-headline font-bold text-white">{profile.credibilityScore}</span>
        </div>
      </div>

      {/* User Info & Avatar Overlap */}
      <div className="px-4 md:px-12 relative z-10 -mt-24 md:-mt-12">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
          {/* Avatar - Circular and Overlapping */}
          <div className="w-40 h-40 md:w-40 md:h-40 rounded-full p-2 md:p-3 bg-card shadow-2xl shrink-0">
            <Image 
              src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/400/400`} 
              alt={profile.displayName} 
              width={160} 
              height={160} 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>

          {/* User Details */}
          <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-2 md:pb-0">
            <div className="space-y-1 md:space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-headline font-bold text-foreground flex items-center gap-2 md:gap-3">
                  {profile.displayName}
                  {profile.credibilityScore > 80 && <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-primary fill-current text-white" />}
                </h1>
                {isOwnProfile && (
                  <Link href={`/profile/${profile.uid}/edit/basics`}>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                 <p className="text-primary font-bold text-xs md:text-base">@{profile.role || 'builder'}</p>
                 {profile.collegeName && (
                   <span className="text-muted-foreground font-bold text-[10px] md:text-sm">• {profile.collegeName}</span>
                 )}
              </div>
              <div className="flex flex-wrap items-center gap-1 md:gap-1 text-muted-foreground font-bold text-[10px] md:text-xs mt-1 md:mt-2">
                {/* <div className="flex items-center gap-1.5 "> */}
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {profile.location?.city || 'Earth'}, {profile.location?.country || 'Core'}
                {/* </div> */}
                <div className="flex items-center gap-1.5 px-3 ml-3 md:ml-3 py-1 bg-card rounded-full shadow-sm border border-muted/50">
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
