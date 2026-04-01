
"use client";

import { mockProjects } from '@/features/projects/data';
import { Sparkles, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectCard } from '@/features/projects/shared/components/ProjectCard';
import Link from 'next/link';

export default function ProjectsExplorePage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold">Project Hub</h1>
            <p className="text-muted-foreground text-sm">Discover the future of building.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" asChild className="rounded-xl font-bold bg-white shadow-sm h-11">
               <Link href="/projects/discussion" className="flex items-center gap-2">
                 <MessageSquare className="w-4 h-4" /> Discussion
               </Link>
             </Button>
             <Link href="/projects/create">
               <Button size="icon" className="rounded-full action-button-glow h-11 w-11 shadow-primary/20 shadow-lg">
                 <Plus className="w-6 h-6" />
               </Button>
             </Link>
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-primary/20 bg-primary/5 overflow-hidden group">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-primary animate-pulse" />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h3 className="font-headline font-bold text-lg">Have a vision?</h3>
                <p className="text-sm text-muted-foreground">Document your build and get verified.</p>
              </div>
              <Link href="/projects/create">
                <Button 
                  variant="outline"
                  className="rounded-full border-primary/20 hover:bg-primary/10 text-primary font-bold px-8 h-11"
                >
                  Start Build
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-10">
            {mockProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
