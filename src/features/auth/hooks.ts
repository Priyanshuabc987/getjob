/**
 * @fileOverview Auth Hooks
 * Connects UI components to the Auth Service.
 */

import { useState } from 'react';
import { authService } from './services';
import { LoginCredentials, RegisterCredentials } from './types';
import { AuthUser } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const authUser = await authService.login(credentials);
      setUser(authUser);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${authUser.displayName}`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const authUser = await authService.register(credentials);
      setUser(authUser);
      toast({
        title: "Account created!",
        description: "Welcome to PrepLinc.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Could not create account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout,
  };
}
