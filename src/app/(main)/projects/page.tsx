    import { ProjectsPageContent } from '@/features/projects/components/ProjectsPageContent';
    import { APP_NAME } from '@/lib/constants';

    export const metadata = {
      title: `Project Hub | ${APP_NAME}`,
      description: 'Discover the future of building and share your vision.',
    };

    export default async function ProjectsExplorePage() {
      // Data fetching logic would go here
      return (
        <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
          <ProjectsPageContent />
        </div>
      );
    }
    