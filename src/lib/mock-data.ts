import { ProjectWorkspace, ProgressUpdate, Opportunity, Challenge, DiscussionThread, StartupProfile, Event } from './types';

export const currentUser = {
  id: 'user-123',
  name: 'Alex Johnson',
  username: 'alexj_builds',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  bio: 'Product Builder & React enthusiast. I love turning complex problems into simple, high-impact interfaces.',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma'],
  interests: ['EdTech', 'FinTech', 'SaaS'],
  earnings: '₹18,600',
  badges: ['Early Adopter', 'Top Builder', 'Problem Solver'],
  credibilityScore: 94,
  stats: {
    tasksCompleted: 15,
    collaborations: 4,
    connections: 342
  }
};

export const projectWorkspaces: ProjectWorkspace[] = [
  {
    id: 'proj-1',
    name: 'preplinc-v1',
    title: 'PrepLinc Engine',
    tagline: 'The proof-of-work layer for the future of hiring.',
    description: 'A platform that eliminates resumes by tracking real, verified building habits. Currently architecting the proof-of-effort verification flow.',
    coverImageUrl: 'https://picsum.photos/seed/preplinc-main/1200/600',
    tags: ['NextJS', 'Genkit', 'Tailwind'],
    status: 'Active',
    ownerId: 'user-123',
    team: [
      { userId: 'user-123', name: 'Alex J.', role: 'Owner', avatarUrl: 'https://picsum.photos/seed/alex/100/100' },
      { userId: 'user-rahul', name: 'Rahul K.', role: 'Contributor', avatarUrl: 'https://picsum.photos/seed/rahul/100/100' }
    ],
    joinRequests: [],
    resources: [
      { label: 'Github Repo', url: 'https://github.com/alex/preplinc' },
      { label: 'Figma Prototype', url: 'https://figma.com/file/preplinc' }
    ],
    isVerified: true,
    isPublic: true,
    createdAt: '2024-01-15T10:00:00Z',
    lastUpdatedAt: '2024-02-20T14:30:00Z',
    stats: {
      memberCount: 2,
      updateCount: 24,
      proofCount: 12,
      momentum: 98
    },
    tasks: [
      { id: 't1', title: 'Design Proof Timeline', status: 'Done', assigneeId: 'user-rahul' },
      { id: 't2', title: 'Implement Credibility Logic', status: 'In Progress', assigneeId: 'user-123' }
    ],
    credibilityScore: 98
  }
];

export const progressUpdates: ProgressUpdate[] = [
  {
    id: 'up-1',
    projectId: 'proj-1',
    type: 'Milestone',
    title: 'Unified Schema Finalized',
    content: 'Mapped out the entire interconnection between Problems, Projects, and Opportunities. The unified schema is now ready for scale.',
    authorId: 'user-123',
    authorName: 'Alex J.',
    createdAt: '2024-02-15T10:00:00Z',
    proofUrl: 'https://github.com/alex/preplinc/blob/main/types.ts',
    proofType: 'link',
    imageUrl: 'https://picsum.photos/seed/arch-proof/800/400',
    reactions: { '🔥': 15, '🚀': 8 }
  }
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    startupId: 's1',
    startupName: 'ZettaCloud',
    title: 'Frontend Component Lead',
    description: 'Migrate legacy dashboard to Tailwind CSS with focus on atomic design patterns.',
    deliverables: ['20 reusable components', 'Theming System', 'Unit Tests'],
    duration: '10 Days',
    stipend: '₹8,000',
    skills: ['React', 'Tailwind'],
    status: 'Open',
    createdAt: '2024-02-12T09:00:00Z'
  }
];

export const challenges: Challenge[] = [
  {
    id: 'ch-1',
    postedBy: 'Hostel Committee',
    title: 'Waste Reduction Dashboard',
    description: 'Predict daily food waste using historical mess attendance data.',
    difficulty: 'Medium',
    reward: '₹2,000 + Incubation',
    tags: ['Data Viz', 'Python', 'IoT']
  }
];

export const discussionThreads: DiscussionThread[] = [
  {
    id: 'th-1',
    projectId: 'proj-1',
    authorId: 'peer-1',
    authorName: 'Siddharth M.',
    authorRole: 'Community',
    isAnonymous: false,
    title: 'Visual Proof Idea',
    content: 'What if we auto-verify GitHub links to ensure they are active repositories?',
    createdAt: '2024-02-14T11:00:00Z',
    upvotes: 12,
    replies: []
  }
];

export const startups: StartupProfile[] = [
  {
    id: 's1',
    name: 'ZettaCloud',
    logo: 'https://picsum.photos/seed/zetta/100/100',
    tagline: 'Hyper-scale compute for modern teams.',
    description: 'We are building the next generation of cloud infrastructure for AI startups.',
    stage: 'Early Traction',
    sector: ['AI', 'Cloud', 'SaaS'],
    teamSize: 12,
    founderId: 'user-rahul',
    openRoles: ['Frontend Engineer', 'DevOps Intern'],
    projects: ['proj-1']
  },
  {
    id: 's2',
    name: 'EcoFlow',
    logo: 'https://picsum.photos/seed/eco/100/100',
    tagline: 'Sustainability tracking simplified.',
    description: 'Helping manufacturing units track and offset their carbon footprint in real-time.',
    stage: 'MVP',
    sector: ['CleanTech', 'IoT'],
    teamSize: 4,
    founderId: 'user-123',
    openRoles: ['Hardware Lead', 'UI Designer'],
    projects: []
  }
];

export const events: Event[] = [
  {
    id: 'ev-1',
    title: 'HackNation v2.0',
    description: 'The biggest student-founder hackathon. Build a working MVP in 48 hours.',
    date: 'Oct 24-26, 2024',
    type: 'Hackathon',
    reward: '₹5,00,000 Prize Pool',
    location: 'Online',
    deadline: 'Oct 20',
    bannerUrl: 'https://picsum.photos/seed/hack/1200/400'
  },
  {
    id: 'ev-2',
    title: 'React Performance Workshop',
    description: 'Master profiling and optimizing complex React applications.',
    date: 'Nov 05, 2024',
    type: 'Workshop',
    reward: 'Performance Expert Badge',
    location: 'Physical (Bangalore)',
    deadline: 'Nov 01',
    bannerUrl: 'https://picsum.photos/seed/workshop/1200/400'
  }
];

export const feeds = [
  {
    id: 'f1',
    type: 'TASK',
    title: 'Frontend Lead needed for ZettaCloud',
    description: 'Seeking someone to build a scalable component library.',
    author: 'ZettaCloud Team',
    authorAvatar: 'https://picsum.photos/seed/zetta/100/100',
    postedAt: '2h ago',
    likes: 24,
    comments: 2,
    reward: '₹8,000'
  },
  {
    id: 'f2',
    type: 'PROBLEM',
    title: 'Mess Food Waste Solution',
    description: 'How can we predict food usage accurately?',
    author: 'Campus Admin',
    authorAvatar: 'https://picsum.photos/seed/campus/100/100',
    postedAt: '4h ago',
    likes: 89,
    comments: 15,
    reward: 'Incubation'
  }
];

export const microInternships = opportunities;