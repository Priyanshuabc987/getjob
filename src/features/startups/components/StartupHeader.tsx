
"use client";

import { Button } from "@/components/ui/button";
import { StartupProfile } from "@/features/startups/types";
import { formatTeamSize } from "@/features/startups/utils";
import { Pencil, Building, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function StartupHeader({
  startup,
  isFounder,
}: {
  startup: StartupProfile;
  isFounder: boolean;
}) {
  const location = [startup.city, startup.country].filter(Boolean).join(', ');
  const teamSizeDisplay = formatTeamSize(startup.teamSizeMin, startup.teamSizeMax);
  return (
    <div className="relative pt-4 md:pt-6 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "h-48 md:h-64 w-full rounded-2xl md:rounded-[2.5rem] relative overflow-hidden shadow-sm",
          !startup.coverImage && "bg-gradient-to-r from-primary to-secondary"
        )}
      >
        {startup.coverImage && (
          <Image
            src={startup.coverImage}
            alt={`${startup.name} cover image`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 md:px-5 md:py-2.5 rounded-[1.2rem] md:rounded-[1.5rem] flex flex-col items-center shadow-2xl z-20">
          {/* <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Stage</span> */}
          <span className="text-base md:text-xl font-headline font-bold text-white">{startup.stage.toUpperCase()}</span>
        </div>
      </div>

      <div className="px-4 md:px-12 relative z-10 -mt-24 md:-mt-12">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
          <div className="w-40 h-40 md:w-40 md:h-40 rounded-2xl p-2 md:p-3 bg-card shadow-2xl shrink-0 border-4 ">
          <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover rounded-2xl " />
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-2 md:pb-0">
            <div className="space-y-1 md:space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-headline font-bold text-foreground flex items-center gap-2 md:gap-3">
                  {startup.name}
                </h1>
                {isFounder && (
                  <Link href={`/startups/${startup.slug}/edit/basics`}>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
              <p className="text-primary font-bold text-xs md:text-base">{startup.tagline}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground font-bold text-xs pt-2">
                    {location && <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {location}
                    </div>}
                    {teamSizeDisplay && <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary" /> {teamSizeDisplay} members
                    </div>}
                     {startup.sector?.length > 0 && <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-primary" />
                        {startup.sector.join(", ")}
                    </div>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
