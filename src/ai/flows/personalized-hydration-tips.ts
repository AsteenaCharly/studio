'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized hydration tips.
 *
 * - personalizedHydrationTips - A function that takes user activity level and weather conditions as input and returns personalized hydration tips.
 * - PersonalizedHydrationTipsInput - The input type for the personalizedHydrationTips function.
 * - PersonalizedHydrationTipsOutput - The return type for the personalizedHydrationTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHydrationTipsInputSchema = z.object({
  activityLevel: z
    .string()
    .describe(
      'The activity level of the user (e.g., sedentary, moderate, active).' + 'Must be one of sedentary, moderate, or active'
    ),
  weatherConditions: z.string().describe('The current weather conditions (e.g., hot, cold, moderate).'),
});
export type PersonalizedHydrationTipsInput = z.infer<
  typeof PersonalizedHydrationTipsInputSchema
>;

const PersonalizedHydrationTipsOutputSchema = z.object({
  hydrationTips: z.string().describe('Personalized hydration tips based on activity level and weather conditions.'),
});
export type PersonalizedHydrationTipsOutput = z.infer<
  typeof PersonalizedHydrationTipsOutputSchema
>;

export async function personalizedHydrationTips(
  input: PersonalizedHydrationTipsInput
): Promise<PersonalizedHydrationTipsOutput> {
  return personalizedHydrationTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHydrationTipsPrompt',
  input: {schema: PersonalizedHydrationTipsInputSchema},
  output: {schema: PersonalizedHydrationTipsOutputSchema},
  prompt: `You are a hydration expert. Provide personalized hydration tips based on the user's activity level and the current weather conditions.  The activity level will be one of sedentary, moderate, or active.

Activity Level: {{{activityLevel}}}
Weather Conditions: {{{weatherConditions}}}

Provide at least three distinct tips.`,
});

const personalizedHydrationTipsFlow = ai.defineFlow(
  {
    name: 'personalizedHydrationTipsFlow',
    inputSchema: PersonalizedHydrationTipsInputSchema,
    outputSchema: PersonalizedHydrationTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
