
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function CreateEventForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Event Scheduled!", description: "The community has been notified about your new event." });
      router.push('/events');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Event Title</Label>
              <Input placeholder="e.g. 48h AI Hackathon" className="rounded-xl h-12 font-bold" required />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Event Goal & Description</Label>
              <Textarea placeholder="What will participants build or learn?" className="rounded-2xl min-h-[150px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date & Time</Label>
                <Input type="datetime-local" className="rounded-xl h-12" required />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Online / Campus" className="rounded-xl h-12 pl-12" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Prizes / Rewards (Optional)</Label>
                <Input placeholder="e.g. ₹10k Prize Pool" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Event Type</Label>
                <Input placeholder="Hackathon / Workshop" className="rounded-xl h-12" required />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
              Launch Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
