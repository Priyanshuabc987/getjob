// This file is now a central hub for shared types, while domain-specific types live in their modules.
export type { ProjectWorkspace, ProjectWorkspaceStatus, ProgressUpdate, DiscussionThread, ThreadReply } from './projects/types';
export type { Job, JobStatus } from './jobs/types';
export type { StartupProfile } from './startups/types';
export type { Event } from './events/types';
export type { Challenge } from './problems/types';
export type { User } from './users/types';
