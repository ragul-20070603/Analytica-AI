// src/ai/flows/nlq-interface.ts
'use server';

/**
 * @fileOverview A natural language query interface AI agent.
 *
 * - naturalLanguageQuery - A function that handles natural language queries against datasets.
 * - NaturalLanguageQueryInput - The input type for the naturalLanguageQuery function.
 * - NaturalLanguageQueryOutput - The return type for the naturalLanguageQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageQueryInputSchema = z.object({
  query: z.string().describe('The natural language query to execute against the dataset.'),
  datasetDescription: z.string().describe('A description of the dataset, including its columns and purpose.'),
});
export type NaturalLanguageQueryInput = z.infer<typeof NaturalLanguageQueryInputSchema>;

const NaturalLanguageQueryOutputSchema = z.object({
  result: z.string().describe('The result of the query, formatted as a string.'),
});
export type NaturalLanguageQueryOutput = z.infer<typeof NaturalLanguageQueryOutputSchema>;

export async function naturalLanguageQuery(input: NaturalLanguageQueryInput): Promise<NaturalLanguageQueryOutput> {
  return naturalLanguageQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageQueryPrompt',
  input: {schema: NaturalLanguageQueryInputSchema},
  output: {schema: NaturalLanguageQueryOutputSchema},
  prompt: `You are an expert data analyst. You will receive a natural language query and a description of a dataset.
Your goal is to parse the query, execute it against the dataset, and return the result in a human-readable format.

Dataset Description: {{{datasetDescription}}}

Query: {{{query}}}

Result: `,
});

const naturalLanguageQueryFlow = ai.defineFlow(
  {
    name: 'naturalLanguageQueryFlow',
    inputSchema: NaturalLanguageQueryInputSchema,
    outputSchema: NaturalLanguageQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
