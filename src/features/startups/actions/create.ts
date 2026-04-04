// src/features/startups/actions/create.ts
'use server';

import { revalidateTag } from 'next/cache';
import { createStartup as createStartupService } from '../services/write';
import { StartupProfile } from '../types';
import { normalizeStringForQuery } from '@/lib/utils';

/**
 * Server action to create a new startup.
 * This function is called from the client-side form.
 * 
 * @param formData - The raw form data from the client.
 * @returns An object indicating success or failure.
 */
export async function createStartup(formData: FormData) {
  const name = formData.get('name') as string;
  const tagline = formData.get('tagline') as string;
  const description = formData.get('description') as string;
  const websiteUrl = formData.get('websiteUrl') as string;
  const city = formData.get('city') as string;
  const country = formData.get('country') as string;
  const teamSize = Number(formData.get('teamSize'));
  const stage = formData.get('stage') as StartupProfile['stage'];
  const fundingStage = formData.get('fundingStage') as StartupProfile['fundingStage'];
  const sectors = formData.getAll('sectors') as string[];
  const logo = formData.get('logo') as string;

  // Basic validation
  if (!name || !tagline || !description || !city || !country || !teamSize || !stage || !fundingStage || !sectors || !logo) {
    return { success: false, message: 'Missing required fields.' };
  }

  // Normalization for querying
  const name_normalized = normalizeStringForQuery(name);
  const city_normalized = normalizeStringForQuery(city);
  const country_normalized = normalizeStringForQuery(country);
  const sector_normalized = sectors.map(normalizeStringForQuery);

  const startupData: Omit<StartupProfile, 'id' | 'founderId' | 'createdAt' | 'score' | 'openRolesCount' | 'projectsCount'> = {
    name,
    tagline,
    description,
    websiteUrl,
    city,
    country,
    teamSize,
    stage,
    fundingStage,
    sector: sectors,
    logo,
    name_normalized,
    city_normalized,
    country_normalized,
    sector_normalized,
  };

  try {
    await createStartupService(startupData);
    
    // Revalidate the cache for the startups list
    revalidateTag('startups-list');

    return { success: true, message: 'Startup created successfully!' };
  } catch (error) {
    console.error("Error creating startup:", error);
    return { success: false, message: (error as Error).message };
  }
}
