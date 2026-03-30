
export type UserRole = 'builder' | 'learner' | 'job_seeker' | 'founder';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserGoal {
  id: string;
  label: string;
}

export interface UserDomain {
  id: string;
  label: string;
}

export interface UserProfileData {
  uid: string;
  displayName: string;
  photoURL?: string;
  username: string;
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
  createdAt: string;
}

export interface UserPrivateData {
  uid: string;
  email: string;
  phoneNumber?: string;
  lastLogin: string;
  accountStatus: 'active' | 'suspended';
}
