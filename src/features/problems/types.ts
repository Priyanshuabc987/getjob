
export type Challenge = {
  id: string;
  postedBy: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reward?: string;
  tags: string[];
};
