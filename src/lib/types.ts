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

export type ProjectTask = {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assigneeId?: string;
};

/**
 * Core Engine: The Project Workspace
 */
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
  tasks: ProjectTask[];
  isVerified: boolean;
  isPublic: boolean;
  credibilityScore: number; // Calculated based on proof/consistency
  createdAt: string;
  lastUpdatedAt: string;
  stats: {
    memberCount: number;
    updateCount: number;
    proofCount: number; // Number of updates with media/links
    momentum: number; // 0-100
  };
};

/**
 * Proof of Effort: Timeline Updates
 */
export type ProgressUpdate = {
  id: string;
  projectId: string;
  type: 'Milestone' | 'Update' | 'Fix' | 'Launch';
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  proofUrl?: string; // Link to code, design, or doc
  proofType?: 'link' | 'image' | 'video';
  imageUrl?: string; // Visual proof
  reactions: { [emoji: string]: number };
};

/**
 * Opportunities: Micro-Internships
 */
export type Opportunity = {
  id: string;
  startupId: string;
  startupName: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string; // e.g., "7 Days"
  stipend?: string;
  skills: string[];
  status: 'Open' | 'Filled' | 'Completed';
  createdAt: string;
};

/**
 * Real-world Challenges
 */
export type Challenge = {
  id: string;
  postedBy: string; // Company or User
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reward?: string;
  tags: string[];
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

/**
 * Ecosystem: Startups & Events
 */
export type StartupProfile = {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  stage: 'Idea' | 'MVP' | 'Early Traction' | 'Growth';
  sector: string[];
  teamSize: number;
  founderId: string;
  openRoles: string[];
  projects: string[]; // Project IDs
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Hackathon' | 'Workshop' | 'Competition';
  reward?: string;
  location: string; // "Online" or "Physical"
  deadline: string;
  bannerUrl?: string;
};