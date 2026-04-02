
import { ProjectWorkspace } from '@/features/projects/types';
import { LayoutGrid } from 'lucide-react';
import { ProjectCard } from '@/features/projects/shared/components/ProjectCard';

export function StartupProjects({ projects }: { projects: ProjectWorkspace[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-primary" /> Active Projects
        </h2>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{projects.length} Building</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(proj => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
}
