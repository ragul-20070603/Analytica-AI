// src/ai/flows/smart-documentation.ts
'use server';

/**
 * @fileOverview Automatically generates documentation (Markdown/PDF) outlining the dataset processing steps applied to each dataset.
 *
 * - generateSmartDocumentation - A function that handles the smart documentation generation process.
 * - GenerateSmartDocumentationInput - The input type for the generateSmartDocumentation function.
 * - GenerateSmartDocumentationOutput - The return type for the generateSmartDocumentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartDocumentationInputSchema = z.object({
  datasetDescription: z
    .string()
    .describe('The description of the dataset including its purpose and origin.'),
  processingSteps: z
    .string()
    .describe(
      'A detailed, ordered list of processing steps applied to the dataset, including transformations, cleaning, and analysis.'
    ),
  outputFormat: z.enum(['Markdown', 'PDF']).default('Markdown').describe('The desired output format for the documentation.'),
});

export type GenerateSmartDocumentationInput = z.infer<typeof GenerateSmartDocumentationInputSchema>;

const GenerateSmartDocumentationOutputSchema = z.object({
  documentation: z.string().describe('The generated documentation in the specified format.'),
});

export type GenerateSmartDocumentationOutput = z.infer<typeof GenerateSmartDocumentationOutputSchema>;

export async function generateSmartDocumentation(input: GenerateSmartDocumentationInput): Promise<GenerateSmartDocumentationOutput> {
  return generateSmartDocumentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartDocumentationPrompt',
  input: {schema: GenerateSmartDocumentationInputSchema},
  output: {schema: GenerateSmartDocumentationOutputSchema},
  prompt: `You are an expert documentation generator, creating clear and concise documentation for datasets and their processing steps.

  Dataset Description: {{{datasetDescription}}}
  Processing Steps:
  {{#each (split processingSteps "\n")}}
    {{@index}}. {{this}}
  {{/each}}

  Based on the dataset description and processing steps, generate documentation in {{{outputFormat}}} format.  The documentation should clearly explain each processing step and its purpose. Be detailed and accurate.
  `,
});

const generateSmartDocumentationFlow = ai.defineFlow(
  {
    name: 'generateSmartDocumentationFlow',
    inputSchema: GenerateSmartDocumentationInputSchema,
    outputSchema: GenerateSmartDocumentationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
