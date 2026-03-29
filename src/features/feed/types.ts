
export type FeedItem = {
  id: string;
  type: 'JOB' | 'PROJECT' | 'UPDATE';
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  postedAt: string;
  likes: number;
  comments: number;
  reward?: string;
};
