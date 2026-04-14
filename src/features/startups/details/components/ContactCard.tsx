
import { StartupProfile } from '@/features/startups/types';
import { Card} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, ExternalLink, Mail, Edit3 } from 'lucide-react';
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
  const allLinks = [
    { label: 'Official Website', href: startup.websiteUrl, icon: Globe },
    { label: 'LinkedIn Page', href: startup.linkedinUrl, icon: Users },
    // Add other potential links here in the future
  ];

  const linksToDisplay = isFounder ? allLinks : allLinks.filter(link => !!link.href);

  return (
    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-card p-6 md:p-8 group relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline text-lg font-bold flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-secondary" />
          </div>
          Contact & Links
        </h3>
        {isFounder && (
          <Link href={`/startups/${startup.slug}/edit/links`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Edit3 className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </Button>
          </Link>
        )}
      </div>
      <div className="space-y-4">
      {linksToDisplay.map(link => (
          <LinkButton 
              key={link.label}
              href={link.href}
              label={link.label}
              icon={link.icon}
              disabled={!link.href}
          />
      ))}
      </div>
    </Card>
  )
}
