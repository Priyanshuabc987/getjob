'use client';

import { useState, useMemo } from 'react';
import { projectWorkspaces, progressUpdates, discussionThreads, currentUser } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  Users, 
  ExternalLink,
  Code,
  Zap,
  CheckCircle2,
  PlusCircle,
  Clock,
  Reply,
  ArrowBigUp,
  ArrowBigDown,
  Terminal,
  CheckSquare,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ProjectDetailsContent({ projectId }: { projectId: string }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("build-log");

  const project = useMemo(() => projectWorkspaces.find(p => p.id === projectId), [projectId]);
  const updates = useMemo(() => progressUpdates.filter(u => u.projectId === projectId), [projectId]);
  const threads = useMemo(() => discussionThreads.filter(t => t.projectId === projectId), [projectId]);

  if (!project) return null;

  const isOwner = project.ownerId === currentUser.id;

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Review Shared!", description: "Your feedback has been posted to the community." });
  };

  return (
    <div className="min-h-screen bg-[#F4F3F8]">
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Workspace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card overflow-hidden border-none shadow-xl bg-white">
              <div className="h-56 bg-muted relative">
                <Image src={project.coverImageUrl || `https://picsum.photos/seed/${project.id}/800/400`} alt={project.title} layout="fill" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-2 text-white">
                    <Badge className="bg-white/20 border-none backdrop-blur-md">{project.status.toUpperCase()}</Badge>
                    <h1 className="text-4xl font-headline font-bold tracking-tight">{project.title}</h1>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Credibility</p>
                    <div className="text-2xl font-headline font-bold text-primary bg-white px-3 py-1 rounded-xl shadow-lg">
                      {project.credibilityScore}
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-lg font-bold text-primary italic mb-4">"{project.tagline}"</p>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10">#{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-muted/50 p-1 rounded-2xl w-full h-auto mb-6 grid grid-cols-3">
                <TabsTrigger value="build-log" className="rounded-xl py-3 font-bold gap-2"><Terminal className="w-4 h-4" /> Build Log</TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-xl py-3 font-bold gap-2"><CheckSquare className="w-4 h-4" /> Micro-Jobs</TabsTrigger>
                <TabsTrigger value="community" className="rounded-xl py-3 font-bold gap-2"><Users className="w-4 h-4" /> Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="build-log" className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-headline font-bold">Proof Timeline</h3>
                  {isOwner && <Button className="rounded-full gap-2 px-6 action-button-glow font-bold"><PlusCircle className="w-4 h-4" /> Add Proof</Button>}
                </div>
                <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                  {updates.map((update) => (
                    <div key={update.id} className="relative pl-12">
                      <div className={cn("absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-[#F4F3F8] flex items-center justify-center z-10 bg-white shadow-sm", update.type === 'Milestone' && "bg-primary text-white scale-110 shadow-lg")}>
                        {update.type === 'Milestone' ? <Zap className="w-4 h-4 fill-current" /> : <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <Card className="glass-card border-none shadow-md bg-white p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant={update.type === 'Milestone' ? 'default' : 'outline'}>{update.type}</Badge>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest"><Clock className="w-3 h-3 inline mr-1" /> {new Date(update.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-xl font-headline font-bold mb-2">{update.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{update.content}</p>
                        {update.proofUrl && (
                          <a href={update.proofUrl} target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                            <Code className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium truncate">{update.proofUrl}</span>
                          </a>
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community" className="space-y-6">
                <Card className="p-6 glass-card border-none bg-white">
                  <h4 className="font-bold mb-4">Share Your Review</h4>
                  <form onSubmit={handlePostReview} className="space-y-4">
                    <Textarea placeholder="What do you think about this project?" className="rounded-xl min-h-[100px]" />
                    <Button type="submit" className="rounded-full px-8 font-bold action-button-glow">Post Review</Button>
                  </form>
                </Card>
                <div className="space-y-4">
                  {threads.map((thread) => (
                    <Card key={thread.id} className="p-6 glass-card border-none bg-white">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <button className="hover:text-primary"><ArrowBigUp className="w-6 h-6" /></button>
                          <span className="text-xs font-bold">{thread.upvotes}</span>
                          <button className="hover:text-primary"><ArrowBigDown className="w-6 h-6" /></button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs">
                              <Avatar className="w-6 h-6"><AvatarFallback>{thread.authorName[0]}</AvatarFallback></Avatar>
                              <span className="font-bold">@{thread.authorName}</span>
                              <Badge variant="outline" className="text-[8px]">{thread.authorRole}</Badge>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-primary font-bold"><Reply className="w-4 h-4" /> Reply</Button>
                          </div>
                          <h4 className="font-bold text-lg">{thread.title}</h4>
                          <p className="text-sm">{thread.content}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-8">
            <Card className="glass-card border-none shadow-xl bg-white p-6">
              <h3 className="font-headline font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> The Squad</h3>
              <div className="space-y-4">
                {project.team.map(member => (
                  <div key={member.userId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatarUrl || `https://picsum.photos/seed/${member.userId}/100/100`} />
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{member.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 rounded-full font-bold action-button-glow">Join the Squad</Button>
            </Card>

            <Card className="glass-card border-none shadow-xl bg-white p-6">
              <h3 className="font-headline font-bold mb-4 flex items-center gap-2"><Layout className="w-5 h-5 text-primary" /> Project Hub</h3>
              <div className="space-y-3">
                {project.resources.map(res => (
                  <a key={res.url} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-primary/5 transition-colors">
                    <span className="text-sm font-bold">{res.label}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
