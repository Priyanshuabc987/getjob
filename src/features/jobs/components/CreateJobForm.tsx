'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Job, JobType, CompensationType } from '@/features/jobs/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function CreateJobForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Omit<Job, 'id' | 'startupId' | 'startupName' | 'startupLogoUrl' | 'applicantsCount' | 'createdAt' | 'status' | 'sector'>> & { durationValue: number | '', durationUnit: string }> ({
    title: '',
    description: '',
    deliverables: [],
    skills: [],
    type: 'task/project based',
    location: '',
    remote: false,
    compensationType: 'Paid',
    stipend: '',
    durationValue: '',
    durationUnit: 'Days',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const duration = form.durationValue ? `${form.durationValue} ${form.durationUnit}` : '';
    const finalForm = { ...form, duration };
    delete (finalForm as any).durationValue;
    delete (finalForm as any).durationUnit;

    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: 'Job posted successfully!' });
    router.push('/jobs');
    setLoading(false);
  };

  const handleCompensationChange = (value: CompensationType) => {
    const isStipendRequired = value === 'Paid' || value === 'Equity';
    setForm(prev => ({ 
      ...prev, 
      compensationType: value,
      stipend: isStipendRequired ? prev.stipend : ''
    }));
  }

  const handleRemoteChange = (checked: boolean) => {
    setForm(prev => ({
      ...prev,
      remote: checked,
      location: checked ? '' : prev.location
    }))
  }

  const isStipendDisabled = form.compensationType === 'Unpaid' || form.compensationType === 'Partnership';
  const stipendPlaceholder = 
      form.compensationType === 'Paid' ? 'Amount in ₹, e.g., 8,000' 
    : form.compensationType === 'Equity' ? 'Percentage, e.g., 5' 
    : 'Not applicable';

  return (
    <form onSubmit={handleSubmit}>
        <Card className="bg-white dark:bg-card shadow-lg rounded-[2.5rem] border">
            <CardContent className="space-y-8 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Job Title <span className="text-destructive">*</span></Label>
                        <Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Job Type <span className="text-destructive">*</span></Label>
                        <Select value={form.type} onValueChange={(value: JobType) => setForm({ ...form, type: value })} required>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="task/project based">Task/Project Based</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="full-time">Full-time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                    <Textarea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location {!form.remote && <span className="text-destructive">*</span>}</Label>
                        <Input id="location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required={!form.remote} disabled={form.remote} />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                        <Checkbox id="remote" checked={form.remote} onCheckedChange={handleRemoteChange} />
                        <Label htmlFor="remote" className="font-medium">This is a remote position</Label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="compensationType">Compensation Type <span className="text-destructive">*</span></Label>
                        <Select value={form.compensationType} onValueChange={handleCompensationChange} required>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Unpaid">Unpaid</SelectItem>
                                <SelectItem value="Equity">Equity</SelectItem>
                                <SelectItem value="Partnership">Partnership</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stipend">Stipend / Compensation {!isStipendDisabled && <span className="text-destructive">*</span>}</Label>
                        <Input id="stipend" value={form.stipend} onChange={e => setForm({ ...form, stipend: e.target.value })} placeholder={stipendPlaceholder} disabled={isStipendDisabled} required={!isStipendDisabled} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                         <Label htmlFor="duration">Project Duration</Label>
                        <div className="flex gap-2">
                            <Input 
                                type="number"
                                value={form.durationValue}
                                onChange={e => setForm({...form, durationValue: e.target.value === '' ? '' : parseInt(e.target.value, 10)})}
                                className="w-1/2"
                                placeholder="e.g., 3"
                            />
                            <Select value={form.durationUnit} onValueChange={unit => setForm({...form, durationUnit: unit})}>
                                <SelectTrigger className="w-1/2"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Days">Days</SelectItem>
                                    <SelectItem value="Weeks">Weeks</SelectItem>
                                    <SelectItem value="Months">Months</SelectItem>
                                    <SelectItem value="Year">Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                        <Input id="skills" value={form.skills?.join(', ')} onChange={e => setForm({ ...form, skills: e.target.value.split(', ').map(s => s.trim()) })} placeholder="e.g., React, Figma, Python" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="deliverables">Key Deliverables (comma-separated)</Label>
                    <Textarea id="deliverables" value={form.deliverables?.join(', \n')} onChange={e => setForm({ ...form, deliverables: e.target.value.split(', ').map(s => s.trim()) })} placeholder="e.g., MVP Launch, User Research Report" />
                </div>

            </CardContent>
            <CardFooter className="flex justify-center p-6">
                <Button type="submit" disabled={loading} size="lg">
                    {loading ? 'Posting...' : 'Post Job'}
                </Button>
            </CardFooter>
        </Card>
    </form>
  );
}
