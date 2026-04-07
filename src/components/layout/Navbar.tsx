"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BriefcaseBusiness, 
  MessageSquare,
  PlusSquare, 
  Users, 
  User, 
  Zap, 
  Lightbulb, 
  Calendar,
  LogIn,
  LayoutGrid,
  Sun,
  Moon,
  ChevronRight,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/features/auth/hooks';
import { useState, useEffect } from 'react';
import { APP_NAME } from '@/lib/constants';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getStartupsForUser } from '@/features/mystartups/actions/read';
import { Startup } from '@/features/startups/types';

const mainNavItems = [
  { icon: Home, label: 'Feed', href: '/feed' },
  { icon: BriefcaseBusiness, label: 'Jobs', href: '/jobs' },
  { icon: PlusSquare, label: 'Projects', href: '/projects' },
  { icon: Users, label: 'Startups', href: '/startups' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Lightbulb, label: 'Problems', href: '/problems' },
  // { icon: MessageSquare, label: 'Discussion', href: '/discussion' },
];

export function Navbar({ showSidebar = true }: { showSidebar?: boolean }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userStartups, setUserStartups] = useState<Startup[]>([]);
  const [isStartupsOpen, setIsStartupsOpen] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    async function fetchStartups() {
      if (user) {
        const startups = await getStartupsForUser(user.uid);
        setUserStartups(startups);
      }
    }
    fetchStartups();
  }, [user]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const workspaceNavItems = [
    { icon: LayoutGrid, label: 'My Workspace', href: '/workspace' },
    { icon: User, label: 'My Profile', href: user ? `/profile/${user.uid}` : '/profile' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-card/80 backdrop-blur-lg h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary hidden sm:block">{APP_NAME}</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {!user ? (
              <Link href="/login">
                <Button variant="ghost" className="rounded-full gap-2 font-bold text-sm">
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
              </Link>
            ) : (
              <Link href={`/profile/${user.uid}`} className="flex items-center gap-3 group">
                <span className="text-xs font-bold text-muted-foreground hidden md:block group-hover:text-primary transition-colors">
                  {user.displayName?.split(' ')[0]}
                </span>
                <div className="w-9 h-9 rounded-full bg-accent dark:bg-muted border-2 border-primary/10 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src={user.photoURL || "https://picsum.photos/seed/user/100/100"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      {showSidebar && (
        <aside className="fixed left-0 top-16 bottom-0 w-64 hidden md:flex flex-col border-r bg-white dark:bg-card p-4 space-y-6 overflow-y-auto z-40">
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
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <Separator className="my-6" />

            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4"> Workspace</p>
            <div className="space-y-1">
              {workspaceNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </Link>
                );
              })}

              {user && userStartups.length > 0 && (
                <Collapsible open={isStartupsOpen} onOpenChange={setIsStartupsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-muted-foreground hover:bg-muted/50 hover:text-primary">
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5" />
                        <span className="text-sm font-bold">My Startups</span>
                      </div>
                      <ChevronRight className={cn("w-4 h-4 transition-transform", isStartupsOpen && "rotate-90")} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pt-1">
                    {userStartups.map(startup => (
                      <Link key={startup.id} href={`/startups/${startup.slug}`} className='flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-muted-foreground hover:bg-muted/50 hover:text-primary'>
                         <span className="text-sm font-bold ml-8">{startup.name}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

               <Link 
                href={'/startups/create'}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-muted-foreground hover:bg-muted/50 hover:text-primary"
                )}
              >
                <PlusSquare className="w-5 h-5" />
                <span className="text-sm font-bold">Create a Startup</span>
              </Link>
            </div>
          </div>
        </aside>
      )}

      {/* Bottom Nav - Mobile */}
      {showSidebar && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-card/80 backdrop-blur-lg border-t flex md:hidden items-center justify-around z-50 px-2 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          {[
            { icon: Home, label: 'Feed', href: '/feed' },
            { icon: BriefcaseBusiness, label: 'Jobs', href: '/jobs' },
            { icon: PlusSquare, label: 'Projects', href: '/projects' },
            { icon: Lightbulb, label: 'Problems', href: '/problems' },
            { icon: User, label: 'Profile', href: user ? `/profile/${user.uid}` : '/profile' },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "fill-primary/10")} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
