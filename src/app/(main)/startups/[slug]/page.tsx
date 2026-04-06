
import { getStartupById } from "@/features/startups/services/read";
import { StartupDetailsPageClient } from "@/features/startups/details/StartupDetailsPageClient";
import { getIdFromSlug } from "@/lib/utils";
import { notFound } from 'next/navigation';

export default async function StartupPage({ params }: { params: { slug: string } }) {
  const resolvedparams = await params ;
  const startupId = getIdFromSlug(resolvedparams.slug);

  if (!startupId) {
    notFound();
  }

  // Fetch the startup's profile data using the extracted ID
  const startup = await getStartupById(startupId);

  // If no startup is found, render the 404 page
  if (!startup) {
    notFound();
  }

  // Render the client component, passing the full startup profile as a prop.
  // The client component itself will handle fetching and displaying the projects (currently using mock data).
  return <StartupDetailsPageClient startup={startup} />;
}
