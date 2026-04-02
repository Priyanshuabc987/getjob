
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Loader2, Globe, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from '@/components/ui/MultiSelect';

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
    {children} <span className="text-red-500">*</span>
  </Label>
);

export function CreateStartupForm({ sectors }: { sectors: string[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual form submission logic
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Startup Registered!", description: "Welcome to the PrepLinc Builder Ecosystem." });
      router.push('/startups');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <RequiredLabel>Startup Name</RequiredLabel>
              <Input placeholder="e.g. ZettaCloud" className="rounded-xl h-12 font-bold" required />
            </div>

            <div className="space-y-2">
              <RequiredLabel>Tagline</RequiredLabel>
              <Input placeholder="Hyper-scale compute for teams..." className="rounded-xl h-12 italic" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <RequiredLabel>Team Size</RequiredLabel>
                    <Select required>
                        <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2-4">2-4</SelectItem>
                        <SelectItem value="5-10">5-10</SelectItem>
                        <SelectItem value="10-49">10-49</SelectItem>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <RequiredLabel>Location</RequiredLabel>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="e.g. Banglore, India" className="rounded-xl h-12 pl-12" required/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <RequiredLabel>Stage</RequiredLabel>
                <Select required>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Idea">Idea</SelectItem>
                    <SelectItem value="MVP">MVP</SelectItem>
                    <SelectItem value="Early Traction">Early Traction</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <RequiredLabel>Funding Stage</RequiredLabel>
                <Select required>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                    <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="Series A">Series A</SelectItem>
                    <SelectItem value="Series B">Series B</SelectItem>
                    <SelectItem value="Series C+">Series C+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <RequiredLabel>Description</RequiredLabel>
              <Textarea placeholder="What are you building and why now?" className="rounded-2xl min-h-[150px]" required />
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Website URL</Label>
                <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="https://..." className="rounded-xl h-12 pl-12" />
                </div>
            </div>
            
            <div className="space-y-2">
                <RequiredLabel>Sectors</RequiredLabel>
                <MultiSelect 
                    options={sectors}
                    selected={selectedSectors}
                    onChange={setSelectedSectors}
                    placeholder="Select or add sectors..."
                />
            </div>
          </div>

          <div className="pt-6">
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Building2 className="w-5 h-5 mr-2" />}
              Register Startup
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
