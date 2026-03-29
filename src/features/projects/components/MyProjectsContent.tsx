
"use client";

import Link from 'next/link';
import { mockProjects } from '../data';
import { ArrowLeft, LayoutGrid, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MyProjectsContent() {
  // In a real app, filter by currentUser.id
  const myProjects = mockProjects;

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/projects"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl font-headline font-bold">My Workspace</h1>
            <p className="text-muted-foreground text-sm">Manage your active projects and tasks.</p>
          </div>
        </div>
        <Button size="icon" className="rounded-full action-button-glow">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {myProjects.length > 0 ? (
          myProjects.map(proj => (
            <Card key={proj.id} className="p-6 flex gap-6 items-center glass-card border-none shadow-md group hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden flex-shrink-0">
                <img src={proj.coverImageUrl} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-sm text-muted-foreground italic mb-2">"{proj.tagline}"</p>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                   <span>{proj.stats.momentum}% Momentum</span>
                   <span>•</span>
                   <span>{proj.stats.proofCount} Proofs</span>
                </div>
              </div>
              <Button asChild variant="outline" className="rounded-xl border-muted hover:bg-primary/5 font-bold">
                <Link href={`/projects/${proj.id}`}>Manage</Link>
              </Button>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <LayoutGrid className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-6">Start building your first proof-of-work project.</p>
            <Button className="rounded-full">Create Project</Button>
          </div>
        )}
      </div>
    </main>
  );
}
