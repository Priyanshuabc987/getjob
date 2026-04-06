
'use server';

import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '@/lib/firebase';
import {unstable_cache as nextCache} from 'next/cache';



const _getStartupsForUser = async (userId: string) => {
    console.log("star");
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

export const getStartupsForUser = async (userId: string) => {
    // Cache this specific user's startup list.
    // Revalidate when a startup is created or deleted for this user.
    return nextCache(
        () => _getStartupsForUser(userId),
        [`user-startups:${userId}`],
        {
            tags: [`user-startups:${userId}`]
        }
    )();
}

