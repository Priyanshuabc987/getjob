
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { aiProjectCreationAssistant } from '@/ai/flows/ai-project-creation';

export default function CreateProjectForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    tags: '',
    githubUrl: '',
    demoUrl: '',
  });

  const handleAIExpand = async () => {
    if (!formData.title && !formData.description) {
      toast({ title: "Needs Info", description: "Provide a title or basic description for AI to help.", variant: "destructive" });
      return;
    }
    setAiLoading(true);
    try {
      const result = await aiProjectCreationAssistant({ 
        projectIdea: `${formData.title}: ${formData.description}` 
      });
      setFormData(prev => ({
        ...prev,
        description: result.articulatedIdea,
        tags: result.suggestedSkills.join(', ')
      }));
      toast({ title: "Roadmap Refined!", description: "AI has expanded your project details." });
    } catch (e) {
      toast({ title: "AI Error", description: "Could not reach the builder assistant.", variant: "destructive" });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Project Launched!", description: "Your new build is now active in the hub." });
      router.push('/workspace');
    }, 1500);
  };

  return (
    <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left mb-8">
            <p className="text-muted-foreground">Refine your project details with AI assistance.</p>
            <Button 
            variant="outline" 
            onClick={handleAIExpand}
            disabled={aiLoading}
            className="rounded-full gap-2 border-primary/20 text-primary hover:bg-primary/5 font-bold h-12 shadow-sm"
            >
            {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Refine with AI
            </Button>
        </div>
        <form onSubmit={handleSubmit}>
            <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-8 md:p-12 space-y-8">
                <div className="space-y-6 text-left">
                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Project Title <span className="text-destructive">*</span></Label>
                    <Input 
                    placeholder="e.g. PrepLinc Engine" 
                    className="rounded-xl h-12 text-lg font-bold"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tagline (One sentence impact) <span className="text-destructive">*</span></Label>
                    <Input 
                    placeholder="The proof-of-work layer for hiring..." 
                    className="rounded-xl h-12 italic"
                    value={formData.tagline}
                    onChange={e => setFormData({...formData, tagline: e.target.value})}
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description & Roadmap <span className="text-destructive">*</span></Label>
                    <Textarea 
                    placeholder="What are you building? Why does it matter?" 
                    className="rounded-2xl min-h-[200px] leading-relaxed"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stack / Tags (Comma separated)</Label>
                    <Input 
                    placeholder="React, Firebase, Genkit" 
                    className="rounded-xl h-12"
                    value={formData.tags}
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Github Repository URL</Label>
                    <Input 
                        placeholder="https://github.com/..." 
                        className="rounded-xl h-12"
                        value={formData.githubUrl}
                        onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live Demo URL</Label>
                    <Input 
                        placeholder="https://myproject.com" 
                        className="rounded-xl h-12"
                        value={formData.demoUrl}
                        onChange={e => setFormData({...formData, demoUrl: e.target.value})}
                    />
                    </div>
                </div>
                </div>

                <div className="pt-6">
                <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Rocket className="w-5 h-5 mr-2" />}
                    Launch Project
                </Button>
                </div>
            </CardContent>
            </Card>
        </form>
    </div>
  );
}
