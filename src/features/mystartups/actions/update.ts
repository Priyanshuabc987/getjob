
// src/features/mystartups/actions/update.ts
'use server';

import { revalidateTag } from 'next/cache';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getSession } from '@/features/auth/services/read';
import { getStartupById } from '@/features/startups/services/read';

/**
 * A generic function to update a startup's data.
 * This will be expanded with more specific functions for granular updates.
 */
export async function updateStartup(startupId: string, data: any) {
  const uid = await getSession();
  if (!uid) {
    return { success: false, message: "You must be logged in to update a startup." };
  }

  const startup = await getStartupById(startupId);
  if (!startup || startup.founderId !== uid) {
    return { success: false, message: "You are not authorized to update this startup." };
  }

  try {
    const startupRef = doc(db, 'startups', startupId);
    await updateDoc(startupRef, data);
    
    // Revalidate the startup's data and the user's list of startups
    revalidateTag(`startup:${startupId}`);
    revalidateTag(`user-startups:${uid}`);

    return { success: true, message: "Startup updated successfully." };
  } catch  {
    return { success: false, message: "An unexpected error occurred." };
  }
}
