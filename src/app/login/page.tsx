"use client";

import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAuth } from '@/features/auth/hooks';
import { Navbar } from '@/components/layout/Navbar';
import { Zap } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <Zap className="text-white w-8 h-8 fill-current" />
          </div>
          <h2 className="text-2xl font-headline font-bold">Welcome, {user.displayName}!</h2>
          <p className="text-muted-foreground">You are successfully authenticated as a {user.role}.</p>
          <a href="/" className="text-primary font-bold hover:underline">Go to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F3F8]">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
          <LoginForm onSubmit={login} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
