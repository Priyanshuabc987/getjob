'use server';

/**
 * This file fetches post-related data from Firestore.
 */
import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import type { Post, PostCardData, Question, Resource, AllFilterOptions } from '@/lib/types';
import {
  INITIAL_POST_FETCH_COUNT,
  PAGINATION_FETCH_COUNT,
  UNFILTERED_POSTS_REVALIDATION_TIME,
  FILTERED_POSTS_REVALIDATION_TIME_1_FILTER,
  FILTERED_POSTS_REVALIDATION_TIME_2_FILTERS,
  PERSONAL_POST_REVALIDATION_TIME,
  POST_DETIALS_REVALIDATION_TIME,
  RELATED_POSTS_COMPANY_FETCH_COUNT,
  RELATED_POSTS_ROLE_FETCH_COUNT,
  RELATED_POSTS_TAG_FETCH_COUNT,
  ANONYMOUS_USER_ID,
  ANONYMOUS_USER_NAME,
  ANONYMOUS_USER_AVATAR_URL,
} from '../../constants';
import { docDataToPost, docDataToPostCardData } from '../converters';
import { getPostQuestions } from '../questions/read';
import { getPostResources } from '../resources/read';
import { normalizeStringForQuery } from '@/lib/utils';
import { getLabelFromValue } from '@/lib/utils';


export type PostFilters = {
  type?: string;
  company?: string;
  role?: string;
  year?: string;
  college?: string;
};

const anonymizePost = <T extends Post | PostCardData>(post: T): T => {
    if (post.main.isAnonymous) {
        return {
            ...post,
            main: {
                ...post.main,
                authorId: ANONYMOUS_USER_ID,
                authorName: ANONYMOUS_USER_NAME,
                authorAvatar: ANONYMOUS_USER_AVATAR_URL,
            },
        };
    }
    return post;
};


/* -------------------------------------------------------------------------- */
/*                          [UNCACHED "WORKERS"]                          */
/* -------------------------------------------------------------------------- */



/**
 * Worker: Fetches posts with optional filters (no cache).
 */
