export type UserRole = 'student' | 'startup' | 'admin';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
}

export interface UserProfile extends AuthUser {
  bio?: string;
  skills?: string[];
  companyName?: string; // For startups
  website?: string;
}
