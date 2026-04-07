
import { Button } from "@/components/ui/button";
import { StartupProfile } from "@/features/startups/types";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function StartupHeader({
  startup,
  isFounder,
}: {
  startup: StartupProfile;
  isFounder: boolean;
}) {
  const location = [startup.city, startup.country].filter(Boolean).join(', ');

  return (
    <div className="w-full">
      <div className="relative w-full h-48 md:h-64 rounded-t-3xl bg-gray-200">
        {startup.coverImage && (
          <Image
            src={startup.coverImage}
            alt={`${startup.name} cover image`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-3xl"
          />
        )}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
          <span className="text-xl md:text-3xl font-headline font-bold text-white">
            {startup.stage.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start p-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32 -mt-16 md:-mt-20 flex-shrink-0">
          <Image
            src={startup.logo || "/images/placeholder.png"}
            alt={`${startup.name} logo`}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-white"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-4xl font-headline font-bold">
              {startup.name}
            </h1>
            {isFounder && (
              <Link href={`/startups/${startup.slug}/edit/basics`}>
                <Button variant="outline" size="icon" className="ml-4">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            {startup.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <p className="text-sm text-muted-foreground">
              {location}
            </p>
            <p className="text-sm text-muted-foreground">
              {startup.sector.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
