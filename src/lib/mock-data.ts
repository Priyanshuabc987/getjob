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
    { id: 'proj1', title: 'PrepLinc UI', status: 'In Progress', tasksDone: 12, totalTasks: 20 },
    { id: 'proj2', title: 'Task Flow Engine', status: 'Completed', tasksDone: 5, totalTasks: 5 }
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
    description: 'Connecting local residents to share tools and seeds. We are building a hyperlocal marketplace for gardening enthusiasts.',
    longDescription: 'This project aims to foster community resilience by allowing neighbors to share excess produce, tools, and expertise. We are using Flutter for the mobile app and Firebase for the real-time backend. Currently, we have the basic auth and tool listing finished, but we need help with the interactive map and push notifications.',
    owner: 'Priya S.',
    ownerAvatar: PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl,
    skills: ['Flutter', 'Firebase', 'Google Maps API'],
    contributors: 5,
    tasks: [
      { id: 't1', title: 'Map Integration', status: 'Open' },
      { id: 't2', title: 'Push Notifications', status: 'In Progress' }
    ],
    teammates: [
      { id: 'u1', name: 'Priya S.', role: 'Founder & Lead Dev', avatar: 'https://picsum.photos/seed/priya/100/100' },
      { id: 'u2', name: 'Rahul K.', role: 'UI Designer', avatar: 'https://picsum.photos/seed/rahul/100/100' },
      { id: 'u3', name: 'Sneha M.', role: 'Backend Dev', avatar: 'https://picsum.photos/seed/sneha/100/100' }
    ],
    discussion: [
      {
        id: 'c1',
        author: 'Rahul K.',
        avatar: 'https://picsum.photos/seed/rahul/100/100',
        text: 'I just uploaded the new Figma designs for the map markers. Priya, let me know what you think!',
        postedAt: '2h ago',
        upvotes: 12,
        replies: [
          {
            id: 'c2',
            author: 'Priya S.',
            avatar: 'https://picsum.photos/seed/priya/100/100',
            text: 'They look great! Much cleaner than the default ones.',
            postedAt: '1h ago',
            upvotes: 4
          }
        ]
      },
      {
        id: 'c3',
        author: 'Unknown Builder',
        avatar: 'https://picsum.photos/seed/anon/100/100',
        text: 'Are you guys planning to support dark mode?',
        postedAt: '5h ago',
        upvotes: 8,
        replies: []
      }
    ]
  },
  {
    id: 'proj2',
    title: 'AI Study Assistant',
    description: 'Chrome extension to summarize lecture videos in real-time.',
    longDescription: 'Students often struggle to keep up with fast-paced lectures. This AI Study Assistant uses OpenAI Whisper for transcription and GPT-4 for summarization. It runs as a Chrome extension and provides a side-panel with key takeaways and definitions updated in real-time as the video plays.',
    owner: 'Mark R.',
    ownerAvatar: PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl,
    skills: ['JavaScript', 'OpenAI SDK', 'Chrome Extension API'],
    contributors: 3,
    tasks: [
      { id: 't3', title: 'Video Caption Extraction', status: 'Open' }
    ],
    teammates: [
      { id: 'u4', name: 'Mark R.', role: 'Project Lead', avatar: 'https://picsum.photos/seed/mark/100/100' },
      { id: 'u5', name: 'Jared L.', role: 'AI Engineer', avatar: 'https://picsum.photos/seed/jared/100/100' }
    ],
    discussion: [
      {
        id: 'c4',
        author: 'Mark R.',
        avatar: 'https://picsum.photos/seed/mark/100/100',
        text: 'Just pushed the v0.1 manifest. Jared, check the permissions for the side panel.',
        postedAt: '10h ago',
        upvotes: 5,
        replies: []
      }
    ]
  }
];
