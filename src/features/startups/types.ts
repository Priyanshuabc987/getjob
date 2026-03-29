
export type StartupProfile = {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  stage: 'Idea' | 'MVP' | 'Early Traction' | 'Growth';
  sector: string[];
  teamSize: number;
  founderId: string;
  openRoles: string[];
  projects: string[];
};
