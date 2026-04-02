
import { StartupProfile } from './types';

export const mockStartups: StartupProfile[] = [
  {
    id: 's1',
    name: 'ZettaCloud',
    logo: 'https://picsum.photos/seed/zetta/100/100',
    websiteUrl: 'https://zettacloud.io',
    tagline: 'Hyper-scale compute for modern teams.',
    description: 'We are building the next generation of cloud infrastructure for AI startups, providing unparalleled performance and scalability to help them train and deploy complex models faster and more cost-effectively.',
    location: 'San Francisco, CA',
    stage: 'Early Traction',
    fundingStage: 'Seed',
    sector: ['AI', 'Cloud', 'SaaS'],
    teamSize: 12,
    founderId: 'user-rahul',
    openRolesCount: 2,
    projectsCount: 1,
    createdAt: '2023-11-15T10:00:00.000Z'
  },
  {
    id: 's2',
    name: 'EcoFlow',
    logo: 'https://picsum.photos/seed/eco/100/100',
    websiteUrl: 'https://ecoflow.com',
    tagline: 'Sustainability tracking simplified.',
    description: 'Our platform helps manufacturing units track and offset their carbon footprint in real-time, providing actionable insights to improve sustainability and meet regulatory requirements.',
    location: 'Remote',
    stage: 'MVP',
    fundingStage: 'Bootstrapped',
    sector: ['CleanTech', 'IoT', 'Analytics'],
    teamSize: 4,
    founderId: 'user-123',
    openRolesCount: 3,
    projectsCount: 2,
    createdAt: '2024-01-20T10:00:00.000Z'
  },
  {
    id: 's3',
    name: 'Medivault',
    logo: 'https://picsum.photos/seed/medi/100/100',
    websiteUrl: 'https://medivault.health',
    tagline: 'Your secure health records, on-chain.',
    description: 'A decentralized platform for patients to own and control their medical data, powered by blockchain technology for ultimate security and interoperability.',
    location: 'New York, NY',
    stage: 'Idea',
    fundingStage: 'Pre-Seed',
    sector: ['HealthTech', 'Blockchain', 'Web3'],
    teamSize: 2,
    founderId: 'user-jane',
    openRolesCount: 1,
    projectsCount: 1,
    createdAt: '2024-03-01T10:00:00.000Z'
  }
];
