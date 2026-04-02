'use client';

import { Job } from '@/features/jobs/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, ChevronRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card key={job.id} className="bg-white dark:bg-card hover:border-primary/50 transition-all duration-300 ease-in-out rounded-xl border shadow-sm flex flex-col">
        <CardContent className="p-6 flex-grow">
            <div className="flex items-start gap-4 mb-4">
                <Image src={job.startupLogoUrl} alt={`${job.startupName} logo`} width={48} height={48} className="rounded-lg border" />
                <div className="flex-1">
                    <h3 className="text-lg font-bold leading-tight hover:text-primary transition-colors"><Link href={`/jobs/${job.id}`}>{job.title}</Link></h3>
                    <p className="text-sm text-muted-foreground">at {job.startupName}</p>
                </div>
            </div>

            {/* <div className="mb-4 flex flex-wrap gap-2">
                {job.skills.slice(0, 3).map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div> */}

            <div className="text-sm text-muted-foreground space-y-3 pt-4 border-t">
                <div className="flex justify-start gap-2">
                    <span className="font-semibold text-foreground">Location:</span>
                    <span className="text-right">{job.location} {job.remote && '(Remote)'}</span>
                </div>
                 <div className="flex justify-start gap-2">
                    <span className="font-semibold text-foreground">Type:</span>
                    <span className="text-right">{job.type}</span>
                </div>
                 <div className="flex justify-start gap-2">
                    <span className="font-semibold text-foreground">Stipend:</span>
                    <span className="text-right">{job.compensationType}{job.stipend && `: ${job.stipend}`}</span>
                </div>
            </div>
        </CardContent>
        <div className="p-4 bg-muted/30 dark:bg-card-dark-nested border-t flex justify-between items-center rounded-b-xl">
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                <Zap className="w-4 h-4 text-primary"/>
                <span>{job.applicantsCount} Applicants</span>
            </div>
            <Button asChild size="sm" variant="secondary">
                <Link href={`/jobs/${job.id}`}>View Details <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
        </div>
    </Card>
  );
}
