// src/ai/flows/generate-physics-easter-eggs.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating physics-related Easter eggs.
 *
 * The flow takes a number of Easter eggs to generate and returns a list of Easter egg contents.
 *
 * @fileOverview A physics easter egg generator AI agent.
 * @fileOverview
 * - generatePhysicsEasterEggs - A function that handles the easter egg generation process.
 * - GeneratePhysicsEasterEggsInput - The input type for the easterEggs function.
 * - GeneratePhysicsEasterEggsOutput - The return type for the easterEggs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePhysicsEasterEggsInputSchema = z.object({
  numberOfEasterEggs: z
    .number()
    .describe('The number of physics-related Easter eggs to generate.'),
});
export type GeneratePhysicsEasterEggsInput = z.infer<
  typeof GeneratePhysicsEasterEggsInputSchema
>;

const GeneratePhysicsEasterEggsOutputSchema = z.object({
  easterEggs: z
    .array(z.string())
    .describe('An array of physics-related Easter egg contents.'),
});
export type GeneratePhysicsEasterEggsOutput = z.infer<
  typeof GeneratePhysicsEasterEggsOutputSchema
>;

export async function generatePhysicsEasterEggs(
  input: GeneratePhysicsEasterEggsInput
): Promise<GeneratePhysicsEasterEggsOutput> {
  return generatePhysicsEasterEggsFlow(input);
}

const generatePhysicsEasterEggsPrompt = ai.definePrompt({
  name: 'generatePhysicsEasterEggsPrompt',
  input: {schema: GeneratePhysicsEasterEggsInputSchema},
  output: {schema: GeneratePhysicsEasterEggsOutputSchema},
  prompt: `You are a creative assistant helping to generate engaging Easter egg content related to physics.

  Generate {{numberOfEasterEggs}} unique Easter eggs containing physics jokes, messages, or links that would be appreciated by a physics teacher named Pallab sir. The generated content should be suitable to be hidden on a website as Easter eggs.

  Do not address him as "Mr. Mukherjee" or "Pallab". Always refer to him as "Pallab sir". One of the messages should be: "Dear Pallab sir, you are the force that accelerated my life's trajectory. Happy Teacher's Day!"

  Return the Easter eggs as a JSON array of strings.`,
});

const generatePhysicsEasterEggsFlow = ai.defineFlow(
  {
    name: 'generatePhysicsEasterEggsFlow',
    inputSchema: GeneratePhysicsEasterEggsInputSchema,
    outputSchema: GeneratePhysicsEasterEggsOutputSchema,
  },
  async input => {
    const {output} = await generatePhysicsEasterEggsPrompt(input);
    return output!;
  }
);
