
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  PlusSquare, 
  Users, 
  User, 
  Zap, 
  Lightbulb, 
  Calendar,
  LogIn,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/features/auth/hooks';

const mainNavItems = [
  { icon: Home, label: 'Feed', href: '/feed' },
  { icon: PlusSquare, label: 'Projects', href: '/projects' },
  { icon: Briefcase, label: 'Jobs', href: '/jobs' },
  { icon: Users, label: 'Startups', href: '/startups' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Lightbulb, label: 'Problems', href: '/problems' },
];

const workspaceNavItems = [
  { icon: LayoutGrid, label: 'My Workspace', href: '/projects/my' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Navbar({ showSidebar = true }: { showSidebar?: boolean }) {
  const pathname = usePathname();
  const { user } = useAuth();

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
            {!user ? (
              <Link href="/login">
                <Button variant="ghost" className="rounded-full gap-2 font-bold text-sm">
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
              </Link>
            ) : (
              <Link href="/profile" className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground hidden md:block">Hi, {user.displayName?.split(' ')[0]}</span>
                <div className="w-9 h-9 rounded-full bg-accent border-2 border-primary/10 overflow-hidden hover:scale-105 transition-transform">
                  <img src={user.photoURL || "https://picsum.photos/seed/user/100/100"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      {showSidebar && (
        <aside className="fixed left-0 top-16 bottom-0 w-64 hidden md:flex flex-col border-r bg-white p-4 space-y-6 overflow-y-auto z-40">
          <div className="px-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Ecosystem</p>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
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

            <Separator className="my-6" />

            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Your Workspace</p>
            <div className="space-y-1">
              {workspaceNavItems.map((item) => {
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
        </aside>
      )}

      {/* Bottom Nav - Mobile */}
      {showSidebar && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex md:hidden items-center justify-around z-50 px-2 pb-safe">
          {[
            { icon: Home, label: 'Feed', href: '/feed' },
            { icon: Briefcase, label: 'Jobs', href: '/jobs' },
            { icon: PlusSquare, label: 'Projects', href: '/projects' },
            { icon: User, label: 'Profile', href: '/profile' },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