const _uncachedGetPosts = async ({
    allOptions,
    filters,
    limit: limitCount,
    cursor,
}: {
    allOptions: AllFilterOptions;
    filters: PostFilters;
    limit?: number;
    cursor?: string;
}): Promise<{ posts: PostCardData[]; nextCursor: string | null }> => {
    
    const postsRef = collection(db, 'posts');
    const queryConstraints: QueryConstraint[] = [];

    if (filters.type && filters.type !== 'all') queryConstraints.push(where('main.type', '==', filters.type));
    
    if (filters.company) {
        const normalizedCompany = normalizeStringForQuery(filters.company);
        queryConstraints.push(where('main.companyInfo.company', '>=', normalizedCompany));
        queryConstraints.push(where('main.companyInfo.company', '<=', normalizedCompany + '\uf8ff'));
    }
    if (filters.role) {
        const normalizedRole = normalizeStringForQuery(filters.role);
        queryConstraints.push(where('main.companyInfo.role', '>=', normalizedRole));
        queryConstraints.push(where('main.companyInfo.role', '<=', normalizedRole + '\uf8ff'));
    }

    if (filters.college) {
        const normalizedCollege = normalizeStringForQuery(filters.college);
        queryConstraints.push(where('main.institution', '>=', normalizedCollege));
        queryConstraints.push(where('main.institution', '<=', normalizedCollege + '\uf8ff'));
    }
    
    if (filters.year) {
        queryConstraints.push(where('main.tags', 'array-contains', filters.year));
    }


    queryConstraints.push(orderBy('main.createdAt', 'desc'));

    if (cursor) {
        const cursorDate = new Date(cursor);
        queryConstraints.push(startAfter(Timestamp.fromDate(cursorDate)));
    }
    
    if (limitCount) {
        queryConstraints.push(limit(limitCount));
    }

    const q = query(postsRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    
    const posts = querySnapshot.docs.map(doc => docDataToPostCardData(doc.id, doc.data())).filter((p): p is PostCardData => !!p).map(anonymizePost);
    
    posts.forEach(post => {
      post.main.companyInfo.company = getLabelFromValue(post.main.companyInfo.company, allOptions.companies);
      post.main.companyInfo.role = getLabelFromValue(post.main.companyInfo.role, allOptions.roles);
      post.main.institution = getLabelFromValue(post.main.institution!, allOptions.colleges);
    });
    
    let nextCursor: string | null = null;
    if (limitCount && posts.length === limitCount) {
        nextCursor = posts[posts.length - 1].main.createdAt;
    }

    return { posts, nextCursor };
};


/**
 * Worker: Fetches posts for a specific user (no cache).
 */
const _uncachedGetPostsByUserId = async ({
    userId,
    limit: limitCount,
    cursor,
  }: {
    userId: string;
    limit?: number;
    cursor?: string;
  }): Promise<{ posts: PostCardData[]; nextCursor: string | null }> => {

    const postsRef = collection(db, 'posts');
    const queryConstraints: QueryConstraint[] = [
        where('main.authorId', '==', userId),
        orderBy('main.createdAt', 'desc')
    ];
    
    if (cursor) {
        const cursorDate = new Date(cursor);
        queryConstraints.push(startAfter(Timestamp.fromDate(cursorDate)));
    }

    if (limitCount) {
        queryConstraints.push(limit(limitCount));
    }

    const q = query(postsRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => docDataToPostCardData(doc.id, doc.data())).filter((p): p is PostCardData => !!p);

    let nextCursor: string | null = null;
    if (limitCount && posts.length === limitCount) {
        nextCursor = posts[posts.length - 1].main.createdAt;
    }
    
    return { posts, nextCursor };
}


/**
 * [UNCACHED WORKER] Implements the new multi-query strategy to fetch related posts.
 */
const _uncachedGetRelatedPosts = async (
    currentPost: Post,
    allOptions: AllFilterOptions
): Promise<PostCardData[]> => {
    const { id: postId, main: { tags: currentPostTags, companyInfo }, otherPersonalInfo } = currentPost;

    const normalizedCompany = normalizeStringForQuery(companyInfo.company);
    const normalizedRole = normalizeStringForQuery(companyInfo.role);
    
    if (!currentPostTags || currentPostTags.length === 0) {
        return [];
    }

    const postsRef = collection(db, 'posts');
    
    const companyQuery = query(
        postsRef,
        where('main.companyInfo.company', '==', normalizedCompany),
        orderBy('main.createdAt', 'desc'),
        limit(RELATED_POSTS_COMPANY_FETCH_COUNT)
    );
    const roleQuery = query(
        postsRef,
        where('main.companyInfo.role', '==', normalizedRole),
        orderBy('main.createdAt', 'desc'),
        limit(RELATED_POSTS_ROLE_FETCH_COUNT)
    );
    const tagQuery = query(
        postsRef,
        where('main.tags', 'array-contains-any', currentPostTags),
        orderBy('main.createdAt', 'desc'),
        limit(RELATED_POSTS_TAG_FETCH_COUNT)
    );

    const [companySnap, roleSnap, tagSnap] = await Promise.all([
        getDocs(companyQuery),
        getDocs(roleQuery),
        getDocs(tagQuery),
    ]);


    const candidateMap = new Map<string, Post>();
    const processSnapshot = (snap: typeof companySnap) => {
        snap.docs.forEach(doc => {
            if (doc.id !== postId && !candidateMap.has(doc.id)) {
                candidateMap.set(doc.id, docDataToPost(doc.id, doc.data()) as Post);
            }
        });
    };
    processSnapshot(companySnap);
    processSnapshot(roleSnap);
    processSnapshot(tagSnap);
    
    const candidatePosts = Array.from(candidateMap.values()).filter(Boolean);

    const TAG_WEIGHTS = {
        company: 10,
        role: 8,
        year: 5,
        applicationType: 5,
        topic: 2
    };

    const currentPostYear = currentPostTags.find(tag => /^\d{4}$/.test(tag));

    const scoredPosts = candidatePosts.map(candidate => {
        let score = 0;
        
        if (candidate.main?.companyInfo?.company === companyInfo.company) score += TAG_WEIGHTS.company;
        if (candidate.main?.companyInfo?.role === companyInfo.role) score += TAG_WEIGHTS.role;
        if (candidate.otherPersonalInfo?.applicationType === otherPersonalInfo.applicationType) score += TAG_WEIGHTS.applicationType;

        const candidateYear = candidate.main?.tags?.find(tag => /^\d{4}$/.test(tag));
        if(candidateYear && currentPostYear && candidateYear === currentPostYear) score += TAG_WEIGHTS.year;

        const sharedTags = new Set(candidate.main?.tags?.filter(tag => currentPostTags.includes(tag)) || []);
        const topicTags = Array.from(sharedTags).filter(tag => 
            tag !== companyInfo.company && 
            tag !== companyInfo.role &&
            tag !== otherPersonalInfo.applicationType &&
            tag !== candidateYear
        );
        score += topicTags.length * TAG_WEIGHTS.topic;


        return { post: candidate, score };
    });

    scoredPosts.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return new Date(b.post.main.createdAt).getTime() - new Date(a.post.main.createdAt).getTime();
    });

    const finalPosts = scoredPosts.map(({ post }) => {
        post.main.companyInfo.company = getLabelFromValue(post.main.companyInfo.company, allOptions.companies);
        post.main.companyInfo.role = getLabelFromValue(post.main.companyInfo.role, allOptions.roles);
        post.main.institution = getLabelFromValue(post.main.institution!, allOptions.colleges);
        return { id: post.id, main: post.main };
    });

    return finalPosts;
};


