
import { StartupProfile } from '@/features/startups/types';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, ExternalLink, Pencil } from 'lucide-react';
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
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>Contact & Links</span>
                {isFounder && (
                    <Link href={`/startups/${startup.slug}/edit/links`}>
                        <Button variant="outline" size="icon">
                            <Pencil className="w-4 h-4" />
                        </Button>
                    </Link>
                )}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
  )
}
