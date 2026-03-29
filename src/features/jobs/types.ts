
export type JobStatus = 'Open' | 'Filled' | 'Completed';

export type Job = {
  id: string;
  startupId: string;
  startupName: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  stipend?: string;
  skills: string[];
  status: JobStatus;
  createdAt: string;
};
