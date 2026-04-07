
import { FounderProfile } from "@/features/users/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function FounderCard({ founder }: { founder: FounderProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Founder</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={founder.photoURL} alt={founder.displayName} />
          <AvatarFallback>{founder.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${founder.uid}`} className="text-xl font-bold hover:underline">
          {founder.displayName}
        </Link>
        <p className="text-sm text-muted-foreground mt-1">@ Founder</p>
      </CardContent>
    </Card>
  );
}
