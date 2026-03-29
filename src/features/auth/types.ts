import { UserRole } from '@/types/auth';

export interface LoginCredentials {
  email: string;
  role: UserRole;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  companyName?: string;
}
