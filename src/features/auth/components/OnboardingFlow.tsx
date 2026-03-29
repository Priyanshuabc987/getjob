
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks';
import { authService } from '../services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, ChevronRight, Sparkles, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    education: { institution: '', degree: '', startYear: '', endYear: '' },
    experience: { company: '', position: '', description: '', startDate: '', endDate: '' }
  });

  const handleNext = () => setStep(step + 1);
  const handleSkip = () => {
    if (step === 2) handleFinish();
    else setStep(step + 1);
  };

  const handleFinish = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const education = formData.education.institution ? [formData.education] : [];
      const experience = formData.experience.company ? [formData.experience] : [];
      
      await authService.updateOnboardingData(user.uid, {
        education,
        experience,
        onboardingCompleted: true
      });
      
      toast({ title: "Profile Ready!", description: "Welcome to the builder community." });
      router.push('/jobs');
    } catch (error) {
      toast({ title: "Error saving profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-4">
          <Sparkles className="w-4 h-4" /> Personal Brand Matters
        </div>
        <h1 className="text-3xl font-headline font-bold">Let's build your showcase</h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Adding your history helps recruiters verify your skills and builds trust in the community.
        </p>
      </div>

      <div className="relative">
        {step === 1 && (
          <Card className="glass-card border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <div className="h-2 bg-primary/10 w-full"><div className="h-full bg-primary w-1/2 transition-all duration-500" /></div>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Where did you study?</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input 
                    placeholder="e.g. Stanford University" 
                    className="rounded-xl h-12"
                    value={formData.education.institution}
                    onChange={(e) => setFormData({...formData, education: {...formData.education, institution: e.target.value}})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Degree</Label><Input placeholder="B.S. Computer Science" className="rounded-xl h-12" value={formData.education.degree} onChange={(e) => setFormData({...formData, education: {...formData.education, degree: e.target.value}})}/></div>
                  <div className="space-y-2"><Label>Year</Label><Input placeholder="2024" className="rounded-xl h-12" value={formData.education.startYear} onChange={(e) => setFormData({...formData, education: {...formData.education, startYear: e.target.value}})}/></div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <Button onClick={handleNext} className="h-14 rounded-full font-bold action-button-glow w-full">Continue <ChevronRight className="ml-2 w-4 h-4"/></Button>
                <Button onClick={handleSkip} variant="ghost" className="text-muted-foreground font-bold">Skip for now</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="glass-card border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <div className="h-2 bg-primary/10 w-full"><div className="h-full bg-primary w-full transition-all duration-500" /></div>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Any prior experience?</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input 
                    placeholder="e.g. Google or Startup X" 
                    className="rounded-xl h-12"
                    value={formData.experience.company}
                    onChange={(e) => setFormData({...formData, experience: {...formData.experience, company: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input placeholder="Frontend Intern" className="rounded-xl h-12" value={formData.experience.position} onChange={(e) => setFormData({...formData, experience: {...formData.experience, position: e.target.value}})}/>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="What did you build?" className="rounded-xl min-h-[100px]" value={formData.experience.description} onChange={(e) => setFormData({...formData, experience: {...formData.experience, description: e.target.value}})}/>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <Button onClick={handleFinish} disabled={loading} className="h-14 rounded-full font-bold action-button-glow w-full">
                  {loading ? 'Finalizing...' : 'Start Building'} <Rocket className="ml-2 w-4 h-4"/>
                </Button>
                <Button onClick={handleSkip} variant="ghost" className="text-muted-foreground font-bold">Skip and Finish</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
