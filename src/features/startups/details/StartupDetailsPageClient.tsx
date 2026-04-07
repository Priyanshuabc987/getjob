
"use client";

import { StartupProfile } from "@/features/startups/types";
import { projectWorkspaces } from "@/lib/mock-data";
import { LayoutGrid, Mail, Building, Edit3 } from "lucide-react";
import Link from "next/link";
import { StartupProjects } from "@/features/startups/details/components/StartupProjects";
import { ContactCard } from "@/features/startups/details/components/ContactCard";
import { FounderCard } from "@/features/users/components/FounderCard";
import { FounderProfile } from "@/features/users/types";
import { StartupHeader } from "../components/StartupHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function StartupDetailsPageClient({ startup, founder, isFounder }: { startup: StartupProfile, founder: FounderProfile, isFounder: boolean }) {
  const startupProjects = projectWorkspaces.slice(0, startup.projectsCount);

  return (
    <div className="space-y-4 md:space-y-8 pb-20 bg-background min-h-screen">
      <StartupHeader startup={startup} isFounder={isFounder} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
        {/* Left Sidebar - About & Founder */}
        <aside className="space-y-6 md:space-y-8">
          <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-card p-6 md:p-8 group relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-lg font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Building className="w-4 h-4 text-secondary" />
                </div>
                About Venture
              </h3>
              {isFounder && (
                <Link href={`/startups/${startup.slug}/edit/about`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Edit3 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </Button>
                </Link>
              )}
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              {startup.description ? (
                startup.description
              ) : isFounder ? (
                <p className="italic">Tell the world about your mission. What problem are you solving? Why now? Go into more detail here.</p>
              ) : (
                <p className="italic">This venture has not shared its mission yet.</p>
              )}
            </div>
          </Card>

          <FounderCard founder={founder} />
        </aside>

        {/* Main Content - Projects & Contact */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-card p-1.5 md:p-2 rounded-2xl md:rounded-[2rem] w-full h-auto mb-3 md:mb-6 shadow-sm flex border border-muted/20">
              <TabsTrigger value="projects" className="flex-1 rounded-xl md:rounded-[1.5rem] py-3 md:py-4 gap-2 md:gap-3 font-bold text-xs md:text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <LayoutGrid className="w-4 h-4" /> Projects
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex-1 rounded-xl md:rounded-[1.5rem] py-3 md:py-4 gap-2 md:gap-3 font-bold text-xs md:text-sm data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all duration-300">
                <Mail className="w-4 h-4" /> Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6 md:space-y-8 outline-none pt-2">
              <StartupProjects projects={startupProjects} isFounder={isFounder} startupSlug={startup.slug} />
            </TabsContent>
            
            <TabsContent value="contact" className="outline-none pt-2">
               <ContactCard startup={startup} isFounder={isFounder} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
