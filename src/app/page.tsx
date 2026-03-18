"use client";

import { Navbar } from '@/components/layout/Navbar';
import { feeds, currentUser } from '@/lib/mock-data';
import { Heart, MessageCircle, Share2, Plus, Zap, Star, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Main Column - Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions / Create Post */}
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex-shrink-0">
                   <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover rounded-full" />
                </div>
                <button className="flex-1 bg-muted text-muted-foreground rounded-full px-5 py-2.5 text-left text-sm hover:bg-muted/80 transition-colors">
                  What are you building today, Alex?
                </button>
              </div>
              <div className="flex justify-around mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Task
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                  <Plus className="w-4 h-4 text-secondary" /> Project
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                  <Star className="w-4 h-4 text-yellow-500" /> Milestone
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feed Filter */}
          <div className="flex items-center justify-between">
             <Tabs defaultValue="foryou" className="w-full">
              <TabsList className="bg-transparent h-auto p-0 gap-6">
                <TabsTrigger value="foryou" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-1 pb-2">For You</TabsTrigger>
                <TabsTrigger value="following" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-1 pb-2">Following</TabsTrigger>
                <TabsTrigger value="trending" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-1 pb-2">Trending</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Feed List */}
          <div className="space-y-6">
            {feeds.map((post) => (
              <Card key={post.id} className="glass-card group hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-accent overflow-hidden border">
                    <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{post.author}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{post.postedAt} • {post.type}</p>
                  </div>
                  <Badge variant={post.type === 'TASK' ? 'default' : 'secondary'} className="rounded-md">
                    {post.type}
                  </Badge>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-3">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.description}
                    </p>
                  )}
                  {post.image && (
                    <div className="rounded-2xl overflow-hidden aspect-video relative mt-3 border bg-muted">
                      <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {post.type === 'TASK' && (
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Reward</p>
                        <p className="font-headline font-bold text-2xl text-primary">{post.reward}</p>
                      </div>
                      <Button className="rounded-full px-6 action-button-glow">
                        Start Task
                      </Button>
                    </div>
                  )}

                  {post.type === 'PROBLEM' && (
                    <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-secondary flex items-center gap-1"><Trophy className="w-3 h-3" /> {post.reward}</span>
                        <span className="text-xs text-muted-foreground">Open Challenge</span>
                      </div>
                      <Button variant="secondary" className="w-full rounded-full">Submit Solution</Button>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-2">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Widgets */}
        <aside className="hidden lg:block space-y-6">
          
          {/* Trending Builders */}
          <Card className="glass-card">
            <CardHeader className="p-4 pb-2">
              <h3 className="font-headline text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Active Builders
              </h3>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent overflow-hidden">
                      <img src={`https://picsum.photos/seed/builder${i}/100/100`} alt="Builder" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">@builder_x{i}</p>
                      <p className="text-[10px] text-muted-foreground">12 tasks this week</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 rounded-full text-xs">Follow</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-full text-xs">View Leaderboard</Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="glass-card bg-primary text-white">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold">HackNation v2.0</h3>
              </div>
              <p className="text-sm text-white/80">
                Join 500+ builders this weekend to solve real startup problems.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="px-2 py-1 bg-white/20 rounded-md">Online</span>
                <span className="px-2 py-1 bg-white/20 rounded-md">Oct 24-26</span>
              </div>
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-full">Join Now</Button>
            </CardContent>
          </Card>
        </aside>

      </main>
    </div>
  );
}