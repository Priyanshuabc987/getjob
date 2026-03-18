'use server';
/**
 * @fileOverview This file provides an AI-powered connection and discovery service.
 *
 * - aiConnectionsDiscovery - A function that generates AI-powered suggestions for micro-internships, projects, and peer connections.
 * - AIConnectionsDiscoveryInput - The input type for the aiConnectionsDiscovery function.
 * - AIConnectionsDiscoveryOutput - The return type for the aiConnectionsDiscovery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIConnectionsDiscoveryInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of the user\'s skills, e.g., ["React", "Python", "UX Design"]').default([]),
  interests: z.array(z.string()).describe('A list of the user\'s interests, e.g., ["FinTech", "AI Ethics", "Sustainable Energy"]').default([]),
  pastActivities: z.array(z.string()).describe('A list of the user\'s past activities or completed tasks, e.g., ["Completed \'Intro to Web Dev\' micro-internship", "Collaborated on \'Smart City Hackathon\' project"]').default([]),
});
export type AIConnectionsDiscoveryInput = z.infer<typeof AIConnectionsDiscoveryInputSchema>;

const AIConnectionsDiscoveryOutputSchema = z.object({
  suggestedMicroInternships: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the micro-internship.'),
      title: z.string().describe('The title of the micro-internship.'),
      description: z.string().describe('A brief description of the micro-internship task.'),
      paymentRange: z.string().describe('The estimated payment range for the micro-internship, e.g., "₹500-₹1000".'),
      timeRequired: z.string().describe('The estimated time commitment, e.g., "10-20 hours".'),
      skillsNeeded: z.array(z.string()).describe('Skills required for this micro-internship.'),
      matchScore: z.number().describe('A score from 0-100 indicating how well this micro-internship matches the user\'s profile.'),
    })
  ).describe('A list of suggested micro-internships.'),
  suggestedProjects: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the project.'),
      title: z.string().describe('The title of the project.'),
      idea: z.string().describe('A brief overview of the project idea.'),
      skillsNeeded: z.array(z.string()).describe('Skills beneficial for contributing to this project.'),
      matchScore: z.number().describe('A score from 0-100 indicating how well this project matches the user\'s profile.'),
    })
  ).describe('A list of suggested collaboration projects.'),
  suggestedConnections: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the peer.'),
      name: z.string().describe('The name of the suggested peer.'),
      commonInterests: z.array(z.string()).describe('Interests shared with this peer.'),
      commonSkills: z.array(z.string()).describe('Skills shared with this peer.'),
      lookingFor: z.string().describe('What this peer is looking for (e.g., "Internship", "Project", "Co-founder").'),
      matchScore: z.number().describe('A score from 0-100 indicating how well this peer matches the user\'s profile.'),
    })
  ).describe('A list of suggested peer connections.'),
});
export type AIConnectionsDiscoveryOutput = z.infer<typeof AIConnectionsDiscoveryOutputSchema>;

export async function aiConnectionsDiscovery(input: AIConnectionsDiscoveryInput): Promise<AIConnectionsDiscoveryOutput> {
  return aiConnectionsDiscoveryFlow(input);
}

const aiConnectionsDiscoveryPrompt = ai.definePrompt({
  name: 'aiConnectionsDiscoveryPrompt',
  input: { schema: AIConnectionsDiscoveryInputSchema },
  output: { schema: AIConnectionsDiscoveryOutputSchema },
  prompt: `You are an AI assistant for PrepLinc, a platform that helps students find micro-internships, projects, and connections. Your goal is to provide personalized suggestions based on the user's profile.

Generate a list of 3-5 suggested micro-internships, 3-5 suggested projects, and 3-5 suggested peer connections. Each suggestion should include relevant details and a match score (0-100) based on how well it aligns with the user's profile.

User Profile:
Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Past Activities: {{#each pastActivities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Think step-by-step to create diverse and relevant suggestions. Ensure the output strictly adheres to the provided JSON schema. Create realistic-looking dummy data for the suggestions.

Examples of output:

If the user's skills include 'React' and 'UX Design', an internship might be 'Frontend UI Development for Startup X' with skillsNeeded: ['React', 'TypeScript', 'UX Design'].
If the user's interests include 'AI Ethics', a project might be 'Developing a Fair AI Algorithm for Lending' with skillsNeeded: ['Python', 'Machine Learning'].
If the user's skills include 'Python' and interests include 'FinTech', a connection might be 'Priya Sharma' who is looking for a 'Co-founder' and has common skills ['Python', 'Data Analysis'] and common interests ['FinTech', 'Blockchain'].`,
});

const aiConnectionsDiscoveryFlow = ai.defineFlow(
  {
    name: 'aiConnectionsDiscoveryFlow',
    inputSchema: AIConnectionsDiscoveryInputSchema,
    outputSchema: AIConnectionsDiscoveryOutputSchema,
  },
  async (input) => {
    const { output } = await aiConnectionsDiscoveryPrompt(input);
    return output!;
  }
);
