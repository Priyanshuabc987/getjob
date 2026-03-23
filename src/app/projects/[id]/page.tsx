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
  Clock,
  Camera,
  Link as LinkIcon,
  Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("build-log");
  const [isAddingProof, setIsAddingProof] = useState(false);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);

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

  const handleAddProof = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingProof(false);
    toast({
      title: "Proof Published!",
      description: "Your update has been added to the build log.",
    });
  };

  const handleReply = (threadId: string) => {
    setReplyTarget(threadId);
    toast({
      title: "Reply Form Opened",
      description: "You can now type your feedback.",
    });
  };

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
                <TabsTrigger value="build-log" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2 font-bold">
                  <Terminal className="w-4 h-4" /> Build Log
                </TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2 font-bold">
                  <CheckSquare className="w-4 h-4" /> Jobs
                </TabsTrigger>
                <TabsTrigger value="community" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg gap-2 font-bold">
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
                    <Dialog open={isAddingProof} onOpenChange={setIsAddingProof}>
                      <DialogTrigger asChild>
                        <Button className="rounded-full gap-2 px-6 action-button-glow font-bold">
                          <PlusCircle className="w-4 h-4" /> Add Proof
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] rounded-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-headline">Post Proof of Effort</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddProof} className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Update Title</Label>
                            <Input id="title" placeholder="e.g., Designed the Auth Flow" className="rounded-xl" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="content">What was done?</Label>
                            <Textarea id="content" placeholder="Describe your progress and learnings..." className="rounded-xl min-h-[100px]" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="proof-type">Proof Type</Label>
                                <select className="w-full bg-background border rounded-xl px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                                   <option>Link</option>
                                   <option>Image</option>
                                   <option>Video</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <Label htmlFor="proof-url">Evidence URL</Label>
                                <Input id="proof-url" placeholder="GitHub/Figma/Loom link" className="rounded-xl" />
                             </div>
                          </div>
                          <div className="p-6 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center space-y-2 hover:bg-muted transition-colors cursor-pointer">
                             <Camera className="w-8 h-8 text-muted-foreground" />
                             <p className="text-sm text-muted-foreground font-medium">Click to upload screenshot</p>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="w-full rounded-full h-12 action-button-glow font-bold">Publish Proof</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
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
                      <p className="text-sm text-muted-foreground">Internal micro-jobs to keep the momentum going.</p>
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
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={thread.authorAvatarUrl} />
                                  <AvatarFallback>{thread.authorName[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-bold">@{thread.authorName}</span>
                                <Badge variant="outline" className="text-[9px] h-4 py-0 uppercase">{thread.authorRole}</Badge>
                                <span className="text-muted-foreground">• {new Date(thread.createdAt).toLocaleDateString()}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 gap-2 text-primary font-bold" onClick={() => handleReply(thread.id)}>
                                <Reply className="w-4 h-4" /> Reply
                              </Button>
                            </div>
                            <h4 className="font-bold text-lg">{thread.title}</h4>
                            <p className="text-sm leading-relaxed">{thread.content}</p>

                            {/* Nested Replies */}
                            <div className="space-y-4 mt-6 pl-6 border-l-2 border-muted">
                              {thread.replies.map((reply) => (
                                <div key={reply.id} className="space-y-2">
                                  <div className="flex items-center gap-2 text-xs">
                                    <Avatar className="w-5 h-5">
                                      <AvatarImage src={reply.authorAvatarUrl} />
                                      <AvatarFallback>{reply.authorName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-bold">@{reply.authorName}</span>
                                    <Badge variant="secondary" className="text-[8px] h-4 py-0 uppercase bg-primary/5 text-primary border-none">{reply.authorRole}</Badge>
                                    <span className="text-muted-foreground">• {new Date(reply.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{reply.content}</p>
                                </div>
                              ))}
                              
                              {replyTarget === thread.id && (
                                <div className="pt-2 animate-in slide-in-from-top-2">
                                  <Textarea placeholder="Type your reply..." className="rounded-xl mb-3 h-20" />
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setReplyTarget(null)}>Cancel</Button>
                                    <Button size="sm" className="rounded-full px-6 font-bold" onClick={() => {
                                      setReplyTarget(null);
                                      toast({ title: "Reply Sent!" });
                                    }}>Send</Button>
                                  </div>
                                </div>
                              )}
                            </div>
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
          {/* ... aside content ... */}
        </div>
      </main>
    </div>
  );
}
