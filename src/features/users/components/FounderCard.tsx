
import { FounderProfile } from "@/features/users/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";

export function FounderCard({ founder }: { founder: FounderProfile }) {
  return (
    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-card p-6 md:p-8 group relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline text-lg font-bold flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-secondary" />
            </div>
            Founder
        </h3>
      </div>
      <CardContent className="flex flex-col items-center text-center p-0">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={founder.photoURL} alt={founder.displayName} />
          <AvatarFallback>{founder.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${founder.uid}`} className="text-xl font-bold hover:underline">
          {founder.displayName}
        </Link>
      </CardContent>
    </Card>
  );
}
