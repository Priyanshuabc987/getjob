"use client";

import { Navbar } from '@/components/layout/Navbar';
import { challenges } from '@/lib/mock-data';
import { Lightbulb, TrendingUp, Users, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Lightbulb className="w-4 h-4" /> Real-World Challenges
          </div>
          <h1 className="text-4xl font-headline font-bold mb-4">Turn Problems into Projects</h1>
          <p className="text-lg text-muted-foreground">Companies and communities post their friction points here. Pick one, build a solution, and earn recognition.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="glass-card overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col md:flex-row">
                <div className="p-8 flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="rounded-md px-3 py-1 border-primary/20 text-primary font-bold text-[10px]">
                      {challenge.difficulty.toUpperCase()} DIFFICULTY
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> 12 builders exploring
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{challenge.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {challenge.tags.map(tag => (
                      <Badge key={tag} className="bg-muted text-muted-foreground hover:bg-muted border-none rounded-md px-3">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Button className="rounded-full gap-2 px-8 h-12 font-bold shadow-lg shadow-primary/20">
                      Start Solution <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="rounded-full gap-2 px-8 h-12 border-muted hover:bg-muted/50">
                      <MessageCircle className="w-4 h-4" /> Discuss Idea
                    </Button>
                  </div>
                </div>

                <div className="w-full md:w-64 bg-primary/5 p-8 flex flex-col justify-center items-center text-center space-y-4 border-l border-muted/20">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Potential Reward</p>
                    <p className="text-xl font-headline font-bold text-primary">{challenge.reward}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Verified Challenge</p>
                </div>
              </div>
            </Card>
          ))}

          {/* AI Brainstorm Card */}
          <Card className="bg-gradient-to-br from-primary to-secondary text-white border-none p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <Sparkles className="w-48 h-48" />
            </div>
            <div className="max-w-md relative z-10 space-y-6">
              <h3 className="text-3xl font-headline font-bold leading-tight">Can't find a problem? Let's brainstorm.</h3>
              <p className="text-white/80 text-lg">
                Tell us about your skills and interests, and our AI will suggest real-world problems you could solve.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 font-bold shadow-2xl">
                Get AI Suggestions
              </Button>
            </div>
          </Card>
        </div>

        <div className="py-20 text-center space-y-4">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] opacity-40">More Problems Brewing</p>
          <div className="flex justify-center gap-1">
             <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce" />
             <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce delay-100" />
             <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce delay-200" />
          </div>
        </div>
      </main>
    </div>
  );
}