/**
 * @fileOverview Problem domain types.
 */

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export type Problem = {
  id: string;
  postedBy: string;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  reward?: string;
  tags: string[];
};
