'use client';

import { CreateJobForm } from '@/features/jobs/components/CreateJobForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
        <main className="max-w-3xl mx-auto p-4 sm:p-6">
            <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold">Back to Jobs</span>
            </Link>
            <div className="mb-8">
                <h1 className="text-4xl font-headline font-bold mb-2">Post a New Job</h1>
                <p className="text-lg text-muted-foreground">Fill out the details below to find the perfect talent for your startup.</p>
            </div>
            <CreateJobForm />
        </main>
    </div>
  );
}
