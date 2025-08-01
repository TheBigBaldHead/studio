"use server"

import {
  determineProductPopularity,
  type DetermineProductPopularityInput,
  type DetermineProductPopularityOutput,
} from "@/ai/flows/determine-product-popularity"

export async function checkPopularity(
  input: DetermineProductPopularityInput
): Promise<DetermineProductPopularityOutput> {
  return await determineProductPopularity(input)
}
