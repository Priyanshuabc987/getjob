/**
 * @fileOverview Auth Service
 * Handles all direct interactions with the authentication provider (Mock for now).
 */

import { AuthUser, UserRole } from '@/types/auth';
import { LoginCredentials, RegisterCredentials } from './types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    console.log('Logging in with:', credentials);
    // Mocking a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      uid: 'mock-uid-123',
      email: credentials.email,
      displayName: 'Alex Builder',
      role: credentials.role,
      createdAt: new Date().toISOString(),
    };
  },

  async register(credentials: RegisterCredentials): Promise<AuthUser> {
    console.log('Registering user:', credentials);
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      uid: 'mock-uid-456',
      email: credentials.email,
      displayName: credentials.fullName,
      role: credentials.role,
      createdAt: new Date().toISOString(),
    };
  }
};
