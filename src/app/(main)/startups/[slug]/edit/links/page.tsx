
import { getStartupById } from "@/features/startups/services/read";
import { getIdFromSlug } from "@/lib/utils";
import { notFound } from 'next/navigation';
import { getSession } from "@/features/auth/services/read";
import { StartupEditCard } from "@/features/startups/edit/components/startup-edit-card";
import { EditStartupLinksForm } from "@/features/startups/edit/components/EditStartupLinksForm";

export default async function StartupEditLinksPage({ params }: { params: Promise<{ slug: string }>; }) {
  const resolvedparams = await params;
  const startupId = getIdFromSlug(resolvedparams.slug);
  if (!startupId) {
    notFound();
  }

  const session = await getSession();
  const startup = await getStartupById(startupId);

  if (!startup) {
    notFound();
  }

  // Security check: only the founder can edit
  if (startup.founderId !== session) {
    notFound();
  }

  return (
    <StartupEditCard startupId={startup.id} title="Contact Links">
        <EditStartupLinksForm startup={startup} />
    </StartupEditCard>
  );
}
