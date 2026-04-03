"use client";

import { mockProjects } from '../data';
import { Plus, LayoutGrid, PlusCircle, BriefcaseBusiness, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectCard } from '../shared/components/ProjectCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/features/auth/hooks';
import Link from 'next/link';

export function MyProjectsContent() {
  const { user } = useAuth();
  const myProjects = mockProjects;

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* LinkedIn-Style Quick Action Hub */}
      <Card className="rounded-2xl border-none shadow-sm bg-white dark:bg-card overflow-hidden p-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-12 h-12 border">
            <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/user/100/100"} />
            <AvatarFallback>{user?.displayName?.[0] || 'B'}</AvatarFallback>
          </Avatar>
          <Link href="/projects/create" className="flex-1">
            <button className="w-full text-left px-5 h-12 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground font-medium text-sm border border-transparent hover:border-muted transition-all">
              What's on your build list, {user?.displayName?.split(' ')[0] || 'Builder'} ?
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-around pt-2 border-t">
          <Link href="/projects/create">
            <Button variant="ghost" className="rounded-xl gap-2 font-bold text-muted-foreground hover:text-primary hover:bg-primary/5">
              <PlusCircle className="w-5 h-5 text-primary" />
              <span className="text-xs sm:text-sm">Start Project</span>
            </Button>
          </Link>
          <Link href="/jobs/create">
            <Button variant="ghost" className="rounded-xl gap-2 font-bold text-muted-foreground hover:text-secondary hover:bg-secondary/5">
              <BriefcaseBusiness className="w-5 h-5 text-secondary" />
              <span className="text-xs sm:text-sm">Post Job</span>
            </Button>
          </Link>
          <Link href="/problems/create">
            <Button variant="ghost" className="rounded-xl gap-2 font-bold text-muted-foreground hover:text-yellow-600 hover:bg-yellow-500/5">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span className="text-xs sm:text-sm">Share Problem</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Projects Grid Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-primary" /> Active Builds
            </h2>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted dark:bg-muted/50 px-3 py-1.5 rounded-full">
            {myProjects.length} Projects
          </span>
        </div>

        {myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {myProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj} showStats={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-[2.5rem] border-4 border-dashed border-muted shadow-sm px-6">
            <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <PlusCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-headline font-bold mb-3">No active projects</h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto font-medium leading-relaxed">
              Start your first project to begin building your verified proof-of-work history.
            </p>
            <Button asChild className="rounded-full px-10 h-14 font-bold action-button-glow text-lg">
              <Link href="/projects/create"><Plus className="w-5 h-5 mr-2" /> Create My First Project</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
