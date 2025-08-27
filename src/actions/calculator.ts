"use server";

import { run } from "@genkit-ai/next/server";
import { recommendFundFlow } from "@/ai/flows/investorProfile";
import { z } from "zod";

const InvestorProfileSchema = z.object({
  objective: z.string(),
  horizon: z.string(),
  riskTolerance: z.string(),
  liquidity: z.string(),
  initialTicket: z.string(),
  sector: z.string(),
});

export async function getFundRecommendation(profile: z.infer<typeof InvestorProfileSchema>) {
    try {
        const result = await run(recommendFundFlow, profile);
        return result;
    } catch (error) {
        console.error("Error in getFundRecommendation action:", error);
        // In a real app, you might want to return a structured error response
        throw new Error("Failed to get recommendation from AI flow.");
    }
}
