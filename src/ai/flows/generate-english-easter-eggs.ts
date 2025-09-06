// src/ai/flows/generate-english-easter-eggs.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating English-related Easter eggs.
 *
 * The flow takes a number of Easter eggs to generate and returns a list of Easter egg contents.
 *
 * @fileOverview An English easter egg generator AI agent.
 * @fileOverview
 * - generateEnglishEasterEggs - A function that handles the easter egg generation process.
 * - GenerateEnglishEasterEggsInput - The input type for the easterEggs function.
 * - GenerateEnglishEasterEggsOutput - The return type for the easterEggs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEnglishEasterEggsInputSchema = z.object({
  numberOfEasterEggs: z
    .number()
    .describe('The number of English-related Easter eggs to generate.'),
});
export type GenerateEnglishEasterEggsInput = z.infer<
  typeof GenerateEnglishEasterEggsInputSchema
>;

const GenerateEnglishEasterEggsOutputSchema = z.object({
  easterEggs: z
    .array(z.string())
    .describe('An array of English-related Easter egg contents.'),
});
export type GenerateEnglishEasterEggsOutput = z.infer<
  typeof GenerateEnglishEasterEggsOutputSchema
>;

export async function generateEnglishEasterEggs(
  input: GenerateEnglishEasterEggsInput
): Promise<GenerateEnglishEasterEggsOutput> {
  return generateEnglishEasterEggsFlow(input);
}

const generateEnglishEasterEggsPrompt = ai.definePrompt({
  name: 'generateEnglishEasterEggsPrompt',
  input: {schema: GenerateEnglishEasterEggsInputSchema},
  output: {schema: GenerateEnglishEasterEggsOutputSchema},
  prompt: `You are a creative assistant helping to generate engaging Easter egg content related to English literature and language.

  Generate {{numberOfEasterEggs}} unique Easter eggs containing literary jokes, famous quotes, or messages that would be appreciated by an English teacher named Subrata sir. The generated content should be suitable to be hidden on a website as Easter eggs.

  Do not address him as "Mr. Das" or "Subrata". Always refer to him as "Subrata sir". 
  
  One of the messages must be: "Dear Subrata sir, you are the editor who corrected the grammar of my life. Happy Teacher's Day!"
  Another message must be: "To teach or not to teach, that is never the question for you. Thank you for everything, Subrata sir!"

  Return the Easter eggs as a JSON array of strings.`,
});

const generateEnglishEasterEggsFlow = ai.defineFlow(
  {
    name: 'generateEnglishEasterEggsFlow',
    inputSchema: GenerateEnglishEasterEggsInputSchema,
    outputSchema: GenerateEnglishEasterEggsOutputSchema,
  },
  async input => {
    const {output} = await generateEnglishEasterEggsPrompt(input);
    return output!;
  }
);
