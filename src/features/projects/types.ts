
export type ProjectWorkspaceStatus = 'Idea' | 'Building' | 'MVP' | 'Completed';

export type ProjectWorkspaceTeamMember = {
  userId: string;
  role: 'Owner' | 'Contributor';
  name: string; 
  avatarUrl?: string;
  title?: string;
};

export type ProjectResourceLink = {
  label: 'Github' | 'Figma' | 'Demo' | 'Docs' | string;
  url: string;
};

export type MicroJob = {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assigneeId?: string;
};

export type ProjectWorkspace = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  coverImageUrl?: string;
  tags: string[];
  status: ProjectWorkspaceStatus;
  ownerId: string;
  team: ProjectWorkspaceTeamMember[];
  joinRequests: string[];
  resources: ProjectResourceLink[];
  tasks: MicroJob[];
  isVerified: boolean;
  isPublic: boolean;
  credibilityScore: number;
  createdAt: string;
  lastUpdatedAt: string;
  stats: {
    memberCount: number;
    updateCount: number;
    proofCount: number;
    momentum: number;
  };
};

export type ProgressUpdate = {
  id: string;
  projectId: string;
  type: 'Milestone' | 'Update' | 'Fix' | 'Launch';
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  proofUrl?: string;
  proofType?: 'link' | 'image' | 'video';
  imageUrl?: string;
  reactions: { [emoji: string]: number };
};

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
  replyingTo?: string;
};

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
