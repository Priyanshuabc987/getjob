import { ProjectWorkspace, ProgressUpdate, DiscussionThread } from './types';
import { currentUser } from '../users/data';

export const mockProjects: ProjectWorkspace[] = [
  {
    id: 'proj-1',
    name: 'preplinc-v1',
    title: 'PrepLinc Engine',
    tagline: 'The proof-of-work layer for the future of hiring.',
    description: 'A platform that eliminates resumes by tracking real, verified building habits.',
    coverImageUrl: 'https://picsum.photos/seed/preplinc-main/1200/600',
    tags: ['NextJS', 'Genkit', 'Tailwind'],
    status: 'Active',
    ownerId: currentUser.id,
    team: [
      { userId: currentUser.id, name: 'Alex J.', role: 'Owner', avatarUrl: currentUser.avatar },
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
      { id: 't2', title: 'Implement Credibility Logic', status: 'In Progress', assigneeId: currentUser.id }
    ],
    credibilityScore: 98
  }
];

export const mockProgressUpdates: ProgressUpdate[] = [
  {
    id: 'up-1',
    projectId: 'proj-1',
    type: 'Milestone',
    title: 'Unified Schema Finalized',
    content: 'Mapped out the entire interconnection between Problems, Projects, and Jobs.',
    authorId: currentUser.id,
    authorName: 'Alex J.',
    createdAt: '2024-02-15T10:00:00Z',
    proofUrl: 'https://github.com/alex/preplinc/blob/main/types.ts',
    proofType: 'link',
    imageUrl: 'https://picsum.photos/seed/arch-proof/800/400',
    reactions: { '🔥': 15, '🚀': 8 }
  }
];

export const mockDiscussions: DiscussionThread[] = [
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
    replies: [
      {
        id: 'rep-1',
        threadId: 'th-1',
        authorId: currentUser.id,
        authorName: 'Alex J.',
        authorRole: 'Owner',
        authorAvatarUrl: currentUser.avatar,
        isAnonymous: false,
        content: 'Love this! We can use the GitHub API to check repository status.',
        createdAt: '2024-02-14T12:00:00Z'
      }
    ]
  }
];
