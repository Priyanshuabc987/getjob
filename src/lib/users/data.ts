import { User } from './types';

export const currentUser: User = {
  id: 'user-123',
  name: 'Alex Johnson',
  username: 'alexj_builds',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  bio: 'Product Builder & React enthusiast. I love turning complex problems into simple, high-impact interfaces.',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma'],
  interests: ['EdTech', 'FinTech', 'SaaS'],
  earnings: '₹18,600',
  badges: ['Early Adopter', 'Top Builder', 'Problem Solver'],
  credibilityScore: 94,
  stats: {
    tasksCompleted: 15,
    collaborations: 4,
    connections: 342
  }
};
