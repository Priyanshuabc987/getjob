import { PlaceHolderImages } from './placeholder-images';

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
  projects: [
    { id: 'p1', title: 'PrepLinc UI', status: 'In Progress', tasksDone: 12, totalTasks: 20 },
    { id: 'p2', title: 'Task Flow Engine', status: 'Completed', tasksDone: 5, totalTasks: 5 }
  ],
  stats: {
    tasksCompleted: 42,
    collaborations: 8,
    connections: 156
  }
};

export const feeds = [
  {
    id: 'f1',
    type: 'TASK',
    title: 'Design 5 Landing Page Hero sections',
    author: 'DesignFlow AI',
    authorAvatar: PlaceHolderImages.find(img => img.id === 'startup-logo-1')?.imageUrl,
    reward: '₹2,500',
    time: '4 hours',
    skills: ['Figma', 'UI Design'],
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
  },
  {
    id: 'f3',
    type: 'PROBLEM',
    title: 'How to optimize large Firestore queries?',
    description: 'Our dashboard is lagging with 10k+ entries. Anyone faced this?',
    author: 'SwiftPay Startup',
    reward: '₹5,000 for solution',
    postedAt: '6h ago',
    likes: 12,
    comments: 20
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
  },
  {
    id: 'mi2',
    title: 'Content Strategy for Launch',
    company: 'Healthify App',
    description: 'Create a 30-day social media content calendar for our MVP launch.',
    payment: '₹4,500',
    timeRequired: '10 hours',
    skills: ['Marketing', 'Copywriting'],
    category: 'Content'
  },
  {
    id: 'mi3',
    title: 'User Testing & Feedback',
    company: 'EcoTrack',
    description: 'Conduct 5 user interviews and synthesize feedback for our new feature.',
    payment: '₹3,000',
    timeRequired: '8 hours',
    skills: ['User Research', 'Communication'],
    category: 'UX Research'
  }
];

export const projects = [
  {
    id: 'proj1',
    title: 'Community Garden App',
    description: 'Connecting local residents to share tools and seeds.',
    owner: 'Priya S.',
    ownerAvatar: PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl,
    skills: ['Flutter', 'Firebase'],
    contributors: 5,
    tasks: [
      { id: 't1', title: 'Map Integration', status: 'Open' },
      { id: 't2', title: 'Push Notifications', status: 'In Progress' }
    ]
  },
  {
    id: 'proj2',
    title: 'AI Study Assistant',
    description: 'Chrome extension to summarize lecture videos in real-time.',
    owner: 'Mark R.',
    ownerAvatar: PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl,
    skills: ['JavaScript', 'OpenAI SDK'],
    contributors: 3,
    tasks: [
      { id: 't3', title: 'Video Caption Extraction', status: 'Open' }
    ]
  }
];