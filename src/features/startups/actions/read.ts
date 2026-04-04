'use server';

import { doc, getDoc } from 'firebase/firestore';
import { getCachedNextPageStartups } from '../services/read';
import { db } from '@/lib/firebase';
import { StartupProfile } from '../types';

/**
 * Server action to fetch the next page of startups.
 * @param cursorId - The ID of the last document from the previous page.
 * @returns An object with the next list of startups and the subsequent cursor.
 */
export async function getNextStartups(cursorId: string): Promise<{ startups: StartupProfile[]; nextCursor: string | null }> {
    if (!cursorId) {
        return { startups: [], nextCursor: null };
    }

    try {
        // Get the full DocumentSnapshot from the document ID
        const cursorDoc = await getDoc(doc(db, 'startups', cursorId));
        if (!cursorDoc.exists()) {
            console.error("Cursor document not found");
            return { startups: [], nextCursor: null };
        }

        // Call the cached service with the snapshot
        const { startups, nextCursor: newCursorSnapshot } = await getCachedNextPageStartups(cursorDoc);

        // Serialize the next cursor for the client
        const serializableCursor = newCursorSnapshot ? newCursorSnapshot.id : null;

        return { startups, nextCursor: serializableCursor };

    } catch (error) {
        console.error("Error fetching next page of startups:", error);
        return { startups: [], nextCursor: null };
    }
}
