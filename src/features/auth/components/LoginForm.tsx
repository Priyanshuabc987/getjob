import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/types/auth';
import { Loader2, LogIn } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: { email: string; role: UserRole }) => void;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-headline font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your proof-of-work hub</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>I am a...</Label>
          <Tabs defaultValue="student" onValueChange={(v) => setRole(v as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="startup">Startup</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="alex@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full h-12 rounded-full font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4 mr-2" /> Sign In</>}
        </Button>
      </div>
    </form>
  );
}
