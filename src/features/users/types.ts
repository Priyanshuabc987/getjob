/**
 * @fileOverview Core user domain types, including public profiles and private data.
 */

export type UserRole = 'builder' | 'learner' | 'job_seeker' | 'founder';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface EducationEntry {
  school: string;
  degree: string;
  startYear: string;
  endYear?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
}

export interface UserProfileData {
  uid: string;
  displayName: string;
  photoURL?: string;
  bannerUrl?: string;
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
  education: EducationEntry[];
  experience: ExperienceEntry[];
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
