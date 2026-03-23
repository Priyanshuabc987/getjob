import { Job } from './types';

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    startupId: 's1',
    startupName: 'ZettaCloud',
    title: 'Frontend Component Lead',
    description: 'Migrate legacy dashboard to Tailwind CSS with focus on atomic design patterns.',
    deliverables: ['20 reusable components', 'Theming System', 'Unit Tests'],
    duration: '10 Days',
    stipend: '₹8,000',
    skills: ['React', 'Tailwind'],
    status: 'Open',
    createdAt: '2024-02-12T09:00:00Z'
  }
];
