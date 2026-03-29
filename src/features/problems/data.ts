
import { Challenge } from './types';

export const challenges: Challenge[] = [
  {
    id: 'ch-1',
    postedBy: 'Hostel Committee',
    title: 'Waste Reduction Dashboard',
    description: 'Predict daily food waste using historical mess attendance data and visitor trends.',
    difficulty: 'Medium',
    reward: '₹2,000 + Incubation',
    tags: ['Data Viz', 'Python', 'IoT']
  },
  {
    id: 'ch-2',
    postedBy: 'Local NGO',
    title: 'Donation Tracking App',
    description: 'Build a transparent system for donors to see the real-time impact of their contributions.',
    difficulty: 'Hard',
    reward: 'Letter of Recommendation',
    tags: ['Blockchain', 'React', 'Mobile']
  }
];
