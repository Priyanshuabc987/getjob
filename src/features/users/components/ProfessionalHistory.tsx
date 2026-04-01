"use client";

import { Briefcase, GraduationCap, Plus, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserProfileData } from '../types';
import Link from 'next/link';

interface ProfessionalHistoryProps {
  profile: UserProfileData;
  isOwnProfile: boolean;
}

export function ProfessionalHistory({ profile, isOwnProfile }: ProfessionalHistoryProps) {
  return (
    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl bg-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h3 className="font-headline text-lg font-bold flex items-center gap-3 text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          Professional History
        </h3>
      </div>

      <div className="space-y-8 md:space-y-10">
        {/* Experience Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
            {isOwnProfile && (
              <div className="flex items-center gap-1">
                <Link href="/profile/edit/history/experience">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-primary hover:bg-primary/5">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/profile/edit/history/experience">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary">
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {profile.experience && profile.experience.length > 0 ? profile.experience.map(exp => (
              <div key={exp.id} className="flex gap-4 group relative">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-tight truncate">{exp.role}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">{exp.company} • {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                </div>
              </div>
            )) : (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile ? "Show the builders your potential to get jobs/tasks easily." : "No experience listed."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
            {isOwnProfile && (
              <div className="flex items-center gap-1">
                <Link href="/profile/edit/history/education">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-primary hover:bg-primary/5">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/profile/edit/history/education">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary">
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {profile.education && profile.education.length > 0 ? profile.education.map(edu => (
              <div key={edu.id} className="flex gap-4 group relative">
                <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-tight truncate">{edu.degree}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">{edu.school} • {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endDate}</p>
                </div>
              </div>
            )) : (
              <div className="p-4 rounded-2xl bg-muted/20 border border-dashed text-center">
                <p className="text-[10px] text-muted-foreground italic font-medium">
                  {isOwnProfile ? "Show the builders your potential to get jobs/tasks easily." : "No education listed."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
