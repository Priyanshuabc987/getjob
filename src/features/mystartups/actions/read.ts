
'use server';

import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '@/lib/firebase';
import {unstable_cache as nextCache} from 'next/cache';

const _getStartupsForUser = async (userId: string) => {

    const q = query(
        collection(db, 'startups'),
        where('founderId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const startups = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name as string,
        slug: doc.data().slug as string, // Add the slug
    }));

    return startups;
};

export const getStartupsForUser = async (userId: string) => {
    return nextCache(
        () => _getStartupsForUser(userId),
        [`user-startups:${userId}`],
        {
            tags: [`user-startups:${userId}`]
        }
    )();
}
