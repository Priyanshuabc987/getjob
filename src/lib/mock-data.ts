import { currentUser } from './users/data';
import { mockProjects, mockProgressUpdates, mockDiscussions } from './projects/data';
import { mockJobs } from './jobs/data';
import { mockStartups } from './startups/data';
import { events as mockEvents } from './events/data';
import { challenges as mockChallenges } from './problems/data';
import { feeds as mockFeeds } from './feed/data';

export { currentUser };
export const projectWorkspaces = mockProjects;
export const progressUpdates = mockProgressUpdates;
export const discussionThreads = mockDiscussions;
export const jobs = mockJobs;
export const opportunities = mockJobs; // Alias for backward compatibility during migration
export const startups = mockStartups;
export const events = mockEvents;
export const challenges = mockChallenges;
export const feeds = mockFeeds;
