"use client";

import { Navbar } from '@/components/layout/Navbar';
import { events } from '@/lib/mock-data';
import { Calendar, MapPin, Trophy, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4 fill-current" /> Action-Driven Events
          </div>
          <h1 className="text-4xl font-headline mb-4">Turn Events into Effort</h1>
          <p className="text-lg text-muted-foreground">Don't just attend. Join hackathons, build working prototypes, and keep the momentum going after the event ends.</p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {events.map((event) => (
            <Card key={event.id} className="glass-card group overflow-hidden border-none shadow-2xl rounded-[3rem] bg-white">
              <div className="flex flex-col lg:flex-row">
                {/* Visual Section */}
                <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
                  <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                     <Badge className="bg-white/20 backdrop-blur-md text-white border-none text-xs font-bold px-4 py-1 rounded-full mb-3">
                       {event.type.toUpperCase()}
                     </Badge>
                     <h3 className="text-3xl font-headline font-bold text-white leading-tight">{event.title}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Date
                      </p>
                      <p className="text-sm font-bold">{event.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Location
                      </p>
                      <p className="text-sm font-bold">{event.location}</p>
                    </div>
                    <div className="space-y-1 col-span-2 md:col-span-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Register By
                      </p>
                      <p className="text-sm font-bold text-red-500">{event.deadline} Oct</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {event.description}
                    </p>
                    {event.reward && (
                      <div className="inline-flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reward Pool</p>
                          <p className="text-sm font-bold text-primary">{event.reward}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button className="rounded-full px-10 h-14 font-bold text-lg action-button-glow flex-1">
                      Join & Start Building <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" className="rounded-full px-10 h-14 font-bold text-lg border-primary/20 text-primary hover:bg-primary/5 flex-1">
                      View Event Guide
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-20 text-center bg-secondary p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
             <Calendar className="w-64 h-64 text-white" />
           </div>
           <div className="relative z-10 max-w-2xl mx-auto space-y-6">
             <h2 className="text-4xl font-headline font-bold text-white leading-tight">Host an Event?</h2>
             <p className="text-white/80 text-lg">
               Looking to drive innovation in your community? Use PrepLinc to manage your hackathon and ensure every attendee builds something lasting.
             </p>
             <Button className="bg-white text-secondary hover:bg-white/90 rounded-full px-12 h-14 font-bold text-lg shadow-2xl">
                Partner with PrepLinc
             </Button>
           </div>
        </div>
      </main>
    </div>
  );
}