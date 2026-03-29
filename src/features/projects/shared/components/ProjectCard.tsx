
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
    <Card className="glass-card overflow-hidden group border-none shadow-md hover:shadow-2xl transition-all duration-500 bg-white w-full max-w-2xl mx-auto">
      {/* Author Header */}
      <div className="p-4 flex items-center justify-between border-b border-muted/50">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary/10">
            <AvatarImage src={owner?.avatarUrl} />
            <AvatarFallback>{project.title[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold leading-none">{owner?.name}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Founding Builder</p>
          </div>
        </div>
        {project.isVerified && (
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <ShieldCheck className="w-3.5 h-3.5 fill-primary text-white" /> Verified
          </div>
        )}
      </div>

      <Link href={`/projects/${project.id}`}>
        <div className="px-5 py-5 space-y-3">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight">
              {project.title}
            </h3>
            <Badge variant={project.status === 'Building' ? 'default' : 'secondary'} className="text-[9px] h-5">
              {project.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm font-bold text-primary/80 italic leading-relaxed">{project.tagline}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="aspect-[16/9] w-full bg-muted relative border-y overflow-hidden">
          <img 
            src={project.coverImageUrl || "https://picsum.photos/seed/project/800/450"} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
        </div>
      </Link>

      {showStats && (
        <CardContent className="p-5 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-primary" /> Build Momentum</span>
              <span className="text-primary">{project.stats.momentum}%</span>
            </div>
            <Progress value={project.stats.momentum} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex -space-x-2">
              {project.team.slice(0, 3).map((member, i) => (
                <Avatar key={i} className="w-7 h-7 border-2 border-white">
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-muted border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold">{project.stats.memberCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-bold">{project.stats.updateCount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
