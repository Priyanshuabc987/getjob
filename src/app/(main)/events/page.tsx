
"use client";

import { events } from '@/features/events/data';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-4">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4 fill-current" /> Action-Driven Events
          </div>
          <h1 className="text-4xl font-headline font-bold mb-4">Turn Events into Effort</h1>
          <p className="text-lg text-muted-foreground">Don't just attend. Join hackathons, build working prototypes, and keep the momentum going.</p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {events.map((event) => (
            <Card key={event.id} className="glass-card group overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white">
              <div className="flex flex-col lg:flex-row">
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

                <div className="lg:w-3/5 p-8 lg:p-12 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
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
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {event.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button className="rounded-full px-10 h-14 font-bold text-lg flex-1 action-button-glow">
                      Join & Start Building <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
