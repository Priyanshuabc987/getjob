"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces } from '@/lib/mock-data';
import { ProjectWorkspace } from '@/lib/types';
import { Plus, Users, Layout, MessageSquare, ChevronRight, Sparkles, Wand2, Heart, Share2, MoreHorizontal, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { aiProjectCreationAssistant } from '@/ai/flows/ai-project-creation';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ProjectsPage() {
  const [isExpanding, setIsExpanding] = useState(false);
  const { toast } = useToast();

  const handleAIExpand = async (idea: string) => {
    setIsExpanding(true);
    try {
      const result = await aiProjectCreationAssistant({ projectIdea: idea });
      console.log('AI Expanded Idea:', result);
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
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">Project Hub</h1>
            <p className="text-muted-foreground">Discover what students are building.</p>
          </div>
          <Button size="icon" className="rounded-full action-button-glow md:h-12 md:w-12">
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* AI Assist Section */}
        <Card className="glass-card mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-sm">Have a vision?</h3>
              <p className="text-xs text-muted-foreground">Let AI draft your roadmap.</p>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleAIExpand("A mobile app for sustainable clothing exchange")}
              disabled={isExpanding}
              className="rounded-full border-primary/20 hover:bg-primary/10 text-primary font-bold"
            >
              {isExpanding ? 'Working...' : 'Get Help'}
            </Button>
          </CardContent>
        </Card>

        {/* Project Feed */}
        <div className="space-y-8">
          {projectWorkspaces.map((proj) => (
            <Card key={proj.id} className="glass-card overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300">
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
                  <div className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </div>
                )}
              </div>

              <Link href={`/projects/${proj.id}`}>
                <div className="px-4 pb-4 space-y-3">
                   <div className="flex justify-between items-start">
                     <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight">
                      {proj.title}
                    </h3>
                    <Badge variant={proj.status === 'Active' ? 'default' : 'secondary'} className="text-[9px]">
                      {proj.status}
                    </Badge>
                   </div>
                  <p className="text-sm font-medium text-primary/80 italic">{proj.tagline}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="aspect-[16/9] w-full bg-muted relative border-y overflow-hidden">
                  <img 
                    src={proj.coverImageUrl || `https://picsum.photos/seed/${proj.id}/800/450`} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </Link>
              
              <CardContent className="p-4 pt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="rounded-md font-medium text-[10px] uppercase">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Build Momentum</span>
                    <span>{proj.stats.momentum}%</span>
                  </div>
                  <Progress value={proj.stats.momentum} className="h-1.5" />
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-2">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-xs font-bold">124</span>
                  </button>
                  <Link href={`/projects/${proj.id}#discussion`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-bold">{proj.stats.discussionCount}</span>
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      {proj.team.slice(0, 3).map((mate, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-muted overflow-hidden">
                          <img src={mate.avatarUrl} alt={mate.name} />
                        </div>
                      ))}
                   </div>
                   <span className="text-[10px] font-bold text-muted-foreground">+{proj.stats.memberCount} building</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="py-12 text-center">
          <p className="text-muted-foreground text-sm font-medium italic">You've reached the end of the hub for now. Go build something!</p>
        </div>
      </main>
    </div>
  );
}
