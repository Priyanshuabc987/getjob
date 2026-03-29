"use client";

import { Navbar } from '@/components/layout/Navbar';
import { challenges } from '@/lib/mock-data';
import { Lightbulb, TrendingUp, Users, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-50 backdrop-blur-[4px] bg-background/40 flex items-start justify-center pt-40 pointer-events-none">
           <div className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-2xl animate-pulse pointer-events-auto border-4 border-white">
             🚀 SOLUTIONS HUB COMING SOON
           </div>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Lightbulb className="w-4 h-4" /> Real-World Challenges
          </div>
          <h1 className="text-4xl font-headline font-bold mb-4">Turn Problems into Projects</h1>
          <p className="text-lg text-muted-foreground">Companies and communities post their friction points here.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 opacity-50 grayscale select-none pointer-events-none">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="glass-card overflow-hidden group border-none shadow-md">
              <div className="flex flex-col md:flex-row">
                <div className="p-8 flex-1 space-y-6">
                   <h3 className="text-2xl font-headline font-bold">{challenge.title}</h3>
                   <p className="text-muted-foreground">{challenge.description}</p>
                   <Button disabled className="rounded-full">Start Solution</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
