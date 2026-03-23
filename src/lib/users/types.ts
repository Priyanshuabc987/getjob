export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  skills: string[];
  interests: string[];
  earnings: string;
  badges: string[];
  credibilityScore: number;
  stats: {
    tasksCompleted: number;
    collaborations: number;
    connections: number;
  };
};
