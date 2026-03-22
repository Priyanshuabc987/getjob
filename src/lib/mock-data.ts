import { PlaceHolderImages } from './placeholder-images';
import { 
  ProjectWorkspace, 
  ProgressUpdate, 
  DiscussionThread, 
  ProjectWorkspaceTeamMember 
} from './types';

export const currentUser = {
  id: 'user-123',
  name: 'Alex Johnson',
  username: 'alexj_builds',
  avatar: PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl,
  bio: 'Building the next gen social layer for builders. UX Designer & React enthusiast.',
  skills: ['React', 'Figma', 'TypeScript', 'Node.js'],
  interests: ['EdTech', 'Open Source', 'AI Ethics'],
  earnings: '₹12,400',
  badges: ['Early Adopter', 'Top Contributor', 'Fast Learner'],
  stats: {
    tasksCompleted: 42,
    collaborations: 8,
    connections: 156
  }
};

export const projectWorkspaces: ProjectWorkspace[] = [
  {
    id: 'proj-1',
    name: 'community-garden',
    title: 'Community Garden Hub',
    tagline: 'Hyperlocal tool sharing for urban farmers.',
    description: 'A platform connecting local residents to share tools, seeds, and produce. We use Flutter for the mobile app and Firebase for real-time synchronization. Our goal is to reduce waste and foster community resilience.',
    coverImageUrl: 'https://picsum.photos/seed/garden-cover/1200/400',
    tags: ['Sustainability', 'Mobile', 'Community'],
    status: 'Seeking Help',
    ownerId: 'user-priya',
    team: [
      { userId: 'user-priya', name: 'Priya S.', role: 'Owner', avatarUrl: 'https://picsum.photos/seed/priya/100/100', title: 'Founder & Lead Dev' },
      { userId: 'user-rahul', name: 'Rahul K.', role: 'Contributor', avatarUrl: 'https://picsum.photos/seed/rahul/100/100', title: 'UI/UX Designer' },
      { userId: 'user-123', name: 'Alex Johnson', role: 'Contributor', avatarUrl: currentUser.avatar, title: 'Frontend Developer' }
    ],
    joinRequests: [],
    resources: [
      { label: 'Github Repo', url: 'https://github.com/example/garden-hub' },
      { label: 'Figma Prototype', url: 'https://figma.com/example' }
    ],
    isVerified: true,
    isPublic: true,
    createdAt: '2023-09-01T10:00:00Z',
    lastUpdatedAt: '2023-11-15T14:30:00Z',
    stats: {
      memberCount: 3,
      updateCount: 12,
      discussionCount: 8,
      momentum: 85
    }
  },
  {
    id: 'proj-2',
    name: 'ai-study-buddy',
    title: 'AI Study Assistant',
    tagline: 'Real-time lecture summarization for students.',
    description: 'A Chrome extension that uses Whisper for transcription and GPT-4 for live summarization of lecture videos. Helping students focus on understanding rather than just transcribing.',
    coverImageUrl: 'https://picsum.photos/seed/ai-cover/1200/400',
    tags: ['AI', 'Productivity', 'Chrome Extension'],
    status: 'Active',
    ownerId: 'user-mark',
    team: [
      { userId: 'user-mark', name: 'Mark R.', role: 'Owner', avatarUrl: 'https://picsum.photos/seed/mark/100/100', title: 'Full Stack Developer' }
    ],
    joinRequests: ['user-456'],
    resources: [
      { label: 'Live Demo', url: 'https://ai-study.example.com' }
    ],
    isVerified: false,
    isPublic: true,
    createdAt: '2023-10-10T12:00:00Z',
    lastUpdatedAt: '2023-11-10T09:15:00Z',
    stats: {
      memberCount: 1,
      updateCount: 4,
      discussionCount: 0,
      momentum: 40
    }
  }
];

export const progressUpdates: ProgressUpdate[] = [
  {
    id: 'up-1',
    projectId: 'proj-1',
    type: 'Milestone',
    title: 'Beta Launch Success!',
    content: 'We successfully onboarded our first 50 users in the Bangalore North district. Tool sharing frequency exceeded our expectations.',
    authorId: 'user-priya',
    authorName: 'Priya S.',
    createdAt: '2023-11-10T15:00:00Z',
    imageUrl: 'https://picsum.photos/seed/launch/800/400',
    reactions: { '🚀': 12, '❤️': 8 }
  },
  {
    id: 'up-2',
    projectId: 'proj-1',
    type: 'Update',
    title: 'Integrated Google Maps API',
    content: 'Neighbors can now see a real-time heatmap of available tools in their vicinity. Optimized query latency by 40%.',
    authorId: 'user-123',
    authorName: 'Alex Johnson',
    createdAt: '2023-11-05T11:00:00Z',
    reactions: { '🔥': 5 }
  }
];

export const discussionThreads: DiscussionThread[] = [
  {
    id: 'th-1',
    projectId: 'proj-1',
    authorId: 'user-community-1',
    authorName: 'GrowthGuru',
    authorAvatarUrl: 'https://picsum.photos/seed/guru/100/100',
    authorRole: 'Community',
    isAnonymous: false,
    title: 'How do you handle tool damage or loss?',
    content: 'I love the concept, but I\'m curious about the insurance or accountability model. Is there a deposit system or is it based on trust?',
    createdAt: '2023-11-12T09:00:00Z',
    upvotes: 24,
    replies: [
      {
        id: 're-1',
        threadId: 'th-1',
        authorId: 'user-priya',
        authorName: 'Priya S.',
        authorAvatarUrl: 'https://picsum.photos/seed/priya/100/100',
        authorRole: 'Owner',
        isAnonymous: false,
        content: 'Currently, it\'s trust-based with a reputation score. We are looking into integrating a small micro-insurance fee for expensive equipment.',
        createdAt: '2023-11-12T10:30:00Z'
      }
    ]
  }
];

// Legacy fields for compatibility during transition
export const feeds = [
  {
    id: 'f1',
    type: 'TASK',
    title: 'Design 5 Landing Page Hero sections',
    author: 'DesignFlow AI',
    authorAvatar: PlaceHolderImages.find(img => img.id === 'startup-logo-1')?.imageUrl,
    reward: '₹2,500',
    postedAt: '2h ago',
    likes: 24,
    comments: 5
  },
  {
    id: 'f2',
    type: 'UPDATE',
    title: 'Just finished the authentication flow! 🚀',
    description: 'The Firebase integration is working perfectly. Check out the clean code structure.',
    author: 'Sarah Chen',
    authorAvatar: PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl,
    image: PlaceHolderImages.find(img => img.id === 'project-thumb-1')?.imageUrl,
    postedAt: '4h ago',
    likes: 89,
    comments: 12
  }
];

export const microInternships = [
  {
    id: 'mi1',
    title: 'Frontend Component Library',
    company: 'NeoBank',
    description: 'Build a set of 10 accessible React components based on our design system.',
    payment: '₹8,000',
    timeRequired: '15-20 hours',
    skills: ['React', 'Tailwind', 'Storybook'],
    category: 'Engineering'
  }
];

export const projects = projectWorkspaces; // Alias for transition
