
"use server";

import { run } from "@genkit-ai/next";
import { recommendFund, type InvestorProfileInput } from "@/ai/flows/investorProfile";

export async function getFundRecommendation(profile: InvestorProfileInput) {
    try {
        const result = await run(recommendFund, profile);
        return result;
    } catch (error) {
        console.error("Error in getFundRecommendation action:", error);
        // In a real app, you might want to return a structured error response
        throw new Error("Failed to get recommendation from AI flow.");
    }
}
