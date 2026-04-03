"use client";

import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProjectWorkspace } from '../../types';

interface ProjectCardProps {
  project: ProjectWorkspace;
  showStats?: boolean;
}

export function ProjectCard({ project, showStats = true }: ProjectCardProps) {
  const owner = project.team.find(m => m.userId === project.ownerId);

  return (
    <Card className="glass-card overflow-hidden group border-none shadow-md hover:shadow-2xl transition-all duration-500 bg-white w-full h-full flex flex-col">
      {/* Author Header */}
      <div className="p-3 flex items-center justify-between border-b border-muted/50 bg-muted/10">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-primary/10">
            <AvatarImage src={owner?.avatarUrl} />
            <AvatarFallback>{project.title[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-[11px] font-bold leading-none truncate">{owner?.name}</p>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter mt-0.5">Builder</p>
          </div>
        </div>
        {project.isVerified && (
          <ShieldCheck className="w-4 h-4 text-primary fill-primary text-white" />
        )}
      </div>

      <Link href={`/projects/${project.id}`} className="flex-1 flex flex-col">
        <div className="aspect-video w-full bg-muted relative overflow-hidden">
          <img 
            src={project.coverImageUrl || "https://picsum.photos/seed/project/800/450"} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3">
             <Badge variant={project.status === 'Building' ? 'default' : 'secondary'} className="text-[8px] h-4 bg-white/20 backdrop-blur-md border-none text-white">
              {project.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="px-5 py-5 space-y-2 flex-1">
          <h3 className="text-lg font-headline font-bold group-hover:text-primary transition-colors leading-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="text-[11px] font-bold text-primary/80 italic leading-relaxed line-clamp-1">"{project.tagline}"</p>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </Link>

      {showStats && (
        <CardContent className="p-5 pt-0 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-primary" /> Momentum</span>
              <span className="text-primary">{project.stats.momentum}%</span>
            </div>
            <Progress value={project.stats.momentum} className="h-1.5" />
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex -space-x-1.5">
              {project.team.slice(0, 3).map((member, i) => (
                <Avatar key={i} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>{project.stats.memberCount}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{project.stats.updateCount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
