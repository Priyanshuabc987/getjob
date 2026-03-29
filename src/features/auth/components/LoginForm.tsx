
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogIn } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: { email: string }) => void;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-headline font-bold">Start Building</h1>
        <p className="text-muted-foreground text-sm">Sign in to your proof-of-work hub</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="alex@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="rounded-xl h-12"
          />
        </div>

        <Button type="submit" className="w-full h-12 rounded-full font-bold shadow-lg shadow-primary/20 action-button-glow" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4 mr-2" /> Continue as Builder</>}
        </Button>
      </div>
      
      <p className="text-xs text-center text-muted-foreground px-8">
        By continuing, you agree to our terms of building and proof-of-work verification.
      </p>
    </form>
  );
}
