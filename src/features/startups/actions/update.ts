
'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { getSession } from '@/features/auth/services/read';
import { getStartupById } from '@/features/startups/services/read';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { normalizeStringForQuery } from '@/lib/utils';

// --- Zod Schemas for Validation ---
const UpdateBasicsSchema = z.object({
  name: z.string().min(1, 'Startup name is required.'),
  tagline: z.string().optional(),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
  teamSize: z.string().min(1, 'Team size is required.'),
  stage: z.string().min(1, 'Stage is required.'),
  fundingStage: z.string().min(1, 'Funding stage is required.'),
  sectors: z.array(z.string()).min(1, 'At least one sector is required.'),
});

const UpdateDescriptionSchema = z.object({
    description: z.string().min(1, 'Description cannot be empty.'),
});

const UpdateLinksSchema = z.object({
    websiteUrl: z.string().url().optional().or(z.literal('')),
    linkedinUrl: z.string().url().optional().or(z.literal('')),
});

const UpdateCoverImageSchema = z.object({
    coverImage: z.string().url().optional().or(z.literal('')),
});

// --- Helper for Security & Data Fetching ---
async function getAuthorizedStartup(startupId: string) {
    const session = await getSession();
    if (!session) {
      throw new Error('Authentication required.');
    }
  
    const startup = await getStartupById(startupId);
    if (!startup) {
      throw new Error('Startup not found.');
    }

    if (startup.founderId !== session) {
      throw new Error('You are not authorized to edit this startup.');
    }

    return startup;
}

// --- Server Actions ---

export async function updateStartupBasics(startupId: string, prevState: any, formData: FormData) {
  try {
    const startup = await getAuthorizedStartup(startupId);

    const parsed = UpdateBasicsSchema.safeParse({
      name: formData.get('name'),
      tagline: formData.get('tagline'),
      city: formData.get('city'),
      country: formData.get('country'),
      teamSize: formData.get('teamSize'),
      stage: formData.get('stage'),
      fundingStage: formData.get('fundingStage'),
      sectors: formData.getAll('sectors'),
    });

    if (!parsed.success) {
      return { success: false, message: parsed.error.errors.map((e) => e.message).join(', ') };
    }

    const startupRef = doc(db, 'startups', startupId);
    const { name, tagline, city, country, teamSize, stage, fundingStage, sectors } = parsed.data;
    const [teamSizeMin, teamSizeMax] = teamSize.split('-').map(Number);

    await updateDoc(startupRef, {
      name,
      tagline: tagline || '',
      city,
      country,
      teamSizeMin,
      teamSizeMax,
      stage,
      fundingStage,
      sector: sectors,
      name_normalized: normalizeStringForQuery(name),
      city_normalized: normalizeStringForQuery(city),
      country_normalized: normalizeStringForQuery(country),
      sector_normalized: sectors.map(normalizeStringForQuery),
    });

    revalidateTag(`startup:${startupId}`);
    if (name !== startup.name) {
      revalidateTag(`user-startups:${startup.founderId}`);
    }
    
    return { success: true, startupSlug: startup.slug };
    
  } catch (error: any) {
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}

export async function updateStartupDescription(startupId: string, prevState: any, formData: FormData) {
    try {
      const startup = await getAuthorizedStartup(startupId);
    
      const parsed = UpdateDescriptionSchema.safeParse({
        description: formData.get('description'),
      });
    
      if (!parsed.success) {
        return { success: false, message: parsed.error.errors.map((e) => e.message).join(', ') };
      }
    
      const startupRef = doc(db, 'startups', startupId);
      const { description } = parsed.data;
    
      await updateDoc(startupRef, { description });
    
      revalidateTag(`startup:${startupId}`);

      return { success: true, startupSlug: startup.slug };

    } catch (error: any) {
        return { success: false, message: error.message || 'An unexpected error occurred.' };
    }
}

export async function updateStartupLinks(startupId: string, prevState: any, formData: FormData) {
    try {
        const startup = await getAuthorizedStartup(startupId);
      
        const parsed = UpdateLinksSchema.safeParse({
            websiteUrl: formData.get('websiteUrl'),
            linkedinUrl: formData.get('linkedinUrl'),
        });
      
        if (!parsed.success) {
          return { success: false, message: parsed.error.errors.map((e) => e.message).join(', ') };
        }
      
        const startupRef = doc(db, 'startups', startupId);
        const { websiteUrl, linkedinUrl } = parsed.data;
      
        await updateDoc(startupRef, {
          websiteUrl: websiteUrl || '',
          linkedinUrl: linkedinUrl || '',
        });
      
        revalidateTag(`startup:${startupId}`);

        return { success: true, startupSlug: startup.slug };

    } catch (error: any) {
        return { success: false, message: error.message || 'An unexpected error occurred.' };
    }
}

export async function updateStartupCoverImage(startupId: string, prevState: any, formData: FormData) {
    try {
      const startup = await getAuthorizedStartup(startupId);

      const parsed = UpdateCoverImageSchema.safeParse({
        coverImage: formData.get('coverImage'),
      });

      if (!parsed.success) {
        return { success: false, message: parsed.error.errors.map((e) => e.message).join(', ') };
      }

      const startupRef = doc(db, 'startups', startupId);
      const { coverImage } = parsed.data;

      await updateDoc(startupRef, {
        coverImage: coverImage || '',
      });

      revalidateTag(`startup:${startupId}`);

      return { success: true, startupSlug: startup.slug };

    } catch (error: any) {
        return { success: false, message: error.message || 'An unexpected error occurred.' };
    }
}
