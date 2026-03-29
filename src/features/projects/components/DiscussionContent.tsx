
"use client";

import Link from 'next/link';
import { mockDiscussions } from '../data';
import { ArrowLeft, MessageSquare, Plus, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function DiscussionContent() {
  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/projects"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl font-headline font-bold">Builder Community</h1>
            <p className="text-muted-foreground text-sm">Discussions, ideas, and feedback from builders.</p>
          </div>
        </div>
        <Button size="icon" className="rounded-full action-button-glow">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {mockDiscussions.map((thread) => (
          <Card key={thread.id} className="p-6 glass-card border-none bg-white shadow-md hover:shadow-lg transition-all">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 pt-1">
                <button className="hover:text-primary transition-colors"><ArrowBigUp className="w-6 h-6" /></button>
                <span className="text-xs font-bold">{thread.upvotes}</span>
                <button className="hover:text-primary transition-colors"><ArrowBigDown className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Avatar className="w-6 h-6 border">
                      <AvatarFallback className="bg-primary/5 text-primary text-[10px]">{thread.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">@{thread.authorName}</span>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase py-0">{thread.authorRole}</Badge>
                    <span className="text-muted-foreground">• {new Date(thread.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{thread.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{thread.content}</p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                   <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground font-bold hover:text-primary">
                     <MessageSquare className="w-4 h-4" /> {thread.replies.length} Replies
                   </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
