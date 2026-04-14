import { ProjectDetailsContent } from '@/features/projects/components/ProjectDetailsContent';
import { projectWorkspaces } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectWorkspaces.find(p => p.id === id);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | ${APP_NAME} Workspace`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectWorkspaces.find(p => p.id === id);
  
  if (!project) {
    notFound();
  }

  return <ProjectDetailsContent projectId={id} />;
}
