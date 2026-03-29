import { UserRole } from '@/types/auth';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface LoginCredentials {
  email: string;
  role: UserRole;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  education?: Education[];
  experience?: Experience[];
}
