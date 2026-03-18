'use server';
/**
 * @fileOverview An AI assistant that helps students articulate project ideas, suggest skills, and break them into micro-tasks.
 *
 * - aiProjectCreationAssistant - A function that handles the project creation assistance process.
 * - AIProjectCreationInput - The input type for the aiProjectCreationAssistant function.
 * - AIProjectCreationOutput - The return type for the aiProjectCreationAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIProjectCreationInputSchema = z.object({
  projectIdea: z.string().describe('A brief initial description of the project idea.'),
});
export type AIProjectCreationInput = z.infer<typeof AIProjectCreationInputSchema>;

const AIProjectCreationOutputSchema = z.object({
  articulatedIdea: z.string().describe('A more detailed and well-defined project description.'),
  suggestedSkills: z
    .array(z.string())
    .describe('A list of skills required or beneficial for the project.'),
  microTasks: z
    .array(z.string())
    .describe('A list of small, manageable tasks to complete the project.'),
});
export type AIProjectCreationOutput = z.infer<typeof AIProjectCreationOutputSchema>;

export async function aiProjectCreationAssistant(input: AIProjectCreationInput): Promise<AIProjectCreationOutput> {
  return aiProjectCreationFlow(input);
}

const projectCreationPrompt = ai.definePrompt({
  name: 'projectCreationPrompt',
  input: { schema: AIProjectCreationInputSchema },
  output: { schema: AIProjectCreationOutputSchema },
  prompt: `You are an AI assistant specialized in helping students develop project ideas for a platform like PrepLinc.
Your goal is to take a student's initial project idea and expand upon it, making it clear, actionable, and attractive to collaborators. You should also identify key skills needed and break the project down into manageable micro-tasks.

Input Project Idea: "{{{projectIdea}}}"

Based on this idea, please provide:
1. An articulated and expanded project idea.
2. A list of suggested skills (e.g., "Frontend Development", "UI/UX Design", "Backend Engineering", "Database Management", "Technical Writing", "Project Management") that would be beneficial for this project.
3. A list of 5-10 initial micro-tasks that a student could work on to get started or that collaborators could pick up easily.`,
});

const aiProjectCreationFlow = ai.defineFlow(
  {
    name: 'aiProjectCreationFlow',
    inputSchema: AIProjectCreationInputSchema,
    outputSchema: AIProjectCreationOutputSchema,
  },
  async (input) => {
    const { output } = await projectCreationPrompt(input);
    return output!;
  }
);
