// src/ai/flows/explain-cleaning.ts
'use server';

/**
 * @fileOverview Explains data cleaning concepts to the user.
 *
 * - explainCleaning - A function that generates explanations for selected data cleaning techniques.
 * - ExplainCleaningInput - The input type for the explainCleaning function.
 * - ExplainCleaningOutput - The return type for the explainCleaning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCleaningInputSchema = z.object({
  techniques: z.array(z.string()).describe('A list of data cleaning techniques to explain.'),
});
export type ExplainCleaningInput = z.infer<typeof ExplainCleaningInputSchema>;

const ExplainCleaningOutputSchema = z.object({
  explanation: z.string().describe('The generated explanation in Markdown format.'),
});
export type ExplainCleaningOutput = z.infer<typeof ExplainCleaningOutputSchema>;

export async function explainCleaning(input: ExplainCleaningInput): Promise<ExplainCleaningOutput> {
  return explainCleaningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCleaningPrompt',
  input: {schema: ExplainCleaningInputSchema},
  output: {schema: ExplainCleaningOutputSchema},
  prompt: `You are a data science expert, skilled at explaining complex topics in a clear and simple way.
The user has performed data cleaning using a set of techniques and wants to understand them better.
Explain the following data cleaning techniques that were used. Use Markdown for formatting, including headings for each technique.

Techniques to explain:
{{#each techniques}}
- {{{this}}}
{{/each}}

For each technique, provide a simple definition, explain why it's used, and give a simple example.

The techniques are:
- **Missing Value Imputation**:
  - **Mean/Median**: Replacing missing values with the mean or median of the column.
  - **KNN (K-Nearest Neighbors)**: Using the values of the 'k' most similar data points to impute the missing value.
- **Outlier Detection**:
  - **IQR (Interquartile Range)**: Identifying outliers as data points that fall below Q1 - 1.5*IQR or above Q3 + 1.5*IQR.
  - **Z-Score**: Identifying outliers as data points with a Z-score (number of standard deviations from the mean) above a certain threshold (e.g., 3).
  - **Winsorization**: Capping extreme values at a certain percentile to reduce the effect of outliers.
- **Rule-Based Validation**:
  - **Consistency Check**: Ensuring data values within a record are logical (e.g., 'age at diagnosis' should not be greater than 'current age').
  - **Skip Pattern**: Validating conditional logic in surveys (e.g., if a user answers 'No' to a question, subsequent related questions should be skipped/null).

Generate the explanation now.
`,
});

const explainCleaningFlow = ai.defineFlow(
  {
    name: 'explainCleaningFlow',
    inputSchema: ExplainCleaningInputSchema,
    outputSchema: ExplainCleaningOutputSchema,
  },
  async input => {
    // For this simulation, we'll just generate an explanation for a fixed set of techniques.
    // In a real app, you would pass the user's selected techniques from the UI.
    const hardcodedTechniques = [
        "Missing Value Imputation (Mean/Median/KNN)",
        "Outlier Detection (IQR/Z-Score/Winsorization)",
        "Rule-Based Validation (Consistency/Skip Patterns)"
    ];

    const {output} = await prompt({ techniques: hardcodedTechniques });
    return output!;
  }
);
