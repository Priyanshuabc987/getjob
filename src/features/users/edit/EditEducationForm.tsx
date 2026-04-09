
"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addEducation } from '@/features/users/services/write';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface EditEducationFormProps {
  userId: string;
}

export function EditEducationForm({ userId }: EditEducationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const newEducation = { id: uuidv4(), school, degree, fieldOfStudy, startYear, endDate: isCurrent ? '' : endDate, isCurrent };
        await addEducation(userId, newEducation);
        toast({ title: "Education Added", description: "Your learning path expands!" });
        router.push(`/profile/${userId}`);
      } catch (error) {
        toast({ variant: "destructive", title: "Failed to add education" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-muted/20">
          <CardTitle className="flex items-center gap-3 text-xl"><GraduationCap className="w-6 h-6 text-secondary" /> Add New Education</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">School / University <span className="text-destructive">*</span></Label>
              <Input value={school} onChange={e => setSchool(e.target.value)} className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Degree <span className="text-destructive">*</span></Label>
              <Input value={degree} onChange={e => setDegree(e.target.value)} className="h-12 rounded-xl" required />
            </div>
          </div>
           <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Field of Study <span className="text-destructive">*</span></Label>
              <Input value={fieldOfStudy} onChange={e => setFieldOfStudy(e.target.value)} className="h-12 rounded-xl" required />
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Start Year <span className="text-destructive">*</span></Label>
              <Input type="text" value={startYear} onChange={e => setStartYear(e.target.value)} placeholder="e.g., 2020" className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">End Year</Label>
              <Input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="e.g., 2024" disabled={isCurrent} className="h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="isCurrent" checked={isCurrent} onCheckedChange={() => setIsCurrent(!isCurrent)} />
            <Label htmlFor="isCurrent" className="font-bold">I currently study here</Label>
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
