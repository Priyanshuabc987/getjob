"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces, currentUser } from '@/lib/mock-data';
import { 
  Plus, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  TrendingUp, 
  Search,
  PlusCircle,
  LayoutGrid,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { aiProjectCreationAssistant } from '@/ai/flows/ai-project-creation';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ProjectsPage() {
  const [isExpanding, setIsExpanding] = useState(false);
  const { toast } = useToast();

  const myProjects = useMemo(() => {
    return projectWorkspaces.filter(proj => 
      proj.ownerId === currentUser.id || proj.team.some(m => m.userId === currentUser.id)
    );
  }, []);

  const handleAIExpand = async (idea: string) => {
    setIsExpanding(true);
    try {
      const result = await aiProjectCreationAssistant({ projectIdea: idea });
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
            <p className="text-muted-foreground text-sm">Build in public, grow with the community.</p>
          </div>
          <Button size="icon" className="rounded-full action-button-glow md:h-12 md:w-12 shadow-primary/20 shadow-lg">
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="bg-muted p-1 rounded-2xl w-full h-auto mb-8 border border-white/20">
            <TabsTrigger value="explore" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
              <Globe className="w-4 h-4" /> Explore
            </TabsTrigger>
            <TabsTrigger value="my-projects" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
              <LayoutGrid className="w-4 h-4" /> My Projects
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
              <MessageSquare className="w-4 h-4" /> Discussions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* AI Assist Section */}
            <Card className="glass-card mb-8 border-primary/20 bg-primary/5 overflow-hidden group">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="font-headline font-bold text-lg">Have a project vision?</h3>
                  <p className="text-sm text-muted-foreground">Let AI brainstorm your roadmap and tasks.</p>
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

            {/* Project Feed */}
            <div className="space-y-8">
              {projectWorkspaces.map((proj) => (
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
                      <img 
                        src={proj.coverImageUrl || `https://picsum.photos/seed/${proj.id}/800/450`} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-5 flex gap-2">
                        {proj.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} className="bg-white/20 backdrop-blur-md text-white border-none text-[9px] hover:bg-white/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                  
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-primary" /> Build Momentum</span>
                        <span className="text-primary">{proj.stats.momentum}%</span>
                      </div>
                      <Progress value={proj.stats.momentum} className="h-2 bg-muted rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${proj.stats.momentum}%` }} />
                      </Progress>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0 flex items-center justify-between border-t mt-2">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group/btn">
                        <Heart className="w-5 h-5 group-hover/btn:fill-red-500" />
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
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-muted overflow-hidden shadow-sm">
                              <img src={mate.avatarUrl} alt={mate.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                       </div>
                       <span className="text-[10px] font-bold text-muted-foreground">+{proj.stats.memberCount} building</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-projects" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-headline font-bold">Managed Workspaces</h2>
              <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5 text-primary h-9 px-4">
                <PlusCircle className="w-4 h-4" /> Create New
              </Button>
            </div>

            {myProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {myProjects.map((proj) => (
                  <Card key={proj.id} className="glass-card p-5 hover:border-primary/30 transition-all group">
                    <div className="flex gap-5">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted flex-shrink-0 border">
                         <img src={proj.coverImageUrl || `https://picsum.photos/seed/${proj.id}/200/200`} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="flex-1 space-y-2">
                         <div className="flex justify-between items-start">
                           <h3 className="font-headline font-bold text-lg leading-none">{proj.title}</h3>
                           <Badge variant="outline" className="text-[9px] uppercase font-bold text-primary border-primary/20">{proj.status}</Badge>
                         </div>
                         <p className="text-xs text-muted-foreground line-clamp-1">{proj.tagline}</p>
                         <div className="flex items-center justify-between pt-2">
                           <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                                <Users className="w-3.5 h-3.5" /> {proj.stats.memberCount}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                                <History className="w-3.5 h-3.5" /> {proj.stats.updateCount}
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <Button asChild size="sm" variant="outline" className="h-8 rounded-full text-xs font-bold px-4">
                                <Link href={`/projects/${proj.id}`}>View Hub</Link>
                              </Button>
                              <Button size="sm" className="h-8 rounded-full text-xs font-bold gap-1.5 px-4 shadow-primary/20 shadow-md">
                                <PlusCircle className="w-3.5 h-3.5" /> Post Update
                              </Button>
                           </div>
                         </div>
                       </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                <LayoutGrid className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="font-headline font-bold text-lg">No active projects yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">Start your first project or join an existing team to see them here.</p>
                <Button className="rounded-full gap-2 px-8 h-12 shadow-primary/20 shadow-xl">
                  <Plus className="w-4 h-4" /> Start Building
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="discussions" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-headline font-bold">Community Board</h2>
                  <p className="text-sm text-muted-foreground">General chat, advice, and builder stories.</p>
                </div>
                <Button className="rounded-full gap-2 px-6 h-10 shadow-primary/20 shadow-lg">
                  <Plus className="w-4 h-4" /> New Topic
                </Button>
              </div>

              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search discussions..." className="pl-11 rounded-2xl h-12 bg-white border-none shadow-sm focus-visible:ring-primary/20" />
              </div>

              <div className="space-y-4">
                {[
                  { title: "What's your favorite stack for MVPs in 2024?", author: "@sarah_code", replies: 42, upvotes: 156, category: "Stack Tech" },
                  { title: "How to stay motivated when building alone?", author: "@alex_j", replies: 12, upvotes: 89, category: "Mindset" },
                  { title: "Launching on Product Hunt soon, any tips?", author: "@founder_kit", replies: 28, upvotes: 210, category: "Marketing" }
                ].map((topic, i) => (
                  <Card key={i} className="glass-card p-5 hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1 text-muted-foreground min-w-[40px]">
                        <Zap className="w-5 h-5 text-primary fill-primary/10" />
                        <span className="text-xs font-bold">{topic.upvotes}</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Badge variant="secondary" className="text-[9px] uppercase font-bold px-2 py-0 h-4">{topic.category}</Badge>
                        <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">{topic.title}</h3>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                          <p>Started by {topic.author}</p>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {topic.replies} replies</span>
                            <span>2h ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground italic font-medium">More discussions brewing... Check back soon!</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="py-12 text-center">
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40 italic">Building the future, one commit at a time.</p>
        </div>
      </main>
    </div>
  );
}
