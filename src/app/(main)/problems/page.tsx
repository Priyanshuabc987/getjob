import { problems } from '@/features/problems/data';
import { ProblemsPageContent } from '@/features/problems/components/ProblemsPageContent';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Open Problems | ${APP_NAME}`,
  description: 'Turn real-world friction points into projects and build your credibility.',
};

export default async function ProblemsPage() {
  // In a real app, data would be fetched here
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <ProblemsPageContent problems={problems} />
    </div>
  );
}
