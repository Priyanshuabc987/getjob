
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto rotate-12">
          <Compass className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Lost in Space?</h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to another coordinate.
          </p>
        </div>
        <Button asChild className="rounded-full px-10 h-14 font-bold action-button-glow">
          <Link href="/"><Home className="w-4 h-4 mr-2" /> Back to Base</Link>
        </Button>
      </div>
    </div>
  );
}
