"use client";

import { useState, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Command, CommandGroup, CommandItem, CommandList, CommandInput } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder, className }: MultiSelectProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
  
    const handleUnselect = useCallback((item: string) => {
      onChange(selected.filter((s) => s !== item));
    }, [selected, onChange]);
  
    const handleSelect = useCallback((item: string) => {
      setInputValue("");
      onChange([...selected, item]);
    }, [selected, onChange]);
  
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Backspace' && input.value === "" && selected.length > 0) {
          handleUnselect(selected[selected.length - 1]);
        }
      }
    }, [handleUnselect, selected]);
    
    const filteredOptions = options.filter(option => !selected.includes(option));
  
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className={`${className} group rounded-xl border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}>
                    <div className="flex flex-wrap gap-2">
                        {selected.map(item => (
                            <Badge key={item} variant="secondary" className="rounded-lg px-3 py-1 font-bold text-sm bg-primary/10 text-primary border-none">
                                {item}
                                <button
                                    className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-3 w-3 text-primary hover:text-foreground" />
                                </button>
                            </Badge>
                        ))}
                        <input 
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={selected.length > 0 ? '' : placeholder}
                            className="ml-2 flex-1 bg-transparent p-0 outline-none placeholder:text-muted-foreground focus:ring-0"
                        />
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command onKeyDown={handleKeyDown}>
                    <CommandInput 
                        placeholder="Search..."
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <CommandList>
                        <CommandGroup heading={filteredOptions.length ? "Suggestions" : undefined}>
                            {filteredOptions.map((option) => (
                                <CommandItem
                                    key={option}
                                    onSelect={() => handleSelect(option)}
                                >
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        {inputValue && !options.includes(inputValue) && (
                            <CommandGroup heading="Add a new sector">
                                <CommandItem
                                    onSelect={() => handleSelect(inputValue)}
                                >
                                    Add "{inputValue}"
                                </CommandItem>
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
