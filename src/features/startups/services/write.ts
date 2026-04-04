// src/features/startups/services/write.ts
import 'server-only';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Corrected Path
import { getSession } from '@/features/auth/services/read'; // Corrected Function
import { StartupProfile } from '../types';

/**
 * Creates a new startup document in Firestore.
 *
 * @param startupData - The data for the new startup, excluding system-managed fields.
 * @returns The ID of the newly created startup document.
 * @throws An error if the user is not authenticated.
 */
export async function createStartup(
  startupData: Omit<StartupProfile, 'id' | 'founderId' | 'createdAt' | 'score' | 'openRolesCount' | 'projectsCount'>
): Promise<string> {
  const session = await getSession(); // Corrected Call
  if (!session) {
    throw new Error('Authentication required to create a startup.');
  }

  const newStartupRef = await addDoc(collection(db, 'startups'), {
    ...startupData,
    founderId: session, // Use the session value directly as the UID
    openRolesCount: 0,
    projectsCount: 0,
    createdAt: serverTimestamp(),
    score: Date.now(),
  });

  return newStartupRef.id;
}
