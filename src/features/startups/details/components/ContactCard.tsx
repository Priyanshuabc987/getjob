
import { StartupProfile } from '@/features/startups/types';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Rocket, ExternalLink, Zap, Pencil } from 'lucide-react';
import Link from 'next/link';

// A helper component for individual link buttons to keep the main component clean
const LinkButton = ({ href, icon: Icon, label, disabled }: { href?: string, icon: React.ElementType, label: string, disabled?: boolean }) => {
  const content = (
    <Button 
      variant="ghost" 
      className="w-full justify-between hover:bg-primary/5 rounded-xl h-12 text-muted-foreground hover:text-primary disabled:opacity-50"
      disabled={disabled}
    >
      <div className="flex items-center gap-3">
         <Icon className="w-5 h-5" />
         <span className="text-sm font-bold">{label}</span>
      </div>
      <ExternalLink className="w-4 h-4" />
    </Button>
  );

  if (disabled || !href) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
};


export function ContactCard({ startup, isFounder }: { startup: StartupProfile, isFounder: boolean }) {
  console.log("startup link",startup);
  const allLinks = [
    { label: 'Official Website', href: startup.websiteUrl, icon: Globe },
    { label: 'LinkedIn Page', href: startup.linkedinUrl, icon: Users },
    // Add other potential links here in the future
  ];

  const linksToDisplay = isFounder ? allLinks : allLinks.filter(link => !!link.href);

  return (
    <>
      {/* <Card className="glass-card bg-primary text-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap className="w-24 h-24" />
        </div>
        <CardContent className="p-8 space-y-6 relative z-10">
           <h3 className="font-headline text-2xl font-bold">Open Roles ({startup.openRolesCount})</h3>
           <div className="space-y-4">
             {startup.openRolesCount > 0 ? (
               <p className="text-sm text-white/80">This startup is looking for builders. Check their website for details.</p>
             ) : (
               <p className="text-sm text-white/60">No open roles currently.</p>
             )}
           </div>
           <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold shadow-xl asChild">
             <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer">Visit Website</a>
           </Button>
        </CardContent>
      </Card> */}

      <Card className="glass-card border-none shadow-lg bg-white rounded-[2.5rem]">
         <CardHeader className="p-3 px-10 pr-3 border-b flex flex-row items-center justify-between">
           <h3 className="font-headline text-lg font-bold">Contact & Links</h3>
           {isFounder && (
            <Link href={`/startups/${startup.slug}/edit/links`}>
                <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                </Button>
            </Link>
           )}
         </CardHeader>
         <CardContent className="p-8 space-y-4">
            {linksToDisplay.map(link => (
                <LinkButton 
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  disabled={!link.href}
                />
            ))}
         </CardContent>
      </Card>
    </>
  )
}
