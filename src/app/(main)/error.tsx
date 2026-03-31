
'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6">
      <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-yellow-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-headline">Workspace Interrupted</h2>
        <p className="text-muted-foreground max-w-sm">
          A temporary glitch occurred while loading this section.
        </p>
      </div>
      <Button 
        onClick={() => reset()} 
        className="rounded-full px-8 h-12 font-bold action-button-glow"
      >
        <RefreshCw className="w-4 h-4 mr-2" /> Reload Section
      </Button>
    </div>
  );
}
