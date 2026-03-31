
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Don't worry, your work is safe.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()} 
            className="w-full h-14 rounded-full font-bold action-button-glow"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button variant="ghost" asChild className="w-full h-12 font-bold">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
