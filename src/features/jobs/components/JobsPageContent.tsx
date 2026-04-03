'use client';

import { useState } from 'react';
import { Job } from '@/features/jobs/types';
import { JobCard } from '@/features/jobs/components/JobCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus } from 'lucide-react';
import Link from 'next/link';
import { jobs } from '@/features/jobs/data';
import { sectors } from '@/features/startups/sector_data';

export function JobsPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: 'all', sector: 'all' });

  const filteredJobs = jobs
    .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(job => filters.type === 'all' || job.type === filters.type)
    .filter(job => filters.sector === 'all' || job.sector === filters.sector);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r 0  py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:w-2/3">
                <div className="inline-flex items-center gap-2 mb-4">
                    <span className="p-2 bg-primary/10 rounded-full">
                         <Briefcase className="w-6 h-6 text-primary" />
                    </span>
                     <p className="font-semibold text-primary">Action-Driven Opportunities</p>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold font-headline text-gray-900 dark:text-white mb-4">Find Your Next Role</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 pb-4">Don't just look for a job. Find a mission. Join a startup and make a real impact.</p>
            </div>
            <div className="flex-1 md:text-right">
                <Button asChild size="lg" className="rounded-full h-14 text-lg font-bold w-full sm:w-auto">
                  <Link href="/jobs/create"><Plus className="mr-2 h-5 w-5"/> Post a Job</Link>
                </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:-mt-16">
        <div className="bg-background dark:bg-card p-6 rounded-2xl shadow-lg border border-border/50 mb-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  placeholder="Search by title..." 
                  className="md:col-span-1 rounded-full h-12 px-6" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={filters.type} onValueChange={(value) => setFilters(f => ({...f, type: value}))}>
                  <SelectTrigger className="rounded-full h-12 px-6"><SelectValue placeholder="All Job Types" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Job Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="task/project based">Task/Project Based</SelectItem>
                  </SelectContent>
                </Select>
                 <Select value={filters.sector} onValueChange={(value) => setFilters(f => ({...f, sector: value}))}>
                  <SelectTrigger className="rounded-full h-12 px-6"><SelectValue placeholder="All Sectors" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
}
