
"use client";

import { feeds } from '@/features/feed/data';
import { MessageSquare, Heart, Share2, Zap, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { APP_NAME } from '@/lib/constants';

export default function FeedPage() {
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
          <h1 className="text-3xl font-headline font-bold">Building In Public</h1>
          <p className="text-muted-foreground">{`The heartbeat of the ${APP_NAME} builder community.`}</p>
        </div>

        <div className="space-y-6 opacity-30 grayscale blur-[2px] select-none pointer-events-none">
          {feeds.map((post) => (
            <Card key={post.id} className="glass-card border-none shadow-md overflow-hidden bg-white">
              <CardHeader className="p-6">
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
                    <Badge className="bg-primary/5 text-primary border-none text-[10px] font-bold">
                      <Zap className="w-3 h-3 mr-1 fill-current" /> NEW JOB
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-4 space-y-4">
                <h3 className="text-xl font-headline font-bold">{post.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                {post.reward && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
                    Reward: {post.reward}
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-6 py-4 border-t flex items-center gap-6">
                <button className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-5 h-5" /> <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="w-5 h-5" /> <span className="text-xs font-bold">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground ml-auto">
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
