"use client";

import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-primary">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The first proof-of-work ecosystem for builders. Turn your coding habits into a verified professional portfolio.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/feed" className="text-sm text-muted-foreground hover:text-primary transition-colors">Global Feed</Link></li>
              <li><Link href="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Micro-Jobs</Link></li>
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Projects</Link></li>
              <li><Link href="/startups" className="text-sm text-muted-foreground hover:text-primary transition-colors">Startup Hub</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">Community</h4>
            <ul className="space-y-2">
              <li><Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hackathons</Link></li>
              <li><Link href="/problems" className="text-sm text-muted-foreground hover:text-primary transition-colors">Open Challenges</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Builder Guidelines</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Discord Server</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">Stay Updated</h4>
            <p className="text-xs text-muted-foreground">Join 2,000+ builders receiving our weekly alpha on startups and opportunities.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="builder@email.com" 
                className="flex-1 px-4 py-2 bg-muted dark:bg-muted/50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            © 2024 {APP_NAME} Engine. Built for the next generation of builders.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest">Privacy Policy</Link>
            <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest">Terms of Work</Link>
            <div className="flex items-center gap-2 text-primary">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">hello@preplinc.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
