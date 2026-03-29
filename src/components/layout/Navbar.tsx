"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  PlusSquare, 
  Users, 
  User, 
  Search, 
  MessageSquare, 
  Zap, 
  Lightbulb, 
  Calendar,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Feed', href: '/' },
  { icon: PlusSquare, label: 'Projects', href: '/projects' },
  { icon: Briefcase, label: 'Jobs', href: '/jobs' },
  { icon: Users, label: 'Startups', href: '/network' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Lightbulb, label: 'Problems', href: '/problems' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary hidden sm:block">PrepLinc</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full gap-2 font-bold text-sm">
                <LogIn className="w-4 h-4" /> Sign In
              </Button>
            </Link>
            <Link href="/profile" className="w-9 h-9 rounded-full bg-accent border-2 border-primary/10 overflow-hidden hover:scale-105 transition-transform hidden sm:block">
               <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
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
      </nav>
    </>
  );
}
