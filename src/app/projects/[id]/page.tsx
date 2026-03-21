"use client";

import { use, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { projects, currentUser } from '@/lib/mock-data';
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
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find(p => p.id === id);
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");

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
      title: "Comment Posted!",
      description: "Your thought has been shared with the team.",
    });
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb / Back */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Projects</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Header Card */}
            <Card className="glass-card overflow-hidden">
              <div className="h-48 bg-muted relative">
                <img 
                  src={`https://picsum.photos/seed/${project.id}-hero/1200/400`} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="text-white space-y-2">
                    <h1 className="text-4xl font-headline font-bold">{project.title}</h1>
                    <div className="flex gap-2">
                      {project.skills.map(skill => (
                        <Badge key={skill} className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-headline font-bold">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-bold text-foreground">{project.contributors}</span> Builders
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-bold text-foreground">{project.discussion.length}</span> Discussions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Project
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reddit-style Discussion Board */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" /> Discussions
                </h3>
                <div className="text-sm font-medium text-muted-foreground">
                  Sort by: <span className="text-primary cursor-pointer hover:underline">Hot</span>
                </div>
              </div>

              {/* Comment Input */}
              <Card className="glass-card p-4">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea 
                      placeholder="What's on your mind about this project?" 
                      className="min-h-[100px] bg-muted/50 focus:bg-white transition-all resize-none border-none rounded-2xl"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handlePostComment} className="rounded-full gap-2 px-6 h-10 shadow-lg shadow-primary/20">
                        <Send className="w-4 h-4" /> Post
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Comments List */}
              <div className="space-y-4">
                {project.discussion.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <Card className="glass-card p-4 hover:border-primary/20 transition-all">
                      <div className="flex gap-4">
                        {/* Upvote side */}
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <button className="hover:text-orange-500 transition-colors">
                            <ArrowBigUp className="w-6 h-6" />
                          </button>
                          <span className="text-xs font-bold">{comment.upvotes}</span>
                          <button className="hover:text-blue-500 transition-colors">
                            <ArrowBigDown className="w-6 h-6" />
                          </button>
                        </div>

                        {/* Comment Body */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-foreground">@{comment.author.toLowerCase().replace(' ', '_')}</span>
                            <span className="text-muted-foreground">• {comment.postedAt}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{comment.text}</p>
                          <div className="flex items-center gap-4 pt-2">
                            <button className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5" /> Reply
                            </button>
                            <button className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1.5">
                              <Share2 className="w-3.5 h-3.5" /> Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Replies (Nested) */}
                    {comment.replies && comment.replies.map(reply => (
                      <div key={reply.id} className="ml-12 border-l-2 border-muted pl-6 space-y-4">
                        <Card className="glass-card p-4 bg-muted/20 border-none shadow-none">
                          <div className="flex gap-4">
                             <div className="flex flex-col items-center gap-1 text-muted-foreground">
                              <button className="hover:text-orange-500 transition-colors">
                                <ArrowBigUp className="w-5 h-5" />
                              </button>
                              <span className="text-[10px] font-bold">{reply.upvotes}</span>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-foreground">@{reply.author.toLowerCase().replace(' ', '_')}</span>
                                <span className="text-muted-foreground">• {reply.postedAt}</span>
                              </div>
                              <p className="text-sm">{reply.text}</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Action / Join Card */}
            <Card className="glass-card bg-primary text-primary-foreground overflow-hidden border-none shadow-2xl shadow-primary/30">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-2 backdrop-blur-md">
                   <UserPlus className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">Join the Team</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Priya is looking for builders with skills in Flutter and UI/UX design.
                  </p>
                </div>
                <Button 
                  onClick={handleApply}
                  className="w-full bg-white text-primary hover:bg-white/90 rounded-full h-12 font-bold text-lg shadow-xl"
                >
                  Apply to Join
                </Button>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                  Applications are manually reviewed
                </p>
              </CardContent>
            </Card>

            {/* Current Team Card */}
            <Card className="glass-card">
              <CardHeader className="p-6 border-b">
                <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Active Teammates
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {project.teammates?.map((mate) => (
                    <div key={mate.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage src={mate.avatar} />
                          <AvatarFallback>{mate.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold">{mate.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{mate.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t bg-muted/10">
                <Button variant="outline" className="w-full rounded-full gap-2 text-xs font-bold border-muted">
                  View Full Team Structure
                </Button>
              </CardFooter>
            </Card>

            {/* Project Quick Links */}
            <Card className="glass-card border-dashed border-2 bg-transparent">
              <CardHeader className="p-6">
                 <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" /> Resources
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                      <Code className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Github Repo</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                      <Layout className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Figma Prototype</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
