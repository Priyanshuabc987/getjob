import CreateProjectForm from '@/features/projects/components/CreateProjectForm';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/workspace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium font-bold">Back to Workspace</span>
        </Link>

        <div className="space-y-8">
          {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h1 className="text-4xl font-headline font-bold mb-2">Launch New Project</h1>
              <p className="text-muted-foreground">Define your vision and start building your proof-of-work.</p>
            </div>
            
          </div> */}
          <CreateProjectForm />
        </div>
      </main>
    </div>
  );
}
