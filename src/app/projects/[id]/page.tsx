"use client";

import { use, useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { projectWorkspaces, progressUpdates, discussionThreads, currentUser } from '@/lib/mock-data';
import { ProjectWorkspace, ProgressUpdate, DiscussionThread } from '@/lib/types';
import { 
  ArrowLeft, 
  Users, 
  MessageSquare, 
  ArrowBigUp, 
  ArrowBigDown, 
  Send, 
  UserPlus, 
  ShieldCheck, 
  Share2,
  ExternalLink,
  Code,
  Layout,
  History,
  Zap,
  CheckCircle2,
  PlusCircle,
  CalendarDays,
  Globe,
  HelpCircle,
  TrendingUp,
  MessageCircle,
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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

  useEffect(() => {
    if (window.location.hash === '#discussion') {
      setActiveTab("discussion");
    }
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <Button asChild><Link href="/projects">Back to Projects</Link></Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    toast({
      title: "Application Sent!",
      description: `You've applied to join ${project.title}. The project owner will review your profile.`,
    });
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    toast({
      title: "Feedback Shared!",
      description: "Your insights have been shared with the project team.",
    });
    setCommentText("");
  };

  const isTeammate = project.team.some(m => m.userId === currentUser.id);
  const isOwner = project.ownerId === currentUser.id;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Projects Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card overflow-hidden">
              <div className="h-48 bg-muted relative">
                <img 
                  src={project.coverImageUrl || `https://picsum.photos/seed/${project.id}-hero/1200/400`} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="text-white space-y-2">
                    <h1 className="text-4xl font-headline font-bold">{project.title}</h1>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {project.isVerified && <ShieldCheck className="w-8 h-8 text-white fill-primary" />}
                </div>
              </div>
              <CardContent className="p-8 pb-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-headline font-bold">Project Workspace</h3>
                    <Badge variant="outline" className="border-primary text-primary">{project.status}</Badge>
                  </div>
                  <p className="text-sm font-bold text-primary">{project.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 pt-6 mt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-bold text-foreground">{project.stats.memberCount}</span> Builders
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <History className="w-4 h-4" />
                    <span className="font-bold text-foreground">{project.stats.updateCount}</span> Build Logs
                  </div>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-bold text-foreground">{project.stats.discussionCount}</span> Feedback
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    <Globe className="w-4 h-4" />
                    {project.isPublic ? 'Public Hub' : 'Private Workspace'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-muted p-1 rounded-2xl w-full h-auto mb-6">
                <TabsTrigger value="build-log" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
                  <Terminal className="w-4 h-4" /> Proof of Effort
                </TabsTrigger>
                <TabsTrigger value="discussion" className="flex-1 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2">
                  <Users className="w-4 h-4" /> Community Review
                </TabsTrigger>
              </TabsList>

              <TabsContent value="build-log" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-headline font-bold">Progress Timeline</h3>
                    <p className="text-sm text-muted-foreground">Chronological evidence of building and iteration.</p>
                  </div>
                  {(isOwner || isTeammate) && (
                    <Button className="rounded-full gap-2 px-6 h-10 shadow-lg shadow-primary/20">
                      <PlusCircle className="w-4 h-4" /> Post Update
                    </Button>
                  )}
                </div>

                <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                  {updates.map((update) => (
                    <div key={update.id} className="relative pl-12 group">
                      <div className={cn(
                        "absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center z-10 transition-colors",
                        update.type === 'Milestone' ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      )}>
                        {update.type === 'Milestone' ? <Zap className="w-4 h-4 fill-current" /> : <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      
                      <Card className="glass-card hover:border-primary/30 transition-all overflow-hidden">
                        <CardHeader className="p-6 pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={update.type === 'Milestone' ? 'default' : 'secondary'} className="rounded-md text-[10px]">
                              {update.type}
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                              <CalendarDays className="w-3 h-3" /> {new Date(update.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-xl font-headline font-bold">{update.title}</h4>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Posted by {update.authorName}</p>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {update.content}
                          </p>
                          {update.imageUrl && (
                            <img src={update.imageUrl} alt="Update media" className="rounded-xl w-full object-cover max-h-60" />
                          )}
                          <div className="flex gap-2">
                            {Object.entries(update.reactions).map(([emoji, count]) => (
                              <Badge key={emoji} variant="outline" className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-muted">
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

              <TabsContent value="discussion" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-headline font-bold">Public Board</h3>
                    <p className="text-sm text-muted-foreground">Community-driven review and peer enhancement.</p>
                  </div>
                </div>

                <Card className="glass-card p-4 border-dashed border-primary/20 bg-primary/5">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea 
                        placeholder="Offer a critique, suggest a feature, or ask a question..." 
                        className="min-h-[100px] bg-white transition-all resize-none border-none rounded-2xl shadow-sm"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" /> Quality feedback helps builders improve.
                        </p>
                        <Button onClick={handlePostComment} className="rounded-full gap-2 px-6 h-10 shadow-lg shadow-primary/20">
                          <Send className="w-4 h-4" /> Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  {threads.map((thread) => (
                    <div key={thread.id} className="space-y-4">
                      <Card className="glass-card p-4 hover:border-primary/20 transition-all">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <button className="hover:text-orange-500 transition-colors"><ArrowBigUp className="w-6 h-6" /></button>
                            <span className="text-xs font-bold">{thread.upvotes}</span>
                            <button className="hover:text-blue-500 transition-colors"><ArrowBigDown className="w-6 h-6" /></button>
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-bold text-foreground">@{thread.authorName.replace(/\s/g, '').toLowerCase()}</span>
                              {thread.authorRole && (
                                <Badge variant="outline" className={cn(
                                  "text-[9px] h-4 py-0",
                                  thread.authorRole === 'Owner' || thread.authorRole === 'Teammate' ? "border-primary text-primary" : ""
                                )}>
                                  {thread.authorRole.toUpperCase()}
                                </Badge>
                              )}
                              <span className="text-muted-foreground">• {new Date(thread.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="font-bold">{thread.title}</h4>
                            <p className="text-sm leading-relaxed">{thread.content}</p>
                            <div className="flex items-center gap-4 pt-2">
                              <button className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
                                <MessageSquare className="w-3.5 h-3.5" /> Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {thread.replies.map(reply => (
                        <div key={reply.id} className="ml-12 border-l-2 border-muted pl-6">
                          <Card className="glass-card p-4 bg-muted/20 border-none shadow-none">
                            <div className="flex gap-4">
                               <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                <button className="hover:text-orange-500 transition-colors"><ArrowBigUp className="w-5 h-5" /></button>
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="font-bold text-foreground">@{reply.authorName.replace(/\s/g, '').toLowerCase()}</span>
                                  {reply.authorRole && (
                                    <Badge variant="outline" className={cn(
                                      "text-[9px] h-4 py-0",
                                      reply.authorRole === 'Owner' || reply.authorRole === 'Teammate' ? "border-primary text-primary" : ""
                                    )}>
                                      {reply.authorRole.toUpperCase()}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card className="glass-card bg-primary text-primary-foreground overflow-hidden border-none shadow-2xl shadow-primary/30">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-2 backdrop-blur-md">
                   <UserPlus className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">Join the Team</h3>
                  <p className="text-sm text-primary-foreground/80">
                    The founders are looking for {project.tags[0]} builders.
                  </p>
                </div>
                <Button onClick={handleApply} className="w-full bg-white text-primary hover:bg-white/90 rounded-full h-12 font-bold text-lg shadow-xl">
                  Apply to Join
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="p-6 border-b">
                <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Active Teammates
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {project.team.map((mate) => (
                    <div key={mate.userId} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage src={mate.avatarUrl} />
                          <AvatarFallback>{mate.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold">{mate.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{mate.title || mate.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-dashed border-2 bg-transparent">
              <CardHeader className="p-6">
                 <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" /> Resources
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3">
                {project.resources.map((res, i) => (
                  <a 
                    key={i} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                        res.label.includes('Github') ? "bg-black" : res.label.includes('Figma') ? "bg-pink-500" : "bg-primary"
                      )}>
                        {res.label.includes('Github') ? <Code className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium">{res.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
