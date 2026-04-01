"use client";

import { mockProjects } from '../data';
import { Plus, LayoutGrid, Rocket, Target, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectCard } from '../shared/components/ProjectCard';
import Link from 'next/link';

export function MyProjectsContent() {
  // In a real app, filter by currentUser.id
  const myProjects = mockProjects;

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Motivation Section - Hero */}
      <Card className="rounded-[2rem] border-none shadow-2xl bg-primary text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Rocket className="w-48 h-48 -rotate-12" />
        </div>
        <CardContent className="p-8 md:p-12 relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold">
              <Sparkles className="w-4 h-4 fill-current" /> BUILDER ALPHA
            </div>
            <h1 className="text-3xl md:text-5xl font-headline font-bold leading-tight">
              Turn your effort into <br />
              <span className="text-secondary-foreground">Verified Proof.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Projects with active roadmaps and proof-of-work links are 5x more likely to be noticed by top startups. What's next on your build list?
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button className="w-full sm:w-auto rounded-full px-8 h-14 bg-white text-primary hover:bg-white/90 font-bold text-lg shadow-xl shadow-black/10 transition-all active:scale-95">
                <Plus className="w-5 h-5 mr-2" /> Start New Project
              </Button>
              <Button variant="ghost" asChild className="w-full sm:w-auto text-white hover:bg-white/10 rounded-full h-14 px-8 font-bold">
                <Link href="/problems">
                  <Lightbulb className="w-5 h-5 mr-2" /> Browse Challenges
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-primary" /> Active Builds
            </h2>
            <p className="text-sm text-muted-foreground font-medium">Manage your portfolio and proof links.</p>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1.5 rounded-full">
            {myProjects.length} Projects
          </span>
        </div>

        {myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {myProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj} showStats={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border-4 border-dashed border-muted shadow-sm px-6">
            <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-headline font-bold mb-3">No active projects</h3>
            <p className="text-muted-foreground mb-10 max-w-sm mx-auto font-medium leading-relaxed">
              Start your first project to begin building your verified proof-of-work history.
            </p>
            <Button className="rounded-full px-10 h-14 font-bold action-button-glow text-lg">
              <Plus className="w-5 h-5 mr-2" /> Create My First Project
            </Button>
          </div>
        )}
      </div>

      {/* Quick Stats - Sidebar Style Motivation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {[
          { icon: Target, label: "Earn Credibility", desc: "Every project update increases your platform score." },
          { icon: Target, label: "Find Squads", desc: "Open your project to collaborators to build faster." },
          { icon: ArrowRight, label: "Get Noticed", desc: "Startups can see your verified history in the hub." },
        ].map((item, i) => (
          <Card key={i} className="glass-card p-6 border-none bg-white rounded-3xl shadow-lg hover:-translate-y-1 transition-transform">
             <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
               <item.icon className="w-5 h-5 text-primary" />
             </div>
             <h4 className="font-bold text-sm mb-1">{item.label}</h4>
             <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
