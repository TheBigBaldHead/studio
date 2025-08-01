'use server';

/**
 * @fileOverview An AI agent for determining the popularity of a new product.
 *
 * - determineProductPopularity - A function that determines the popularity of a new product.
 * - DetermineProductPopularityInput - The input type for the determineProductPopularity function.
 * - DetermineProductPopularityOutput - The return type for the determineProductPopularity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetermineProductPopularityInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the new cosmetic product.'),
  trendingKeywords: z
    .string()
    .describe(
      'A comma-separated list of trending keywords in the cosmetic industry.'
    ),
  currentSeason: z
    .string()
    .describe(
      'The current season (e.g., Spring, Summer, Fall, Winter) to consider for relevance.'
    ),
});
export type DetermineProductPopularityInput = z.infer<
  typeof DetermineProductPopularityInputSchema
>;

const DetermineProductPopularityOutputSchema = z.object({
  isPopular: z
    .boolean()
    .describe(
      'Whether the product is likely to be popular based on the input data.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the popularity determination, explaining why the product is likely to be popular or not.'
    ),
});
export type DetermineProductPopularityOutput = z.infer<
  typeof DetermineProductPopularityOutputSchema
>;

export async function determineProductPopularity(
  input: DetermineProductPopularityInput
): Promise<DetermineProductPopularityOutput> {
  return determineProductPopularityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'determineProductPopularityPrompt',
  input: {schema: DetermineProductPopularityInputSchema},
  output: {schema: DetermineProductPopularityOutputSchema},
  prompt: `You are an expert cosmetic product popularity analyst.

You will analyze the provided product description, trending keywords, and current season to determine if the product is likely to be popular.

Product Description: {{{productDescription}}}
Trending Keywords: {{{trendingKeywords}}}
Current Season: {{{currentSeason}}}

Consider the following factors when determining popularity:
- Relevance to trending keywords: Does the product align with current trends?
- Seasonal relevance: Is the product suitable for the current season?
- Uniqueness: Does the product offer something new or different from existing products?

Based on your analysis, determine whether the product is likely to be popular and provide a clear explanation for your reasoning in the 'reasoning' field.
Set the 'isPopular' field to true if the product is likely to be popular, and false otherwise.

Please make sure to provide your output in JSON format.
`,
});

const determineProductPopularityFlow = ai.defineFlow(
  {
    name: 'determineProductPopularityFlow',
    inputSchema: DetermineProductPopularityInputSchema,
    outputSchema: DetermineProductPopularityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
