
import { getStartupById } from "@/features/startups/services/read";
import { getIdFromSlug } from "@/lib/utils";
import { notFound } from 'next/navigation';
import { getSession } from "@/features/auth/services/read";
import { StartupEditCard } from "@/features/startups/edit/components/startup-edit-card";
import { CreateStartupForm } from "@/features/startups/components/CreateStartupForm";

export default async function StartupEditBasicsPage({ params }: { params: { slug: string } }) {
  const startupId = getIdFromSlug(params.slug);
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
    <StartupEditCard startupId={startup.id} title="Core Details">
        <CreateStartupForm startup={startup} sectors={startup.sector} isEditMode={true} />
    </StartupEditCard>
  );
}