/* -------------------------------------------------------------------------- */
/*                         [CACHED PUBLIC FETCHERS]                           */
/* -------------------------------------------------------------------------- */

const getFilterMetadata = (filters: PostFilters) => {
    const activeFilters = Object.entries(filters).filter(([, value]) => value && value !== 'all');
    const cacheKey = activeFilters.map(([key, value]) => `${key}=${value}`).sort().join('&');
    return {
        count: activeFilters.length,
        key: cacheKey,
    };
};

/**
 * [PUBLIC] Cached: Fetches posts, applying the tiered caching strategy.
 */
export const getPosts = reactCache(
    async (
    allOptions: AllFilterOptions,
    filters: PostFilters,
    limitCount = INITIAL_POST_FETCH_COUNT,
    cursor?: string
    ): Promise<{ posts: PostCardData[], nextCursor: string | null }> => {
    const { count: activeFilterCount, key: filterCacheKey } = getFilterMetadata(filters);

    let revalidationTime: number | false = false;
    let cacheKeyParts: string[] = ['filtered-posts', filterCacheKey, String(limitCount)];

    switch (activeFilterCount) {
        case 0:
            revalidationTime = UNFILTERED_POSTS_REVALIDATION_TIME;
            cacheKeyParts = ['initial-posts', String(limitCount)];
            break;
        case 1:
            revalidationTime = FILTERED_POSTS_REVALIDATION_TIME_1_FILTER;
            break;
        case 2:
            revalidationTime = FILTERED_POSTS_REVALIDATION_TIME_2_FILTERS;
            break;
        default: // 3+ filters
            revalidationTime = false;
            break;
    }

    if (revalidationTime !== false) {
        const cacheKey = [ ...cacheKeyParts, cursor || '' ];
        
        const cachedFn = nextCache(
            () => _uncachedGetPosts({ allOptions, filters, limit: limitCount, cursor }),
            cacheKey,
            {
                revalidate: revalidationTime,
                tags: ['posts-list', `filtered-posts-${filterCacheKey}`, 'posts'],
            }
        );
        return cachedFn();
    } else {
        return _uncachedGetPosts({ allOptions, filters, limit: limitCount, cursor });
    }
});


