
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, UserPlus } from 'lucide-react';
import { StartupProfile } from '../types';
import { Button } from '@/components/ui/button';
import { formatTeamSize } from '../utils';

interface StartupCardProps {
  startup: StartupProfile;
}

export function StartupCard({ startup }: StartupCardProps) {

  const teamSizeDisplay = formatTeamSize(startup.teamSizeMin, startup.teamSizeMax);

  return (
    <Link href={`/startups/${startup.slug}`} key={startup.id} className="block group">
      <Card className="glass-card overflow-hidden border-none shadow-xl bg-white h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-muted overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <Image src={startup.logo} alt={startup.name} width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-headline font-bold">{startup.name}</h3>
                <p className="text-primary font-bold text-sm">{startup.tagline}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-none rounded-lg text-[10px] font-bold">
                    {startup.stage.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
              <UserPlus className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
            {startup.description}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">{teamSizeDisplay} Builders</span>
            </div>
            {startup.openRolesCount > 0 && (
              <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold text-orange-600">{startup.openRolesCount} Roles Open</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
