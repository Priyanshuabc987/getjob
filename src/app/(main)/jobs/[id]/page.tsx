import { jobs } from '@/features/jobs/data';
import { JobDetailsPageContent } from '@/features/jobs/components/JobDetailsPageContent';
import { notFound } from 'next/navigation';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobs.find(j => j.id === params.id);

  if (!job) {
    notFound();
  }

  return <JobDetailsPageContent job={job} />;
}