/**
 * [PUBLIC] Wrapper around getPosts to fetch the initial, unfiltered list.
 */
export const getInitialPosts = async (allOptions: AllFilterOptions): Promise<PostCardData[]> => {
  const { posts } = await getPosts(allOptions, {}, INITIAL_POST_FETCH_COUNT);
  return posts;
};


/**
 * [PUBLIC] Helper: Fetches the next page of posts.
 */
export const getNextPosts = async ({
  allOptions,
  filters,
  cursor,
  limitCount,
}: {
  allOptions: AllFilterOptions;
  filters: PostFilters;
  cursor: string | null;
  limitCount?: number;
}) => {
  const fetchLimit = cursor ? limitCount || PAGINATION_FETCH_COUNT : INITIAL_POST_FETCH_COUNT;
  return getPosts(allOptions, filters, fetchLimit, cursor || undefined);
};




/**
 * [PUBLIC] Cached: Fetches posts by a specific user.
 * This function now accepts an optional allOptions to denormalize the data.
 */
export const getPostsByUserId = reactCache(async ({
    userId,
    allOptions,
    limit,
    cursor,
    includeAnonymous = false,
  }: {
    userId: string;
    allOptions?: AllFilterOptions,
    limit?: number;
    cursor?: string;
    includeAnonymous?: boolean;
  }) => {
    const cachedFn = nextCache(
        async () => {
            const result = await _uncachedGetPostsByUserId({ userId, limit, cursor });
            if (allOptions) {
                result.posts.forEach(post => {
                  post.main.companyInfo.company = getLabelFromValue(post.main.companyInfo.company, allOptions.companies);
                  post.main.companyInfo.role = getLabelFromValue(post.main.companyInfo.role, allOptions.roles);
                  post.main.institution = getLabelFromValue(post.main.institution!, allOptions.colleges);
                });
            }
            return result;
        },
        ['user-posts', userId, String(limit || 'none'), cursor || '', allOptions ? 'denormalized' : 'raw'],
        {
            revalidate: PERSONAL_POST_REVALIDATION_TIME,
            tags: [`user:${userId}:posts`, 'posts'],
        }
    );
    
    const result = await cachedFn();

    // Filter out anonymous posts if the caller doesn't want them
    if (!includeAnonymous && result.posts) {
        result.posts = result.posts.filter(post => !post.main.isAnonymous);
    }
    
    return result;
});


/**
 * [PUBLIC] Uncached: Fetches all data for editing a post, including subcollections.
 */
export const getPostAndSubcollectionsForEditing = async (id: string, allOptions: AllFilterOptions): Promise<{ post: Post; questions: Question[]; resources: Resource[] } | null> => {
    
    // The underlying functions are wrapped in React.cache, so these calls will be memoized
    // for the duration of this single request, preventing multiple DB hits for the same data.
    const [postData, postQuestions, postResources] = await Promise.all([
        // getPostDetails(id, allOptions),
        getPostQuestions(id, allOptions),
        getPostResources(id, allOptions),
    ]);

    if (!postData) {
        return null;
    }

    return {
        post: postData,
        questions: postQuestions,
        resources: postResources
    };
}

/**
 * [PUBLIC] Cached: Fetches related posts based on the new multi-query strategy.
 */
export const getRelatedPosts = reactCache(
    async (currentPost: Post, allOptions: AllFilterOptions): Promise<PostCardData[]> => {
        return nextCache(
            () => _uncachedGetRelatedPosts(currentPost, allOptions),
            ['related-posts-v3-multi-query', currentPost.id],
            {
                revalidate: POST_DETIALS_REVALIDATION_TIME,
                tags: [`post:${currentPost.id}:related`, 'posts'],
            }
        )();
    }
);
