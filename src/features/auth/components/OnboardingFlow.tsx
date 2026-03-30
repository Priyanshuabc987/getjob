
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks';
import { completeOnboarding } from '@/features/users/services/write';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  Rocket, 
  Code, 
  Cpu, 
  Globe, 
  Smartphone, 
  Target,
  ChevronRight,
  UserCircle,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UserRole, ExperienceLevel } from '../types';

const roles = [
  { id: 'builder', label: 'Builder', desc: 'I build & ship products', icon: Rocket },
  { id: 'learner', label: 'Learner', desc: 'I am here to learn skills', icon: Sparkles },
  { id: 'job_seeker', label: 'Job Seeker', desc: 'Looking for internships', icon: Target },
  { id: 'founder', label: 'Founder', desc: 'Starting a new squad', icon: UserCircle },
] as const;

const domains = [
  { id: 'web', label: 'Web Dev', icon: Globe },
  { id: 'app', label: 'App Dev', icon: Smartphone },
  { id: 'ai', label: 'AI/ML', icon: Sparkles },
  { id: 'semiconductor', label: 'Semiconductor', icon: Cpu },
  { id: 'core', label: 'Core (Mech/ECE)', icon: Code },
];

const goals = [
  { id: 'internship', label: 'Crack Internship' },
  { id: 'portfolio', label: 'Build Portfolio' },
  { id: 'skills', label: 'Learn New Skills' },
  { id: 'money', label: 'Earn Money' },
  { id: 'startup', label: 'Startup Building' },
];

const levels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    role: 'builder' as UserRole,
    domains: [] as string[],
    experienceLevel: 'Beginner' as ExperienceLevel,
    collegeName: '',
    location: { city: '', country: 'India' },
    goals: [] as string[]
  });

  const toggleItem = (field: 'domains' | 'goals', id: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(id) 
        ? prev[field].filter(d => d !== id) 
        : [...prev[field], id]
    }));
  };

  const handleFinish = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await completeOnboarding(user.uid, formData);
      toast({ title: "Profile Ready!", description: "Welcome to the builder community." });
      router.push('/feed');
    } catch (error) {
      toast({ title: "Error saving profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto space-y-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4 px-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-4">
          <Sparkles className="w-4 h-4" /> Personal Brand Matters
        </div>
        <h1 className="text-4xl font-headline font-bold">Let's build your showcase</h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          This helps recruiters know about your potential so you can get internships easily.
        </p>
      </div>

      <div className="relative px-4">
        {step === 1 && (
          <Card className="glass-card border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <div className="h-2 bg-primary/10 w-full"><div className="h-full bg-primary w-1/4 transition-all duration-500" /></div>
            <CardContent className="p-8 md:p-12 space-y-8">
              <h3 className="text-2xl font-bold text-center">Pick what describes you best</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setFormData({ ...formData, role: role.id })}
                    className={cn(
                      "flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all gap-3",
                      formData.role === role.id 
                        ? "border-primary bg-primary/5 shadow-inner" 
                        : "border-muted hover:border-primary/20 bg-white"
                    )}
                  >
                    <role.icon className={cn("w-8 h-8", formData.role === role.id ? "text-primary" : "text-muted-foreground")} />
                    <div>
                      <p className="font-bold">{role.label}</p>
                      <p className="text-[10px] text-muted-foreground">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(2)} className="w-full h-14 rounded-full font-bold action-button-glow">
                Next Step <ChevronRight className="ml-2 w-4 h-4"/>
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="glass-card border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <div className="h-2 bg-primary/10 w-full"><div className="h-full bg-primary w-2/4 transition-all duration-500" /></div>
            <CardContent className="p-8 md:p-12 space-y-8">
              <h3 className="text-2xl font-bold text-center">Your Domains & Level</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => toggleItem('domains', domain.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-full border-2 font-bold transition-all text-sm",
                      formData.domains.includes(domain.id)
                        ? "bg-primary text-white border-primary shadow-lg"
                        : "bg-white text-muted-foreground border-muted hover:border-primary/40"
                    )}
                  >
                    <domain.icon className="w-4 h-4" />
                    {domain.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <Label className="text-center block font-bold">Experience Level</Label>
                <div className="flex justify-center gap-4">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, experienceLevel: level })}
                      className={cn(
                        "px-6 py-2 rounded-full border text-xs font-bold transition-all",
                        formData.experienceLevel === level 
                          ? "bg-secondary text-white border-secondary shadow-md" 
                          : "bg-muted/50 text-muted-foreground border-transparent"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={() => setStep(3)} disabled={formData.domains.length === 0} className="w-full h-14 rounded-full font-bold action-button-glow">
                Almost there <ChevronRight className="ml-2 w-4 h-4"/>
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="glass-card border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <div className="h-2 bg-primary/10 w-full"><div className="h-full bg-primary w-3/4 transition-all duration-500" /></div>
            <CardContent className="p-8 md:p-12 space-y-8">
              <h3 className="text-2xl font-bold text-center">What is your current goal?</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleItem('goals', goal.id)}
                    className={cn(
                      "px-6 py-3 rounded-full border-2 font-bold transition-all text-sm",
                      formData.goals.includes(goal.id)
                        ? "bg-primary text-white border-primary shadow-lg"
                        : "bg-white text-muted-foreground border-muted hover:border-primary/40"
                    )}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(4)} disabled={formData.goals.length === 0} className="w-full h-14 rounded-full font-bold action-button-glow">
                Final Step <ChevronRight className="ml-2 w-4 h-4"/>
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="glass-card border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
            <div className="h-2 bg-primary/10 w-full"><div className="h-full bg-primary w-full transition-all duration-500" /></div>
            <CardContent className="p-8 md:p-12 space-y-6">
              <h3 className="text-2xl font-bold text-center">Identity Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>College/University</Label>
                  <Input 
                    placeholder="e.g. IIT Delhi" 
                    className="rounded-xl h-12"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>City</Label><Input placeholder="Bangalore" className="rounded-xl h-12" value={formData.location.city} onChange={(e) => setFormData({...formData, location: {...formData.location, city: e.target.value}})}/></div>
                  <div className="space-y-2"><Label>Country</Label><Input className="rounded-xl h-12" value={formData.location.country} onChange={(e) => setFormData({...formData, location: {...formData.location, country: e.target.value}})}/></div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <Button onClick={handleFinish} disabled={loading || !formData.collegeName} className="h-14 rounded-full font-bold action-button-glow w-full">
                  {loading ? 'Finalizing...' : 'Start Building'} <Rocket className="ml-2 w-4 h-4"/>
                </Button>
                <Button onClick={handleFinish} variant="ghost" className="text-muted-foreground font-bold">Skip for now</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
