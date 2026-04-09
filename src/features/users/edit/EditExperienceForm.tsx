
"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addExperience } from '@/features/users/services/write';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface EditExperienceFormProps {
  userId: string;
}

export function EditExperienceForm({ userId }: EditExperienceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const newExperience = { id: uuidv4(), role, company, startDate, endDate: isCurrent ? '' : endDate, isCurrent };
        await addExperience(userId, newExperience);
        toast({ title: "Experience Added", description: "Your professional path grows!" });
        router.push(`/profile/${userId}`);
      } catch (error) {
        toast({ variant: "destructive", title: "Failed to add experience" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-muted/20">
          <CardTitle className="flex items-center gap-3 text-xl"><Briefcase className="w-6 h-6 text-primary" /> Add New Experience</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Role / Title <span className="text-destructive">*</span></Label>
              <Input value={role} onChange={e => setRole(e.target.value)} className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Company / Organization <span className="text-destructive">*</span></Label>
              <Input value={company} onChange={e => setCompany(e.target.value)} className="h-12 rounded-xl" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Start Date <span className="text-destructive">*</span></Label>
              <Input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="e.g., Jan 2022" className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">End Date</Label>
              <Input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="e.g., Dec 2023" disabled={isCurrent} className="h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="isCurrent" checked={isCurrent} onCheckedChange={() => setIsCurrent(!isCurrent)} />
            <Label htmlFor="isCurrent" className="font-bold">I currently work here</Label>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4 sticky bottom-4">
        <Button type="submit" disabled={isPending} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
          {isPending ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
          Add to Path
        </Button>
      </div>
    </form>
  );
}
