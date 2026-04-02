export type JobStatus = 'Open' | 'Filled' | 'Completed';

export type JobType =
  | 'task/project based'
  | 'internship'
  | 'part-time'
  | 'full-time';

export type CompensationType = 'Paid' | 'Unpaid' | 'Equity' | 'Partnership';

export type Job = {
  id: string;
  startupId: string;
  startupName: string;
  startupLogoUrl: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  stipend?: string;
  skills: string[];
  status: JobStatus;
  createdAt: string;
  type: JobType;
  location: string;
  remote: boolean;
  applicantsCount: number;
  sector: string; // Changed from category to sector
  compensationType: CompensationType;
};
