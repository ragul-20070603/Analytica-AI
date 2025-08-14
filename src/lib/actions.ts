
'use server';

import {naturalLanguageQuery} from '@/ai/flows/nlq-interface';
import { explainCleaning } from '@/ai/flows/explain-cleaning';
import { autoClean } from '@/ai/flows/auto-clean';
import {z} from 'zod';

const NlqActionSchema = z.object({
  query: z.string(),
});

export async function nlqAction(prevState: any, formData: FormData) {
  try {
    const validatedData = NlqActionSchema.parse({
      query: formData.get('query'),
    });

    // In a real application, the datasetDescription would be dynamically fetched
    // based on the user's currently selected dataset.
    const datasetDescription = `
      Dataset: Air Quality Index (AQI)
      Columns:
      - date (YYYY-MM-DD): The date of the reading.
      - city (string): The city where the reading was taken.
      - aqi (integer): The Air Quality Index value.
      - co_level (float): Carbon Monoxide level.
      - no2_level (float): Nitrogen Dioxide level.
    `;

    const result = await naturalLanguageQuery({
      query: validatedData.query,
      datasetDescription,
    });

    return {success: true, data: result, error: null};
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {success: false, error: 'Invalid input.', data: null};
    }
    return {success: false, error: 'An unexpected error occurred.', data: null};
  }
}

export async function explainCleaningAction() {
    try {
        const result = await explainCleaning({ techniques: [] }); // Input is currently unused in the flow
        return { success: true, data: result, error: null };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate cleaning explanation.', data: null };
    }
}

export async function autoCleanAction() {
    try {
        const result = await autoClean({ datasetDescription: '' }); // Input is currently unused in the flow
        return { success: true, data: result, error: null };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate auto-cleaning plan.', data: null };
    }
}
