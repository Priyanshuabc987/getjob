"use client";

import { use, useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces, progressUpdates, discussionThreads, currentUser } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  Users, 
  MessageSquare, 
  ArrowBigUp, 
  ArrowBigDown, 
  Send, 
  UserPlus, 
  ShieldCheck, 
  ExternalLink,
  Code,
  Layout,
  History,
  Zap,
  CheckCircle2,
  PlusCircle,
  CalendarDays,
  Globe,
  TrendingUp,
  MessageCircle,
  Terminal,
  Paperclip,
  CheckSquare,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState("build-log");

  const project = useMemo(() => projectWorkspaces.find(p => p.id === id), [id]);
  const updates = useMemo(() => progressUpdates.filter(u => u.projectId === id), [id]);
  const threads = useMemo(() => discussionThreads.filter(t => t.projectId === id), [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-headline">Project not found</h1>
          <Button asChild><Link href="/projects">Back to Hub</Link></Button>
        </div>
      </div>
    );
  }

  const isOwner = project.ownerId === currentUser.id;

  return (
    <div className="min-h-screen bg-[#F4F3F8] pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Workspace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card overflow-hidden border-none shadow-xl bg-white/80 backdrop-blur-md">
              <div className="h-56 bg-muted relative">
                <img 
                  src={project.coverImageUrl || `https://picsum.photos/seed/${project.id}/1200/400`} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Badge className="bg-white/20 text-white border-none backdrop-blur-md">
                          {project.status.toUpperCase()}
                        </Badge>
                        <h1 className="text-4xl font-headline font-bold text-white tracking-tight">{project.title}</h1>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Credibility</p>
                        <div className="text-2xl font-headline font-bold text-primary bg-white px-3 py-1 rounded-xl shadow-lg">
                          {project.credibilityScore}
                        </div>
                      </div>
                   </div>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-lg font-bold text-primary italic mb-4">"{project.tagline}"</p>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10 rounded-md">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-muted/50 p-1 rounded-2xl w-full h-auto mb-6 grid grid-cols-3">
                <TabsTrigger value="build-log" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
                  <Terminal className="w-4 h-4" /> Build Log
                </TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
                  <CheckSquare className="w-4 h-4" /> Tasks
                </TabsTrigger>
                <TabsTrigger value="community" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
                  <Users className="w-4 h-4" /> Community Review
                </TabsTrigger>
              </TabsList>

              <TabsContent value="build-log" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-headline font-bold">Proof Timeline</h3>
                    <p className="text-sm text-muted-foreground">Every step recorded as evidence of effort.</p>
                  </div>
                  {isOwner && (
                    <Button className="rounded-full gap-2 px-6 action-button-glow">
                      <PlusCircle className="w-4 h-4" /> Add Proof
                    </Button>
                  )}
                </div>

                <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                  {updates.map((update) => (
                    <div key={update.id} className="relative pl-12 group">
                      <div className={cn(
                        "absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-[#F4F3F8] flex items-center justify-center z-10 transition-all",
                        update.type === 'Milestone' ? "bg-primary text-white scale-110 shadow-lg" : "bg-white text-primary border-primary/10"
                      )}>
                        {update.type === 'Milestone' ? <Zap className="w-4 h-4 fill-current" /> : <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      
                      <Card className="glass-card hover:border-primary/20 transition-all overflow-hidden border-none shadow-md bg-white">
                        <CardHeader className="p-6 pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={update.type === 'Milestone' ? 'default' : 'outline'} className="rounded-md text-[10px]">
                              {update.type}
                            </Badge>
                            <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest">
                              <Clock className="w-3 h-3" /> {new Date(update.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <h4 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{update.title}</h4>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {update.content}
                          </p>
                          
                          {update.imageUrl && (
                            <div className="rounded-xl overflow-hidden border bg-muted">
                               <img src={update.imageUrl} alt="Update proof" className="w-full object-cover max-h-64" />
                            </div>
                          )}

                          {update.proofUrl && (
                            <a 
                              href={update.proofUrl} 
                              target="_blank" 
                              className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group/link"
                            >
                               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                  {update.proofType === 'link' ? <Paperclip className="w-4 h-4 text-primary" /> : <Code className="w-4 h-4 text-primary" />}
                               </div>
                               <div className="flex-1 overflow-hidden">
                                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Evidence Link</p>
                                  <p className="text-xs font-medium truncate">{update.proofUrl}</p>
                               </div>
                               <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </a>
                          )}
                          
                          <div className="flex gap-2">
                            {Object.entries(update.reactions).map(([emoji, count]) => (
                              <Badge key={emoji} variant="outline" className="gap-1.5 py-1 px-2.5 hover:bg-muted border-none bg-muted/30">
                                {emoji} <span className="text-[10px] font-bold">{count}</span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="glass-card border-none shadow-md p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-headline font-bold">Execution Board</h3>
                      <p className="text-sm text-muted-foreground">Break it down to get it done.</p>
                    </div>
                    <div className="space-y-3">
                      {project.tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-primary/10 transition-all">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-6 h-6 rounded-md border-2 flex items-center justify-center",
                              task.status === 'Done' ? "bg-primary border-primary text-white" : "border-muted-foreground/30"
                            )}>
                              {task.status === 'Done' && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <p className={cn("font-medium", task.status === 'Done' && "line-through text-muted-foreground")}>{task.title}</p>
                          </div>
                          <Badge variant="outline" className="text-[9px] font-bold">
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="community" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="space-y-4">
                  {threads.length > 0 ? threads.map((thread) => (
                    <Card key={thread.id} className="glass-card p-6 border-none shadow-md bg-white">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <button className="hover:text-orange-500"><ArrowBigUp className="w-6 h-6" /></button>
                            <span className="text-xs font-bold">{thread.upvotes}</span>
                            <button className="hover:text-blue-500"><ArrowBigDown className="w-6 h-6" /></button>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-bold">@{thread.authorName}</span>
                              <Badge variant="outline" className="text-[9px] h-4 py-0 uppercase">{thread.authorRole}</Badge>
                              <span className="text-muted-foreground">• {new Date(thread.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="font-bold">{thread.title}</h4>
                            <p className="text-sm leading-relaxed">{thread.content}</p>
                          </div>
                        </div>
                    </Card>
                  )) : (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-muted">
                       <MessageCircle className="w-12 h-12 text-muted mx-auto mb-4" />
                       <h3 className="font-headline font-bold text-lg">No reviews yet</h3>
                       <p className="text-sm text-muted-foreground">Share this project to get peer feedback!</p>
                    </div>
                  )}
                 </div>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-8">
            <Card className="glass-card bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24" />
              </div>
              <CardContent className="p-8 space-y-6 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">Collaboration</h3>
                  <p className="text-sm text-primary-foreground/80">
                    The team is looking for builders. Ready to contribute?
                  </p>
                </div>
                <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-full h-12 font-bold shadow-xl">
                  Request to Join
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-none shadow-lg bg-white">
              <CardHeader className="p-6 border-b">
                <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Building Squad
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {project.team.map((mate) => (
                    <div key={mate.userId} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-primary/10">
                          <AvatarImage src={mate.avatarUrl} />
                          <AvatarFallback>{mate.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold">{mate.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{mate.title}</p>
                        </div>
                      </div>
                      {mate.role === 'Owner' && <Badge variant="secondary" className="text-[8px] h-4">OWNER</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none shadow-lg bg-white">
              <CardHeader className="p-6 border-b">
                 <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-primary" /> Key Resources
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-4 space-y-3">
                {project.resources.map((res, i) => (
                  <a 
                    key={i} 
                    href={res.url} 
                    target="_blank" 
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                        res.label === 'Github' ? "bg-black" : res.label === 'Figma' ? "bg-pink-500" : "bg-primary"
                      )}>
                        {res.label === 'Github' ? <Code className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium">{res.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
