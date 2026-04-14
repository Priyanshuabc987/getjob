
"use client";

import { useState, useRef, useCallback } from 'react';
import { Rocket, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { StartupCard } from './StartupCard';
import { StartupProfile } from '../types';
import { getNextStartups } from '../actions/read';
import { StartupCardSkeleton } from './StartupCardSkeleton';

interface StartupsPageContentProps {
  initialStartups: StartupProfile[];
  initialNextCursor: string | null;
}

export function StartupsPageContent({ initialStartups, initialNextCursor }: StartupsPageContentProps) {
  const [startups, setStartups] = useState<StartupProfile[]>(initialStartups);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialNextCursor);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreStartups = useCallback(async () => {
    if (!nextCursor || loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await getNextStartups(nextCursor);
      if (result.startups.length > 0) {
        setStartups(prev => [...prev, ...result.startups as StartupProfile[]]);
      } 
      if (result.nextCursor) {
        setNextCursor(result.nextCursor);
      } else {
        setHasMore(false);
        setNextCursor(null);
      }
    } catch (error) {
      console.error("Failed to load more startups:", error);
    } finally {
      setLoading(false);
    }
  }, [nextCursor, loading, hasMore]);

  const lastStartupElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreStartups();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreStartups]);


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative">

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Rocket className="w-4 h-4" /> Startup Discovery
            </div>
            <h1 className="text-4xl font-headline mb-4">Meet the Builders</h1>
            <p className="text-lg text-muted-foreground">Find student-led startups, explore their journeys, and join as a collaborator.</p>
          </div>
          
          <Link href="/startups/create" className="w-full md:w-auto">
            <Button className="rounded-full px-8 h-14 font-bold text-lg w-full">
              <Plus className="w-5 h-5 mr-2" /> Register Startup
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {startups.map((startup, index) => {
              if (startups.length === index + 1) {
                return <div ref={lastStartupElementRef} key={startup.id}><StartupCard startup={startup} /></div>
              } else {
                return <StartupCard key={startup.id} startup={startup} />
              }
            })}
             {loading && (
                <>
                  <StartupCardSkeleton />
                  <StartupCardSkeleton />
                </>
             )}
             {!hasMore && startups.length > 0 && (
                <div className="text-center text-muted-foreground py-8">No more startups to load.</div>
             )}
          </div>

          <aside className="space-y-8">
            <Card className="glass-card bg-primary text-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <h3 className="font-headline text-2xl font-bold">Start a Squad</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Building something new? Post your idea and find co-founders.
                </p>
                <Button disabled className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold shadow-xl">
                  Find Co-Founders
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
    </div>
  );
}
