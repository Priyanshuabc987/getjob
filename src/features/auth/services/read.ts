'use server';

import { cookies } from 'next/headers';

/**
 * Gets the current session UID.
 */
export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get('session')?.value;
}
