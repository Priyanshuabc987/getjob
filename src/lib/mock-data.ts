import { ProjectWorkspace, ProgressUpdate, Opportunity, Challenge, DiscussionThread, currentUser as userType } from './types';

export const currentUser = {
  id: 'user-123',
  name: 'Alex Johnson',
  username: 'alexj_builds',
  avatar: 'https://picsum.photos/seed/alex/100/100',
  bio: 'Product Builder & React enthusiast. Building the next gen social layer for builders.',
  skills: ['React', 'Figma', 'TypeScript', 'Node.js'],
  interests: ['EdTech', 'FinTech', 'AI'],
  earnings: '₹12,400',
  badges: ['Early Adopter', 'Top Builder'],
  credibilityScore: 85,
  stats: {
    tasksCompleted: 42,
    collaborations: 8,
    connections: 156
  }
};

export const projectWorkspaces: ProjectWorkspace[] = [
  {
    id: 'proj-1',
    name: 'preplinc-v1',
    title: 'PrepLinc Workspace',
    tagline: 'The proof-of-work engine for students.',
    description: 'We are building a platform where work speaks louder than resumes. Currently focusing on the project timeline and proof-of-effort verification systems.',
    coverImageUrl: 'https://picsum.photos/seed/preplinc-cover/1200/400',
    tags: ['NextJS', 'Genkit', 'Tailwind'],
    status: 'Building',
    ownerId: 'user-123',
    team: [
      { userId: 'user-123', name: 'Alex J.', role: 'Owner', avatarUrl: 'https://picsum.photos/seed/alex/100/100', title: 'Lead Architect' },
      { userId: 'user-rahul', name: 'Rahul K.', role: 'Contributor', avatarUrl: 'https://picsum.photos/seed/rahul/100/100', title: 'UX Designer' }
    ],
    joinRequests: [],
    resources: [
      { label: 'Github', url: 'https://github.com/alex/preplinc' },
      { label: 'Figma', url: 'https://figma.com/file/preplinc' }
    ],
    tasks: [
      { id: 't1', title: 'Design Proof Timeline', status: 'Done', assigneeId: 'user-rahul' },
      { id: 't2', title: 'Implement Zod Schemas', status: 'In Progress', assigneeId: 'user-123' },
      { id: 't3', title: 'Connect AI Flow', status: 'To Do' }
    ],
    isVerified: true,
    isPublic: true,
    credibilityScore: 92,
    createdAt: '2024-01-01T10:00:00Z',
    lastUpdatedAt: '2024-02-15T14:30:00Z',
    stats: {
      memberCount: 2,
      updateCount: 15,
      proofCount: 8,
      momentum: 94
    }
  }
];

export const progressUpdates: ProgressUpdate[] = [
  {
    id: 'up-1',
    projectId: 'proj-1',
    type: 'Milestone',
    title: 'Core Architecture Finalized',
    content: 'Mapped out the entire interconnection between Problems, Projects, and Opportunities. The unified schema is now ready.',
    authorId: 'user-123',
    authorName: 'Alex J.',
    createdAt: '2024-02-14T10:00:00Z',
    proofUrl: 'https://github.com/alex/preplinc/blob/main/types.ts',
    proofType: 'link',
    imageUrl: 'https://picsum.photos/seed/arch/800/400',
    reactions: { '🔥': 12, '🚀': 5 }
  },
  {
    id: 'up-2',
    projectId: 'proj-1',
    type: 'Update',
    title: 'Drafted Mobile Navbar',
    content: 'Optimized the bottom navigation for one-handed use and added quick-action button for updates.',
    authorId: 'user-rahul',
    authorName: 'Rahul K.',
    createdAt: '2024-02-12T15:30:00Z',
    proofUrl: 'https://figma.com/file/preplinc-mobile',
    proofType: 'link',
    reactions: { '🎨': 8 }
  }
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    startupId: 's1',
    startupName: 'ZettaCloud',
    title: 'Frontend Component Developer',
    description: 'Help us migrate our dashboard components to Tailwind CSS. Focus on accessibility and performance.',
    deliverables: ['15 reusable components', 'Documentation', 'Unit tests'],
    duration: '10 Days',
    stipend: '₹5,000',
    skills: ['React', 'Tailwind'],
    status: 'Open',
    createdAt: '2024-02-10T09:00:00Z'
  }
];

export const challenges: Challenge[] = [
  {
    id: 'ch-1',
    postedBy: 'Hostel Committee',
    title: 'Reduce Food Waste in Mess',
    description: 'How can we track real-time attendance to predict food consumption accurately?',
    difficulty: 'Medium',
    reward: 'Incubation Support',
    tags: ['IoT', 'Data Science', 'Sustainability']
  }
];

export const discussionThreads: DiscussionThread[] = [
  {
    id: 'th-1',
    projectId: 'proj-1',
    authorId: 'user-peer',
    authorName: 'Siddharth M.',
    authorRole: 'Community',
    isAnonymous: false,
    title: 'Suggestion: Visual Proof Verification',
    content: 'Would be cool if the platform auto-checked if GitHub links actually exist or Figma files are public.',
    createdAt: '2024-02-13T11:00:00Z',
    upvotes: 15,
    replies: []
  }
];

export const feeds = [
  {
    id: 'f1',
    type: 'UPDATE',
    title: 'Just updated the DB schema! 🛠️',
    description: 'Connected all sections. Everything is now proof-driven.',
    author: 'Alex Johnson',
    authorAvatar: 'https://picsum.photos/seed/alex/100/100',
    image: 'https://picsum.photos/seed/code/400/300',
    postedAt: '1h ago',
    likes: 45,
    comments: 3
  }
];

export const microInternships = opportunities; // Alias
