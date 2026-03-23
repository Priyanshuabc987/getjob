"use client";

import { Navbar } from '@/components/layout/Navbar';
import { opportunities } from '@/lib/mock-data';
import { Search, Filter, Clock, CreditCard, ChevronRight, Zap, Building2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Target className="w-4 h-4" /> Micro-Internships Marketplace
          </div>
          <h1 className="text-4xl font-headline font-bold mb-4">Earn While You Build</h1>
          <p className="text-lg text-muted-foreground">Short-term, 3-14 day high-impact tasks from real startups. Prove your skills and get paid.</p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by skill (e.g. React, UI Design)..." 
              className="pl-12 rounded-2xl bg-white border-none shadow-sm h-14 text-sm"
            />
          </div>
          <Button variant="outline" className="h-14 px-6 rounded-2xl bg-white border-none shadow-sm gap-2">
            <Filter className="w-4 h-4" /> Categories
          </Button>
        </div>

        {/* Opportunities Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="glass-card flex flex-col group hover:shadow-2xl transition-all duration-500 border-none">
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-muted group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-3">
                    {opp.status.toUpperCase()}
                  </Badge>
                </div>
                <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{opp.title}</h3>
                <p className="text-sm font-bold text-muted-foreground mb-4">{opp.startupName}</p>
                <div className="flex flex-wrap gap-2">
                  {opp.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="rounded-md font-medium text-[10px] bg-secondary/5 text-secondary border-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                  {opp.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Stipend</p>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-primary" />
                      <span className="text-sm font-bold">{opp.stipend}</span>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duration</p>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span className="text-sm font-bold">{opp.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full rounded-full h-12 gap-2 group action-button-glow font-bold">
                  Apply with Proof <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* New Opportunity Placeholder */}
          <Card className="border-2 border-dashed border-muted bg-transparent flex flex-col items-center justify-center p-8 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Zap className="w-8 h-8 text-muted group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-headline font-bold">Post an Opportunity</h3>
              <p className="text-sm text-muted-foreground">Are you a startup founder? Get help with specific tasks from top builders.</p>
            </div>
            <Button variant="outline" className="rounded-full px-8">Post Task</Button>
          </Card>
        </div>

        <div className="mt-16 text-center">
           <p className="text-sm text-muted-foreground font-medium italic opacity-60">
             Note: No resumes allowed. Startups pick students based on their Project Workspace activity.
           </p>
        </div>
      </main>
    </div>
  );
}