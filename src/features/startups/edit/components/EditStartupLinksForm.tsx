
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateStartupLinks } from '@/features/startups/actions/update';
import { StartupProfile } from '@/features/startups/types';
import { useToast } from '@/hooks/use-toast';

export function EditStartupLinksForm({ startup }: { startup: StartupProfile }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
      websiteUrl: startup.websiteUrl || '', 
      linkedinUrl: startup.linkedinUrl || ''
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('websiteUrl', formData.websiteUrl);
    form.append('linkedinUrl', formData.linkedinUrl);

    const result = await updateStartupLinks(startup.id, null, form);

    if (result.success) {
        toast({ title: "Links Saved!", description: "Your startup's contact links have been updated." });
        router.push(`/startups/${result.startupSlug}`);
    } else {
      toast({ variant: "destructive", title: "Update Failed", description: result.message });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
        <div className="space-y-4">
            <div>
              <Label htmlFor="websiteUrl" className="text-[10px] uppercase font-bold text-muted-foreground">Website</Label>
              <Input id="websiteUrl" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} className="text-lg" />
            </div>
            <div>
              <Label htmlFor="linkedinUrl" className="text-[10px] uppercase font-bold text-muted-foreground">LinkedIn</Label>
              <Input id="linkedinUrl" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className="text-lg"/>
            </div>
        </div>

        <div className="pt-6">
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg action-button-glow">
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                Update Links
            </Button>
        </div>
    </form>
  );
}
