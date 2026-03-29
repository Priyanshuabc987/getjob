
import { UserRole } from '@/types/auth';

export interface Education {
  institution: string;
  degree: string;
  startYear: string;
  endYear?: string;
}

export interface Experience {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface UserProfileData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  bio?: string;
  education: Education[];
  experience: Experience[];
  credibilityScore: number;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface OnboardingStepProps {
  onNext: (data: any) => void;
  onSkip: () => void;
}
