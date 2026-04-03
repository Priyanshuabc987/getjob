
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Trash2 } from 'lucide-react';
import { ExperienceEntry } from '../types';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface ExperienceFormProps {
  entry: Partial<ExperienceEntry>;
  onSave: (entry: Partial<ExperienceEntry>) => void;
  onDelete?: () => void;
  onCancel: () => void;
  loading: boolean;
  deleting: boolean;
}

export default function ExperienceForm({ entry, onSave, onDelete, onCancel, loading, deleting }: ExperienceFormProps) {
  const [form, setForm] = useState({
    company: entry.company || '',
    role: entry.role || '',
    startDate: entry.startDate || '',
    endDate: entry.endDate || '',
    description: entry.description || '',
    isCurrent: !!entry.isCurrent,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setForm(prev => ({ ...prev, isCurrent: checked, endDate: checked ? '' : prev.endDate }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="role">Role / Title</Label>
            <Input id="role" name="role" placeholder="e.g. Software Engineer" value={form.role} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" placeholder="e.g. Google" value={form.company} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" name="endDate" value={form.endDate} onChange={handleChange} disabled={form.isCurrent} />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="isCurrentExp" checked={form.isCurrent} onCheckedChange={handleCheckboxChange} />
          <label htmlFor="isCurrentExp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">I currently work here</label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Describe your role and achievements." value={form.description} onChange={handleChange} className="min-h-[120px]" />
        </div>
      </CardContent>
      <CardFooter className="p-6 flex justify-between bg-card-footer">
        <div>
          {onDelete && (
            <Button type="button" variant="destructive" onClick={onDelete} disabled={deleting}>
              {deleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={loading} className="action-button-glow font-bold">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Save
          </Button>
        </div>
      </CardFooter>
    </form>
  );
}
