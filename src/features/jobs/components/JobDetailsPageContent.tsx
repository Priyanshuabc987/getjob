'use client';

import { Job } from '@/features/jobs/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Target, Zap, Award, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface JobDetailsPageContentProps {
  job: Job;
}

export function JobDetailsPageContent({ job }: JobDetailsPageContentProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
        <main className="max-w-4xl mx-auto p-4 sm:p-6">
            <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold">Back to Jobs</span>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card className="bg-white dark:bg-card shadow-lg rounded-xl border">
                        <CardHeader className="p-6">
                            <div className="flex items-start gap-4">
                                <Image src={job.startupLogoUrl} alt={`${job.startupName} logo`} width={64} height={64} className="rounded-lg border" />
                                <div>
                                    <h1 className="text-2xl font-bold font-headline">{job.title}</h1>
                                    <Link href={`/startups/${job.startupId}`} className="text-lg text-muted-foreground font-medium hover:underline flex items-center gap-1.5">
                                        at {job.startupName} <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Job Description</h2>
                                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{job.description}</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-primary"/> Key Deliverables</h2>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    {job.deliverables.map((d: string, i: number) => <li key={i}>{d}</li>)}
                                </ul>
                            </div>

                             <div>
                                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-primary"/> Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill: string) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6 sticky top-24">
                    <Card className="bg-white dark:bg-card shadow-lg rounded-xl border">
                         <CardHeader>
                            <CardTitle>Job Overview</CardTitle>
                         </CardHeader>
                        <CardContent className="text-sm space-y-4">
                            <div className="space-y-3 text-muted-foreground">
                                <div className="flex justify-start gap-2">
                                    <span className="font-semibold text-foreground">Location:</span>
                                    <span className="text-right">{job.location} {job.remote && '(Remote)'}</span>
                                </div>
                                 <div className="flex justify-start gap-2">
                                    <span className="font-semibold text-foreground">Type:</span>
                                    <span className="text-right">{job.type}</span>
                                </div>
                                 <div className="flex justify-start gap-2">
                                    <span className="font-semibold text-foreground">Compensation:</span>
                                    <span className="text-right">{job.compensationType}{job.stipend && `: ${job.stipend}`}</span>
                                </div>
                                 <div className="flex justify-start gap-2">
                                    <span className="font-semibold text-foreground">Duration:</span>
                                    <span className="text-right">{job.duration || 'Not specified'}</span>
                                </div>
                                 <div className="flex justify-start gap-2">
                                    <span className="font-semibold text-foreground">Posted:</span>
                                    <span className="text-right">{isClient ? new Date(job.createdAt).toLocaleDateString() : null}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-card shadow-lg rounded-xl border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary"/> Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                             <div className="text-center">
                                <div className="text-4xl font-bold">{job.applicantsCount}</div>
                                <div className="text-muted-foreground">Total Applicants</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Button size="lg" className="w-full h-12 text-base rounded-lg font-bold">Apply Now</Button>
                </div>
            </div>
        </main>
    </div>
  );
}
