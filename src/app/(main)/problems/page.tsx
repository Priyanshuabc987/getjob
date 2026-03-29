
"use client";

import { challenges } from '@/features/problems/data';
import { Lightbulb, ArrowRight, Target, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Lightbulb className="w-4 h-4" /> Active Challenges
          </div>
          <h1 className="text-4xl font-headline font-bold mb-4">Turn Problems into Projects</h1>
          <p className="text-lg text-muted-foreground">Real-world friction points posted by companies and communities. Solve them to build your credibility.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="glass-card overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-500 bg-white">
              <div className="flex flex-col md:flex-row">
                <div className="p-8 flex-1 space-y-6">
                   <div className="flex justify-between items-start">
                     <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{challenge.title}</h3>
                     <Badge className="bg-primary/5 text-primary border-none text-[10px] font-bold px-3">
                       {challenge.difficulty.toUpperCase()}
                     </Badge>
                   </div>
                   <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
                   
                   <div className="flex flex-wrap gap-4 items-center">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-xl">
                       <Target className="w-4 h-4 text-primary" />
                       <span className="text-xs font-bold">{challenge.reward}</span>
                     </div>
                     <div className="flex items-center gap-1">
                        {challenge.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[9px] font-bold text-muted-foreground">#{tag}</Badge>
                        ))}
                     </div>
                   </div>

                   <div className="flex gap-4 pt-4">
                     <Button className="rounded-full px-8 h-12 action-button-glow font-bold">
                       Start Solution <ArrowRight className="w-4 h-4 ml-2" />
                     </Button>
                     <Button variant="ghost" className="rounded-full font-bold text-muted-foreground hover:text-primary">
                       View Guidelines
                     </Button>
                   </div>
                </div>
                <div className="md:w-1/4 bg-primary/5 p-8 flex flex-col items-center justify-center text-center border-l border-muted">
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                   </div>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Posted By</p>
                   <p className="text-sm font-bold text-primary">{challenge.postedBy}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
