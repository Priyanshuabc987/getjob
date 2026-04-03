
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Trash2 } from 'lucide-react';
import { EducationEntry } from '../types';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface EducationFormProps {
  entry: Partial<EducationEntry>;
  onSave: (entry: Partial<EducationEntry>) => void;
  onDelete?: () => void;
  onCancel: () => void;
  loading: boolean;
  deleting: boolean;
}

export default function EducationForm({ entry, onSave, onDelete, onCancel, loading, deleting }: EducationFormProps) {
  const [form, setForm] = useState({
    school: entry.school || '',
    degree: entry.degree || '',
    startYear: entry.startYear || '',
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
            <Label htmlFor="school">School or University</Label>
            <Input id="school" name="school" placeholder="e.g. Stanford University" value={form.school} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree">Degree or Field of Study</Label>
            <Input id="degree" name="degree" placeholder="e.g. Computer Science" value={form.degree} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="startYear">Start Date</Label>
            <Input id="startYear" type="date" name="startYear" value={form.startYear} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" name="endDate" value={form.endDate} onChange={handleChange} disabled={form.isCurrent} />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="isCurrentEdu" checked={form.isCurrent} onCheckedChange={handleCheckboxChange} />
          <label htmlFor="isCurrentEdu" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">I currently study here</label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Describe your studies and achievements." value={form.description} onChange={handleChange} className="min-h-[120px]" />
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
