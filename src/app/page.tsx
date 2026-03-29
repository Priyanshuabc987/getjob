
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, ShieldCheck, TrendingUp, ArrowRight, Rocket } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">PrepLinc</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-bold text-sm">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="rounded-full px-6 font-bold text-sm action-button-glow">Join Platform</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-4 animate-bounce">
            <Rocket className="w-4 h-4" /> Build your proof-of-work
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tight leading-none">
            Stop claiming.<br />
            <span className="text-primary">Start proving.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The student-first workspace where real work becomes your verified portfolio. No resumes, just proof.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/jobs">
              <Button className="rounded-full px-10 h-16 text-lg font-bold action-button-glow w-full sm:w-auto">
                Explore Jobs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-primary/20 text-primary w-full sm:w-auto">
                View Projects
              </Button>
            </Link>
          </div>

          {/* Stats/Proof Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
            {[
              { icon: ShieldCheck, label: "Verified Work", desc: "Every task is backed by proof links and timestamps." },
              { icon: TrendingUp, label: "Credibility Score", desc: "Build your reputation as a builder, not just a candidate." },
              { icon: Zap, label: "Micro-Internships", desc: "Short-term, high-impact tasks from real startups." }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] text-left border-none shadow-xl hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-medium">© 2024 PrepLinc Engine. Built for the next generation of builders.</p>
        </div>
      </footer>
    </div>
  );
}
