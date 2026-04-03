
"use client";

import { useState, useRef, useEffect } from 'react';
import { BriefcaseBusiness,Building2, GraduationCap, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserProfileData, ExperienceEntry, EducationEntry } from '../types';
import Link from 'next/link';
import { formatProfessionalDate, calculateDuration } from '@/lib/utils';

const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkClamping = () => {
      if (textRef.current) {
        // If scrollHeight is greater than clientHeight, the text is overflowing
        setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
      }
    };
    
    checkClamping();
    // Re-check on window resize
    window.addEventListener('resize', checkClamping);
    return () => window.removeEventListener('resize', checkClamping);
  }, [text]);

  return (
    <div className="pt-2">
      <div className="relative">
        <p
          ref={textRef}
          className={`text-sm text-muted-foreground whitespace-pre-line ${
            !isExpanded ? 'line-clamp-2' : ''
          }`}
        >
          {text}
        </p>
        {isClamped && !isExpanded && (
          <div className="absolute bottom-0 right-0 w-full flex justify-end bg-gradient-to-l pointer-events-none">
             <span
              className="bg-white text-primary font-medium pl-3 pointer-events-auto cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              ... more
            </span>
          </div>
        )}
      </div>
      {isClamped && isExpanded && (
        <button
          className="text-primary font-medium cursor-pointer text-sm"
          onClick={() => setIsExpanded(false)}
        >
          see less
        </button>
      )}
    </div>
  );
};

export function ProfessionalHistory({ profile, isOwnProfile }: {
  profile: UserProfileData;
  isOwnProfile: boolean;
}) {
  
  return (
    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl bg-card p-6 md:p-6">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h3 className="font-headline text-lg font-bold flex items-center gap-3 text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BriefcaseBusiness className="w-4 h-4 text-primary" />
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
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary">
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {profile.experience && profile.experience.length > 0 ? profile.experience.map((exp: ExperienceEntry) => (
              <div key={exp.id} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-bold text-sm leading-tight">{exp.role}</p>
                  <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {formatProfessionalDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatProfessionalDate(exp.endDate || '')}
                    <span className="ml-2">({calculateDuration(new Date(exp.startDate), exp.isCurrent ? new Date() : new Date(exp.endDate || ''))})</span>
                  </p>
                  {exp.description && <ExpandableText text={exp.description} />}
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
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary">
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {profile.education && profile.education.length > 0 ? profile.education.map((edu: EducationEntry) => (
              <div key={edu.id} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-bold text-sm leading-tight">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground font-medium">{edu.school}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {formatProfessionalDate(edu.startYear)} - {edu.isCurrent ? 'Present' : formatProfessionalDate(edu.endDate || '')}
                     <span className="ml-2">({calculateDuration(new Date(edu.startYear), edu.isCurrent ? new Date() : new Date(edu.endDate || ''))})</span>
                  </p>
                  {edu.description && <ExpandableText text={edu.description} />}
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
