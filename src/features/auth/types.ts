
export type UserRole = 'builder' | 'learner' | 'job_seeker' | 'founder';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserProfileData {
  uid: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  domains: string[];
  experienceLevel: ExperienceLevel;
  goals: string[];
  collegeName: string;
  location: {
    city: string;
    country: string;
  };
  credibilityScore: number;
  onboardingCompleted: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface UserPrivateData {
  uid: string;
  email: string;
  phoneNumber?: string;
  lastLogin: string;
  accountStatus: 'active' | 'suspended';
}
