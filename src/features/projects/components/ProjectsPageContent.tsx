
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { mockProjects } from '../data';
import { 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  TrendingUp, 
  Search,
  LayoutGrid,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { aiProjectCreationAssistant } from '@/ai/flows/ai-project-creation';

export function ProjectsPageContent() {
  const [isExpanding, setIsExpanding] = useState(false);
  const { toast } = useToast();

  const handleAIExpand = async (idea: string) => {
    setIsExpanding(true);
    try {
      await aiProjectCreationAssistant({ projectIdea: idea });
      toast({
        title: "AI Project Refined!",
        description: "Check console for the expanded tasks and roadmap.",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsExpanding(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-headline font-bold">Project Hub</h1>
          <p className="text-muted-foreground text-sm">Discover the future of building.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" asChild className="rounded-xl font-bold bg-white shadow-sm h-11">
             <Link href="/projects/discussion" className="flex items-center gap-2">
               <MessageSquare className="w-4 h-4" /> Discussion
             </Link>
           </Button>
           <Button size="icon" className="rounded-full action-button-glow h-11 w-11 shadow-primary/20 shadow-lg">
             <Plus className="w-6 h-6" />
           </Button>
        </div>
      </div>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="glass-card mb-8 border-primary/20 bg-primary/5 overflow-hidden group">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-primary animate-pulse" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h3 className="font-headline font-bold text-lg">Have a vision?</h3>
              <p className="text-sm text-muted-foreground">Let AI brainstorm your roadmap.</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => handleAIExpand("A decentralized app for peer tutoring")}
              disabled={isExpanding}
              className="rounded-full border-primary/20 hover:bg-primary/10 text-primary font-bold px-8 h-11"
            >
              {isExpanding ? 'Thinking...' : 'Start AI Draft'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-10">
          {mockProjects.map((proj) => (
            <Card key={proj.id} className="glass-card overflow-hidden group border-none shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-primary/10">
                    <AvatarImage src={proj.team.find(m => m.userId === proj.ownerId)?.avatarUrl} />
                    <AvatarFallback>{proj.title[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold leading-none">{proj.team.find(m => m.userId === proj.ownerId)?.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Founding Builder</p>
                  </div>
                </div>
                {proj.isVerified && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                    <ShieldCheck className="w-3.5 h-3.5 fill-primary text-white" /> Verified
                  </div>
                )}
              </div>

              <Link href={`/projects/${proj.id}`}>
                <div className="px-5 pb-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight">
                      {proj.title}
                    </h3>
                    <Badge variant={proj.status === 'Active' ? 'default' : 'secondary'} className="text-[9px] h-5">
                      {proj.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-primary/80 italic leading-relaxed">{proj.tagline}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                <div className="aspect-[16/9] w-full bg-muted relative border-y overflow-hidden">
                  <img src={proj.coverImageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </Link>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-primary" /> Build Momentum</span>
                    <span className="text-primary">{proj.stats.momentum}%</span>
                  </div>
                  <Progress value={proj.stats.momentum} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
