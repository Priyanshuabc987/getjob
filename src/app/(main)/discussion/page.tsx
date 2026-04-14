
import { DiscussionContent } from '@/features/projects/components/DiscussionContent';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Community Discussions | ${APP_NAME}`,
  description: 'Brainstorm, collaborate, and share feedback with other builders.',
};

export default function ProjectsDiscussionPage() {
  return <DiscussionContent />;
}
