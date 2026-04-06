
'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { getSession } from '@/features/auth/services/read';
import { db } from '@/lib/firebase';
import { normalizeStringForQuery } from '@/lib/utils';
import { collection, doc, setDoc } from 'firebase/firestore';

const CreateStartupSchema = z.object({
  name: z.string().min(1, 'Startup name is required.'),
  teamSize: z.string().min(1, 'Team size is required.'), // Expecting a string like "1-1" or "101-999999"
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
  stage: z.string().min(1, 'Stage is required.'),
  fundingStage: z.string().min(1, 'Funding stage is required.'),
  sectors: z.array(z.string()).min(1, 'At least one sector is required.'),
});

export async function createStartup(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return { success: false, message: 'You must be logged in to create a startup.' };
  }

  const parsed = CreateStartupSchema.safeParse({
    name: formData.get('name'),
    teamSize: formData.get('teamSize'),
    city: formData.get('city'),
    country: formData.get('country'),
    stage: formData.get('stage'),
    fundingStage: formData.get('fundingStage'),
    sectors: formData.getAll('sectors'),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.errors.map((e) => e.message).join(', ') };
  }

  const { name, teamSize, city, country, stage, fundingStage, sectors } = parsed.data;

  // Parse teamSize
  const [teamSizeMin, teamSizeMax] = teamSize.split('-').map(Number);

  if (isNaN(teamSizeMin) || isNaN(teamSizeMax)) {
    return { success: false, message: 'Invalid team size format.' };
  }

  try {
    const newStartupRef = doc(collection(db, 'startups'));
    const baseSlug = normalizeStringForQuery(name);
    const finalSlug = `${baseSlug}-${newStartupRef.id}`;

    const newStartupData = {
        id: newStartupRef.id,
        slug: finalSlug,
        name,
        teamSizeMin,
        teamSizeMax,
        city,
        country,
        stage,
        fundingStage,
        sector: sectors,
        founderId: session, 
        createdAt: new Date().toISOString(), // Add the creation timestamp
        name_normalized: normalizeStringForQuery(name),
        city_normalized: normalizeStringForQuery(city),
        country_normalized: normalizeStringForQuery(country),
        sector_normalized: sectors.map(normalizeStringForQuery),
        logo: '',
        tagline: '',
        description: '',
        websiteUrl: '',
        linkedinUrl: '',
        score: 0,
        openRolesCount: 0,
        projectsCount: 0,
      };

    await setDoc(newStartupRef, newStartupData);

    revalidateTag(`user-startups:${session}`)
   
    return { success: true, message: 'Startup created successfully!', startupSlug: finalSlug };

  } catch (error) {
    console.error("Error creating startup:", error);
    return { success: false, message: (error as Error).message };
  }
}
