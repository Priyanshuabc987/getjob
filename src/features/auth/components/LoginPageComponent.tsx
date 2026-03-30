
"use client";

import { useAuth } from '../hooks';
import { Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoginPageComponent() {
  const { loginWithGoogle, isLoading } = useAuth();

  return (
    <div className="w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
            <Zap className="text-white w-8 h-8 fill-current" />
          </div>
          <h1 className="text-3xl font-headline font-bold">PrepLinc</h1>
          <p className="text-muted-foreground text-sm px-4">
            The proof-of-work platform where real experience meets real opportunities.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={loginWithGoogle} 
            disabled={isLoading}
            className="w-full h-14 rounded-full font-bold shadow-lg action-button-glow flex items-center justify-center gap-3 bg-white text-foreground border hover:bg-muted/50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </>
            )}
          </Button>
          
          <p className="text-[10px] text-center text-muted-foreground px-8 leading-relaxed">
            By signing in, you agree to our Terms of Service and Privacy Policy. Your verified work history starts here.
          </p>
        </div>
      </div>
    </div>
  );
}
