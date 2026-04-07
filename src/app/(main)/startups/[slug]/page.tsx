
import { getStartupById } from "@/features/startups/services/read";
import { StartupDetailsPageClient } from "@/features/startups/details/StartupDetailsPageClient";
import { getIdFromSlug } from "@/lib/utils";
import { notFound } from 'next/navigation';
import { getSession } from '@/features/auth/services/read';
import { getCachedFounderProfile } from '@/features/users/services/read';

export default async function StartupPage({ params }: { params: { slug: string } }) {
  const resolvedparams = await params ;
  const startupId = getIdFromSlug(resolvedparams.slug);

  if (!startupId) {
    notFound();
  }

  // Fetch session and startup data in parallel to reduce waterfalls
  const [session, startup] = await Promise.all([
    getSession(),
    getStartupById(startupId)
  ]);

  // If no startup is found, render the 404 page
  if (!startup) {
    notFound();
  }

  // The founder's profile depends on the startup data, so it's fetched sequentially
  const founder = await getCachedFounderProfile(startup.founderId);

  if (!founder) {
    // Although a startup should always have a founder, this is a good safeguard.
    notFound();
  }

  const isFounder = session === startup.founderId;

  // Render the client component, passing the resolved data as props.
  return <StartupDetailsPageClient startup={startup} founder={founder} isFounder={isFounder} />;
}
