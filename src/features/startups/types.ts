
export type StartupProfile = {
  id: string;
  name: string;
  logo: string;
  websiteUrl?: string;
  linkedinurl?: string;
  tagline: string;
  description: string;
  city: string; // Changed from location
  country: string; // Added
  stage: 'Idea' | 'MVP' | 'Early Traction' | 'Growth';
  fundingStage: 'Bootstrapped' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+';
  sector: string[];
  teamSize: number;
  founderId: string;
  openRolesCount: number;
  projectsCount: number;
  createdAt: string;
  score: number;

  // Fields for normalized query support
  name_normalized?: string;
  city_normalized?: string; // Changed from location_normalized
  country_normalized?: string; // Added
  sector_normalized?: string[];
};
