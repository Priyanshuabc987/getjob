"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: Date | undefined | 'Present') => void;
  placeholder?: string;
  className?: string;
  showPresentButton?: boolean;
}

export function DatePicker({ value, onChange, placeholder, className, showPresentButton = false }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const toDate = (dateStr: string | Date | undefined): Date | undefined => {
    if (!dateStr || dateStr === 'Present') return undefined;
    if (dateStr instanceof Date) return dateStr;
    if (typeof dateStr !== 'string') return undefined;
    
    const [month, year] = dateStr.split('/').map(Number);
    if (month && year && year > 1000) {
      const d = new Date(year, month - 1);
      if (!isNaN(d.getTime())) return d;
    }
    return undefined;
  }

  const dateValue = typeof value === 'string' ? toDate(value) : value instanceof Date ? value : undefined;

  // Initialize from dateValue, or current date if no value
  const [viewMonth, setViewMonth] = React.useState<Date>(
    dateValue ?? new Date()
  );

  // Sync viewMonth when value prop changes externally
  React.useEffect(() => {
    const newDate = typeof value === 'string' ? toDate(value) : value instanceof Date ? value : undefined;
    if (newDate) {
      setViewMonth(newDate);
    }
  }, [value]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 71 }, (_, i) => currentYear - 50 + i).reverse();

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(viewMonth.getFullYear(), parseInt(e.target.value), 1);
    setViewMonth(newMonth);
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = new Date(parseInt(e.target.value), viewMonth.getMonth(), 1);
    setViewMonth(newYear);
  };

  const handleSelect = (date?: Date) => {
    if (date) {
      setViewMonth(date);
    }
    onChange?.(date);
    setOpen(false);
  };

  const handlePresentClick = () => {
    onChange?.('Present');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value === 'Present'
            ? 'Present'
            : dateValue
              ? format(dateValue, "MMM yyyy")
              : <span>{placeholder || "Pick a date"}</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 z-[200]" 
        align="start"
      >
        <div className="flex justify-between items-center gap-2 px-4 pt-4 mb-2">
          <select
            className="border rounded-md px-2 py-1 text-sm bg-background cursor-pointer"
            value={viewMonth.getMonth()}
            onChange={handleMonthSelect}
          >
            {months.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
          <select
            className="border rounded-md px-2 py-1 text-sm bg-background cursor-pointer"
            value={viewMonth.getFullYear()}
            onChange={handleYearSelect}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <Calendar
          mode="single"
          selected={dateValue}
          month={viewMonth}                      
          onMonthChange={setViewMonth}           
          onSelect={handleSelect}
          initialFocus
          classNames={{
            caption_label: 'hidden',
            nav_button_next: 'hidden',
            nav_button_previous: 'hidden',
          }}
        />
        {showPresentButton && (
          <div className="p-2 border-t">
            <Button variant="ghost" className="w-full" onClick={handlePresentClick}>
              Set as &quot;Present&quot;
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
