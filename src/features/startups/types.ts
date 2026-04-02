
export type StartupProfile = {
  id: string;
  name: string;
  logo: string;
  websiteUrl?: string;
  tagline: string;
  description: string;
  location: string;
  stage: 'Idea' | 'MVP' | 'Early Traction' | 'Growth';
  fundingStage: 'Bootstrapped' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+';
  sector: string[];
  teamSize: number;
  founderId: string;
  openRolesCount: number;
  projectsCount: number;
  createdAt: string;
};
