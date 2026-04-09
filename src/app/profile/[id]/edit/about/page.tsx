
import { getSession } from "@/features/auth/services/read";
import { getCachedUserProfile } from "@/features/users/services/read";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EditAboutForm } from "@/features/users/edit/EditAboutForm";

export default async function EditAboutPage({ params }: { params: { id: string } }) {
  const session = await getSession();

  // Security Check: Ensure the logged-in user is the owner of this profile
  if (!session || session !== params.id) {
    notFound();
  }

  const profile = await getCachedUserProfile(params.id);
  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-4">
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Link href={`/profile/${profile.uid}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Profile</span>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-headline font-bold">Builder Story</h1>
          <EditAboutForm userProfile={profile} />
        </div>
      </main>
    </div>
  );
}
