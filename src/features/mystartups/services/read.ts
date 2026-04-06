
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';


/**
 * Fetches the names and IDs of startups founded by a specific user.
 * This is optimized for use in navigation menus.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of startup objects, each with an id and name.
 */

export const getStartupsForUser = async (userId: string) => {
  const q = query(
    collection(db, 'startups'),
    where('founderId', '==', userId)
  );

  const querySnapshot = await getDocs(q);
  const startups = querySnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name as string,
  }));

  return startups;
};
