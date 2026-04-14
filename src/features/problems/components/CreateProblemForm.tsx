
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function CreateProblemForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Challenge Shared!", description: "Builders will now see this as an active challenge." });
      router.push('/problems');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Challenge Title</Label>
              <Input placeholder="e.g. Mess Food Waste Prediction" className="rounded-xl h-12 font-bold" required />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Problem Statement</Label>
              <Textarea placeholder="Describe the friction point in detail..." className="rounded-2xl min-h-[150px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reward / Benefit</Label>
                <Input placeholder="e.g. ₹5,000 or LoR" className="rounded-xl h-12" required />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Difficulty Level</Label>
                <Input placeholder="Easy / Medium / Hard" className="rounded-xl h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Suggested Tags (Optional)</Label>
              <Input placeholder="AI, Data, Sustainability" className="rounded-xl h-12" />
            </div>
          </div>

          <div className="pt-6">
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Lightbulb className="w-5 h-5 mr-2" />}
              Launch Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
