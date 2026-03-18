'use server';
/**
 * @fileOverview This file implements a Genkit flow that generates AI-crafted descriptions
 * for student portfolio entries (tasks or projects), highlighting key contributions
 * and acquired skills to present a professional overview of their experience.
 *
 * - enhancePortfolioEntry - A function that enhances a portfolio entry with AI-crafted descriptions.
 * - AIPortfolioEnhancerInput - The input type for the enhancePortfolioEntry function.
 * - AIPortfolioEnhancerOutput - The return type for the enhancePortfolioEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPortfolioEnhancerInputSchema = z.object({
  title: z.string().describe('The title of the completed task or project.'),
  originalDescription: z
    .string()
    .describe('A brief factual description of the task or project.'),
  userContributions: z
    .string()
    .describe("A detailed account of the user's specific contributions and responsibilities."),
  skillsApplied: z
    .array(z.string())
    .describe('A list of skills the user applied or learned during the task/project.'),
  resultsAchieved: z
    .string()
    .describe("The measurable outcomes or results achieved through the user's involvement."),
});
export type AIPortfolioEnhancerInput = z.infer<
  typeof AIPortfolioEnhancerInputSchema
>;

const AIPortfolioEnhancerOutputSchema = z.object({
  professionalDescription: z
    .string()
    .describe(
      "A compelling, AI-crafted professional description of the task or project, highlighting the user's role and impact. This should be 1-2 paragraphs long."
    ),
  highlightedContributions: z
    .array(z.string())
    .describe('A bulleted list of 3-5 key contributions from the user, emphasizing impact and achievements.'),
  relevantSkills: z
    .array(z.string())
    .describe('A list of 3-5 most relevant skills demonstrated or acquired.'),
});
export type AIPortfolioEnhancerOutput = z.infer<
  typeof AIPortfolioEnhancerOutputSchema
>;

const enhancePortfolioPrompt = ai.definePrompt({
  name: 'enhancePortfolioPrompt',
  input: {schema: AIPortfolioEnhancerInputSchema},
  output: {schema: AIPortfolioEnhancerOutputSchema},
  prompt: `You are an expert career coach and resume writer specializing in helping students create impactful portfolios.
Your task is to transform raw project/task details into a compelling, professional portfolio entry.

Here are the details for a completed project or task:

Title: {{{title}}}
Original Description: {{{originalDescription}}}
My Contributions: {{{userContributions}}}
Skills Applied: {{#each skillsApplied}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Results Achieved: {{{resultsAchieved}}}

Based on the information above, please generate the following:

1.  **professionalDescription**: A concise (1-2 paragraphs), impactful summary of the task/project, focusing on the user's role, responsibilities, and the value delivered. This should sound professional and highlight achievements.
2.  **highlightedContributions**: A bulleted list of 3-5 most significant contributions or achievements made by the user within this task/project. Each point should start with an action verb and quantify results where possible.
3.  **relevantSkills**: A list of 3-5 most pertinent skills that were applied or acquired during this experience, suitable for a professional portfolio.
`,
});

const aiPortfolioEnhancerFlow = ai.defineFlow(
  {
    name: 'aiPortfolioEnhancerFlow',
    inputSchema: AIPortfolioEnhancerInputSchema,
    outputSchema: AIPortfolioEnhancerOutputSchema,
  },
  async (input) => {
    const {output} = await enhancePortfolioPrompt(input);
    return output!;
  }
);

export async function enhancePortfolioEntry(
  input: AIPortfolioEnhancerInput
): Promise<AIPortfolioEnhancerOutput> {
  return aiPortfolioEnhancerFlow(input);
}
