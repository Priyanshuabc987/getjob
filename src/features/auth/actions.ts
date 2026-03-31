'use server';

import { cookies } from 'next/headers';

/**
 * Sets a session cookie for the authenticated user.
 */
export async function createSession(uid: string) {
  const cookieStore = await cookies();
  cookieStore.set('session', uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

/**
 * Removes the session cookie.
 */
export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

/**
 * Gets the current session UID.
 */
export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get('session')?.value;
}
