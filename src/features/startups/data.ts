
import { StartupProfile } from './types';

export const mockStartups: StartupProfile[] = [
  {
    id: 's1',
    name: 'ZettaCloud',
    logo: 'https://picsum.photos/seed/zetta/100/100',
    tagline: 'Hyper-scale compute for modern teams.',
    description: 'We are building the next generation of cloud infrastructure for AI startups.',
    stage: 'Early Traction',
    sector: ['AI', 'Cloud', 'SaaS'],
    teamSize: 12,
    founderId: 'user-rahul',
    openRoles: ['Frontend Engineer', 'DevOps Intern'],
    projects: ['proj-1']
  },
  {
    id: 's2',
    name: 'EcoFlow',
    logo: 'https://picsum.photos/seed/eco/100/100',
    tagline: 'Sustainability tracking simplified.',
    description: 'Helping manufacturing units track and offset their carbon footprint in real-time.',
    stage: 'MVP',
    sector: ['CleanTech', 'IoT'],
    teamSize: 4,
    founderId: 'user-123',
    openRoles: ['Hardware Lead', 'UI Designer'],
    projects: []
  }
];
