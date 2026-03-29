
"use client";

import { mockProjects } from '../data';
import { Plus, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '../shared/components/ProjectCard';

export function MyProjectsContent() {
  // In a real app, filter by currentUser.id
  const myProjects = mockProjects;

  return (
    <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold">My Workspace</h1>
          <p className="text-muted-foreground text-sm">Manage your active projects and proof of effort.</p>
        </div>
        <Button size="icon" className="rounded-full action-button-glow">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {myProjects.length > 0 ? (
          myProjects.map(proj => (
            <ProjectCard key={proj.id} project={proj} showStats={true} />
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <LayoutGrid className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-6">Start building your first proof-of-work project.</p>
            <Button className="rounded-full px-8 h-12 font-bold action-button-glow">Create Project</Button>
          </div>
        )}
      </div>
    </main>
  );
}
