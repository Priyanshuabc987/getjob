
import { ProjectWorkspace } from '@/features/projects/types';
import { LayoutGrid } from 'lucide-react';
import { ProjectCard } from '@/features/projects/shared/components/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function StartupProjects({ 
  projects, 
  isFounder, 
  startupSlug 
}: { 
  projects: ProjectWorkspace[], 
  isFounder: boolean, 
  startupSlug: string 
}) {
  return (
    <div>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 md:py-6 bg-card rounded-2xl md:rounded-[2.5rem] border-4 border-dashed border-muted shadow-sm p-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6">
            <LayoutGrid className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
          </div>
          <h4 className="text-xl md:text-2xl font-headline font-bold mb-2">
            {isFounder ? "Showcase Your Work" : "No Projects Found"}
          </h4>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto font-medium leading-relaxed">
            {isFounder
              ? "Bring your venture to life. Add your first project and let the building begin."
              : "This venture has not shared any projects yet."}
          </p>
          {isFounder && (
            <Button asChild className="rounded-full px-10 h-14 action-button-glow font-bold text-lg w-full sm:w-auto">
              <Link href={`/projects/create?startup=${startupSlug}`}>Add Project</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
