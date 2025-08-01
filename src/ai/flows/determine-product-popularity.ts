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
    .describe('توضیحات محصول آرایشی جدید.'),
  trendingKeywords: z
    .string()
    .describe(
      'لیستی از کلمات کلیدی پرطرفدار در صنعت آرایشی که با کاما از هم جدا شده اند.'
    ),
  currentSeason: z
    .string()
    .describe(
      'فصل فعلی (مثلاً بهار، تابستان، پاییز، زمستان) برای در نظر گرفتن ارتباط.'
    ),
});
export type DetermineProductPopularityInput = z.infer<
  typeof DetermineProductPopularityInputSchema
>;

const DetermineProductPopularityOutputSchema = z.object({
  isPopular: z
    .boolean()
    .describe(
      'اینکه آیا محصول بر اساس داده های ورودی احتمالاً محبوب خواهد بود یا خیر.'
    ),
  reasoning: z
    .string()
    .describe(
      'دلیل تعیین محبوبیت، توضیح اینکه چرا محصول احتمالاً محبوب خواهد بود یا نه.'
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
  prompt: `شما یک تحلیلگر متخصص محبوبیت محصولات آرایشی هستید.

شما توضیحات محصول ارائه شده، کلمات کلیدی پرطرفدار و فصل جاری را تحلیل خواهید کرد تا مشخص کنید آیا محصول احتمالاً محبوب خواهد بود یا خیر.

توضیحات محصول: {{{productDescription}}}
کلمات کلیدی پرطرفدار: {{{trendingKeywords}}}
فصل جاری: {{{currentSeason}}}

هنگام تعیین محبوبیت، عوامل زیر را در نظر بگیرید:
- ارتباط با کلمات کلیدی پرطرفدار: آیا محصول با روندهای فعلی همخوانی دارد؟
- ارتباط فصلی: آیا محصول برای فصل جاری مناسب است؟
- منحصر به فرد بودن: آیا محصول چیز جدید یا متفاوتی نسبت به محصولات موجود ارائه می دهد؟

بر اساس تحلیل خود، تعیین کنید که آیا محصول احتمالاً محبوب خواهد بود و توضیح واضحی برای استدلال خود در فیلد 'reasoning' ارائه دهید.
اگر محصول احتمالاً محبوب است، فیلد 'isPopular' را روی true و در غیر این صورت روی false تنظیم کنید.

لطفاً اطمینان حاصل کنید که خروجی خود را در قالب JSON ارائه می دهید.
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
