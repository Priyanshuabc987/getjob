"use client";

import { Navbar } from '@/components/layout/Navbar';
import { microInternships } from '@/lib/mock-data';
import { Search, Filter, Clock, CreditCard, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64 pt-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-headline mb-2">Task Marketplace</h1>
            <p className="text-muted-foreground">Real tasks from real startups. Earn money & experience.</p>
          </div>
          <Button size="lg" className="rounded-full gap-2 action-button-glow font-bold">
            <Zap className="w-4 h-4 fill-current" /> Post a Task
          </Button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by skill, company, or category..." 
              className="pl-10 rounded-full bg-white border-none shadow-sm h-12"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Button variant="outline" className="rounded-full bg-white border-none shadow-sm gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="outline" className="rounded-full bg-white border-none shadow-sm whitespace-nowrap">Engineering</Button>
            <Button variant="outline" className="rounded-full bg-white border-none shadow-sm whitespace-nowrap">Design</Button>
            <Button variant="outline" className="rounded-full bg-white border-none shadow-sm whitespace-nowrap">Marketing</Button>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {microInternships.map((task) => (
            <Card key={task.id} className="glass-card flex flex-col hover:translate-y-[-4px] transition-all duration-300">
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <img src={`https://picsum.photos/seed/${task.id}/100/100`} alt={task.company} className="w-8 h-8 rounded-lg" />
                  </div>
                  <Badge variant="secondary" className="font-bold">NEW</Badge>
                </div>
                <h3 className="text-xl font-headline mb-1 leading-tight">{task.title}</h3>
                <p className="text-sm font-medium text-primary mb-3">{task.company}</p>
                <div className="flex flex-wrap gap-2">
                  {task.skills.map(skill => (
                    <span key={skill} className="text-[10px] font-bold uppercase tracking-wider bg-accent/50 px-2 py-0.5 rounded text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                  {task.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tight">Reward</p>
                      <p className="text-sm font-bold text-foreground">{task.payment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tight">Time</p>
                      <p className="text-sm font-bold text-foreground">{task.timeRequired}</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full rounded-full gap-2 group shadow-lg shadow-primary/20">
                  Quick Apply <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}