import { mockJobs } from '@/features/jobs/data';
import { JobsPageContent } from '@/features/jobs/components/JobsPageContent';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Micro-Jobs Marketplace | ${APP_NAME}`,
  description: 'Short-term, high-impact tasks from real startups.',
};

export default async function JobsPage() {
  // Data fetching logic would go here
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <JobsPageContent />
    </div>
  );
}
