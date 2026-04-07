
import { ProjectWorkspace } from '@/features/projects/types';
import { LayoutGrid } from 'lucide-react';
import { ProjectCard } from '@/features/projects/shared/components/ProjectCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StartupProjects({ projects }: { projects: ProjectWorkspace[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-primary" /> Active Projects
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{projects.length} Building</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
