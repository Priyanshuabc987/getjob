"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, PlusSquare, Users, User, Search, MessageSquare, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Feed', href: '/' },
  { icon: Briefcase, label: 'Tasks', href: '/tasks' },
  { icon: PlusSquare, label: 'Projects', href: '/projects' },
  { icon: Users, label: 'Network', href: '/network' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top Navbar - Desktop & Mobile Head */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary hidden sm:block">PrepLinc</span>
          </Link>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Find tasks, projects, startups..." 
                className="w-full bg-muted border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-accent border border-primary/10 overflow-hidden">
               <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Nav - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive && "fill-primary/10")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar - Desktop Only */}
      <nav className="fixed left-0 top-16 bottom-0 w-64 hidden md:flex flex-col border-r bg-background p-4 space-y-2 overflow-y-auto">
        <div className="mb-6 px-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Discovery</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="px-4 mt-auto border-t pt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your Stats</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-muted p-3 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Earnings</p>
              <p className="font-bold text-primary">₹12.4k</p>
            </div>
            <div className="bg-muted p-3 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Tasks</p>
              <p className="font-bold text-primary">42</p>
            </div>
          </div>
          <Button variant="outline" className="w-full rounded-xl gap-2 text-primary border-primary/20 hover:bg-primary/5">
            <PlusSquare className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </nav>
    </>
  );
}