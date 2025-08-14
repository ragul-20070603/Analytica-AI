// src/ai/flows/auto-clean.ts
'use server';

/**
 * @fileOverview Automatically determines the best data cleaning techniques for a given dataset.
 *
 * - autoClean - A function that suggests a cleaning plan.
 * - AutoCleanInput - The input type for the autoClean function.
 * - AutoCleanOutput - The return type for the autoClean function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoCleanInputSchema = z.object({
  datasetDescription: z
    .string()
    .describe('A description of the dataset, including column names, data types, and a sample of the data.'),
});
export type AutoCleanInput = z.infer<typeof AutoCleanInputSchema>;


const CleaningStepSchema = z.object({
    column: z.string().describe("The column to be cleaned."),
    technique: z.string().describe("The proposed cleaning technique (e.g., 'Median Imputation', 'IQR Outlier Removal')."),
    reasoning: z.string().describe("The justification for choosing this technique for this column."),
});

const AutoCleanOutputSchema = z.object({
  plan: z.array(CleaningStepSchema).describe("An array of proposed cleaning steps."),
});
export type AutoCleanOutput = z.infer<typeof AutoCleanOutputSchema>;

export async function autoClean(input: AutoCleanInput): Promise<AutoCleanOutput> {
  return autoCleanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoCleanPrompt',
  input: {schema: AutoCleanInputSchema},
  output: {schema: AutoCleanOutputSchema},
  prompt: `You are a data science expert tasked with automatically cleaning a dataset.
Given the dataset description below, analyze its structure and content to propose the most appropriate cleaning techniques for each relevant column.

Available techniques:
- **Missing Value Imputation**: Mean, Median, KNN.
- **Outlier Detection**: IQR, Z-Score, Winsorization.
- **Rule-Based Validation**: Consistency Check, Skip Pattern.

For each column that requires cleaning, suggest one technique and provide a brief justification for your choice. For example, for a skewed column with missing values, you might suggest 'Median Imputation'. For a column with extreme values, you might suggest 'IQR Outlier Removal'.

Dataset Description:
{{{datasetDescription}}}

Generate a cleaning plan.
`,
});

const autoCleanFlow = ai.defineFlow(
  {
    name: 'autoCleanFlow',
    inputSchema: AutoCleanInputSchema,
    outputSchema: AutoCleanOutputSchema,
  },
  async input => {
    // In a real application, you would pass a real dataset description.
    // For this prototype, we'll use a hardcoded example.
    const exampleInput = {
        datasetDescription: `
        - Column 'Age': integer, has some missing values, distribution is slightly skewed.
        - Column 'Income': float, has missing values and some very high values that could be outliers.
        - Column 'IsEmployed': boolean.
        - Column 'YearsAtCompany': integer, should be less than 'Age'.
        `
    };

    const {output} = await prompt(exampleInput);
    return output!;
  }
);
