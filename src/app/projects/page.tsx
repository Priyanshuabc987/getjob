"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { projects } from '@/lib/mock-data';
import { Plus, Users, Layout, MessageSquare, ChevronRight, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { aiProjectCreationAssistant } from '@/ai/flows/ai-project-creation';
import { useToast } from '@/hooks/use-toast';

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
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-headline mb-2">Project Hub</h1>
            <p className="text-muted-foreground">Collaborate on open projects and build in public.</p>
          </div>
          <Button size="lg" className="rounded-full gap-2 action-button-glow font-bold">
            <Plus className="w-4 h-4" /> Start Project
          </Button>
        </div>

        {/* AI Assist Section */}
        <Card className="bg-gradient-to-r from-primary to-secondary p-1 rounded-3xl mb-12 shadow-2xl shadow-primary/20 overflow-hidden">
          <div className="bg-white/95 rounded-[1.4rem] p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-headline text-xl mb-1">Got a project idea?</h3>
              <p className="text-sm text-muted-foreground">Use AI to break it into micro-tasks and suggest required skills instantly.</p>
            </div>
            <div className="w-full md:w-auto">
               <Button 
                onClick={() => handleAIExpand("A mobile app for sustainable clothing exchange")}
                disabled={isExpanding}
                className="w-full md:w-auto rounded-full gap-2 px-8 py-6 h-auto text-lg"
               >
                 <Wand2 className="w-5 h-5" /> {isExpanding ? 'Thinking...' : 'Try AI Assistant'}
               </Button>
            </div>
          </div>
        </Card>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <Card key={proj.id} className="glass-card overflow-hidden group">
              <div className="aspect-[21/9] w-full bg-muted relative">
                <img src={`https://picsum.photos/seed/${proj.id}/800/400`} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                    <img src={proj.ownerAvatar} alt={proj.owner} />
                  </div>
                  <div className="text-white">
                    <p className="text-xs font-bold uppercase tracking-tight opacity-80">Founded by</p>
                    <p className="font-bold text-sm">{proj.owner}</p>
                  </div>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-headline group-hover:text-primary transition-colors">{proj.title}</h3>
                  <Badge variant="outline" className="rounded-md border-primary/20 text-primary">{proj.contributors} Builders</Badge>
                </div>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="rounded-md font-medium">{skill}</Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight text-muted-foreground mb-2">
                      <span>Project Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-tight text-muted-foreground">Active Micro-Tasks</p>
                    {proj.tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between group/task cursor-pointer p-2 rounded-xl hover:bg-white transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${task.status === 'Open' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="text-sm font-medium">{task.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/task:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button className="flex-1 rounded-full gap-2 h-12">
                   Join Project
                </Button>
                <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                   <MessageSquare className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}