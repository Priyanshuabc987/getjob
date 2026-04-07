
export type Startup = {
    id: string;
    name: string;
  }
  
  export type StartupProfile = {
    id: string;
    name:string;
    slug: string; // URL-friendly identifier
    coverImage:string;
    logo: string;
    websiteUrl?: string;
    linkedinUrl?: string;
    tagline: string;
    description: string;
    city: string; 
    country: string;
    stage: 'Idea' | 'MVP' | 'Early Traction' | 'Growth';
    fundingStage: 'Bootstrapped' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+';
    sector: string[];
    teamSizeMin: number;
    teamSizeMax: number;
    founderId: string;
    openRolesCount: number;
    projectsCount: number;
    createdAt: string;
    score: number;
  
    // Fields for normalized query support
    name_normalized?: string;
    city_normalized?: string; 
    country_normalized?: string; 
    sector_normalized?: string[];
  };
