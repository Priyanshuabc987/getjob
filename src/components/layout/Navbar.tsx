"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, PlusSquare, Users, User, Search, MessageSquare, Zap, Lightbulb, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Feed', href: '/' },
  { icon: PlusSquare, label: 'Projects', href: '/projects' },
  { icon: Briefcase, label: 'Opportunities', href: '/opportunities' },
  { icon: Users, label: 'Startups', href: '/network' },
  { icon: Lightbulb, label: 'Problems', href: '/problems' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary hidden sm:block">PrepLinc</span>
          </Link>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Find proof-of-work..." 
                className="w-full bg-[#F4F3F8] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Link href="/profile" className="w-9 h-9 rounded-full bg-accent border-2 border-primary/10 overflow-hidden hover:scale-105 transition-transform">
               <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Nav - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.slice(0, 5).map((item) => {
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
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <nav className="fixed left-0 top-16 bottom-0 w-64 hidden md:flex flex-col border-r bg-white p-4 space-y-6 overflow-y-auto">
        <div className="px-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Workspace</p>
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
                      : "text-muted-foreground hover:bg-[#F4F3F8] hover:text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-bold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="px-4 mt-auto">
          <div className="bg-[#F4F3F8] p-5 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Credibility</p>
              <TrendingUp className="w-3 h-3 text-primary" />
            </div>
            <div className="text-3xl font-headline font-bold text-primary">85</div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '85%' }} />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium italic">Top 15% of builders this month</p>
          </div>
          <Button variant="outline" className="w-full rounded-2xl gap-2 mt-4 border-primary/20 hover:bg-primary/5 text-primary font-bold h-12">
            <PlusSquare className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </nav>
    </>
  );
}
