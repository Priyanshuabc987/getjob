import { jobs } from '@/features/jobs/data';
import { JobDetailsPageContent } from '@/features/jobs/components/JobDetailsPageContent';
import { notFound } from 'next/navigation';

export default async function JobDetailsPage({params,}: { params: Promise<{ id: string }>;}) 
{
  const { id } = await params;

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  return <JobDetailsPageContent job={job} />;
}