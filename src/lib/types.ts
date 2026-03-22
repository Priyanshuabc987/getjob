export type ProjectWorkspaceStatus = 'Active' | 'Seeking Help' | 'Archived';

export type ProjectWorkspaceTeamMember = {
  userId: string;
  role: 'Owner' | 'Contributor';
  name: string; 
  avatarUrl?: string;
  title?: string; // e.g., "Lead Designer"
};

export type ProjectResourceLink = {
  label: 'Github Repo' | 'Figma Prototype' | 'Live Demo' | string;
  url: string;
};

/**
 * Represents the core document for a project.
 */
export type ProjectWorkspace = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string; // Markdown supported
  coverImageUrl?: string;
  tags: string[];
  status: ProjectWorkspaceStatus;
  ownerId: string;
  team: ProjectWorkspaceTeamMember[];
  joinRequests: string[]; // Array of userIds
  resources: ProjectResourceLink[];
  isVerified: boolean;
  isPublic: boolean;
  createdAt: string;
  lastUpdatedAt: string;
  stats: {
    memberCount: number;
    updateCount: number;
    discussionCount: number;
    momentum: number; // 0-100
  };
};

/**
 * Represents a "Proof of Effort" timeline event.
 */
export type ProgressUpdate = {
  id: string;
  projectId: string;
  type: 'Milestone' | 'Update' | 'Launch' | 'Fix';
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  imageUrl?: string;
  reactions: { [emoji: string]: number };
};

/**
 * Represents a "Community Board" discussion thread.
 */
export type DiscussionThread = {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  authorRole?: 'Owner' | 'Teammate' | 'Community';
  isAnonymous: boolean;
  title: string;
  content: string;
  createdAt: string;
  upvotes: number;
  replies: ThreadReply[];
};

/**
 * Represents a reply within a discussion thread.
 */
export type ThreadReply = {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  authorRole?: 'Owner' | 'Teammate' | 'Community';
  isAnonymous: boolean;
  content: string;
  createdAt: string;
  replyingTo?: string; // ID of the parent reply or thread
};
