
"use client";

import { feeds } from '@/features/feed/data';
import { mockProjects } from '@/features/projects/data';
import { Sparkles, Zap, MessageSquare, Heart, Share2, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/features/projects/shared/components/ProjectCard';

export function FeedPageContent() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 relative">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-50 flex items-start justify-center pt-24 pointer-events-none">
           <div className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-2xl animate-pulse pointer-events-auto border-4 border-white flex items-center gap-2">
             <Sparkles className="w-4 h-4 fill-current" /> COMMUNITY FEED COMING SOON
           </div>
        </div>

        <div className="mb-10 opacity-60">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Building In Public</h1>
          <p className="text-muted-foreground">The heartbeat of the PrepLinc builder community.</p>
        </div>

        <div className="space-y-10 opacity-30 grayscale blur-[2px] select-none pointer-events-none">
          {/* Featured Project from Feed Data */}
          {mockProjects.slice(0, 1).map((proj) => (
            <div key={proj.id} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Zap className="w-4 h-4 text-primary fill-current" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Trending Build</span>
              </div>
              <ProjectCard project={proj} showStats={true} />
            </div>
          ))}

          {/* Social Posts */}
          {feeds.map((post) => (
            <Card key={post.id} className="glass-card border-none shadow-md overflow-hidden bg-white max-w-2xl mx-auto">
              <CardHeader className="p-6 border-b border-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold leading-none">{post.author}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">{post.postedAt}</p>
                    </div>
                  </div>
                  {post.type === 'JOB' && (
                    <Badge className="bg-orange-500/10 text-orange-600 border-none text-[10px] font-bold">
                      <Briefcase className="w-3 h-3 mr-1" /> MICRO-JOB
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6 space-y-4">
                <h3 className="text-xl font-headline font-bold">{post.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                {post.reward && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
                    Reward: {post.reward}
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-6 py-4 border-t border-muted/50 flex items-center gap-6">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-5 h-5" /> <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageSquare className="w-5 h-5" /> <span className="text-xs font-bold">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
