
'use server';
/**
 * @fileOverview An investor profile analysis AI agent.
 *
 * - recommendFund - A function that handles the fund recommendation process.
 * - InvestorProfileInput - The input type for the recommendFund function.
 * - InvestorProfileOutput - The return type for the recommendFund function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const InvestorProfileSchema = z.object({
  objective: z.string().describe('The main objective of the investor.'),
  horizon: z.string().describe('The investment horizon of the investor.'),
  riskTolerance: z.string().describe('The risk tolerance of the investor.'),
  liquidity: z.string().describe('The liquidity needs of the investor.'),
  initialTicket: z.string().describe('The initial investment amount.'),
  sector: z.string().describe('The sector of interest for the investment.'),
});

const RecommendationSchema = z.object({
  recommendations: z.array(z.object({
    fundSlug: z.string().describe('The unique identifier slug for the recommended fund.'),
    justification: z.string().describe('A brief, one-sentence justification for the recommendation, in Portuguese.'),
  })),
});

export type InvestorProfileInput = z.infer<typeof InvestorProfileSchema>;
export type InvestorProfileOutput = z.infer<typeof RecommendationSchema>;

export async function recommendFund(input: InvestorProfileInput): Promise<InvestorProfileOutput> {
  return recommendFundFlow(input);
}

const recommendFundPrompt = ai.definePrompt({
  name: 'recommendFundPrompt',
  input: { schema: InvestorProfileSchema },
  output: { schema: RecommendationSchema },
  prompt: `
      You are an expert investment advisor for Aquila Fund FCR, a premium investment fund in Portugal.
      Your task is to recommend one or two funds from the list below based on the investor's profile.
      Provide a brief, one-sentence justification for each recommendation, in Portuguese.

      Available Funds:
      - aquila-wheels: Golden Visa eligible, classic cars, high risk/return, 8-year term. Slug: "aquila-wheels".
      - aquila-hotel-invest: Golden Visa eligible, luxury hotels, high growth, 8-year term, annual dividends. Slug: "aquila-hotel-invest".
      - aquila-real-estate: Not for Golden Visa, real estate, moderate risk, stability, 8-year term. Slug: "aquila-real-estate".
      - aquila-agro: Coming soon, agriculture. Slug: "aquila-agro".

      Investor Profile:
      - Main objective: {{{objective}}}
      - Investment horizon: {{{horizon}}}
      - Risk tolerance: {{{riskTolerance}}}
      - Desired liquidity: {{{liquidity}}}
      - Initial ticket: {{{initialTicket}}}
      - Sector of interest: {{{sector}}}

      Heuristics:
      - If objective is 'Golden Visa', prioritize 'aquila-wheels' and 'aquila-hotel-invest'.
      - If risk tolerance is 'Baixa' (Low) or 'Moderada' (Moderate) and objective is 'Proteção patrimonial' (Wealth protection), strongly recommend 'aquila-real-estate'.
      - If horizon is '8+ anos' and risk is 'Alta' (High), favor 'aquila-wheels' and 'aquila-hotel-invest'.
      - If sector is 'Agro', recommend 'aquila-agro' and state it is coming soon in the justification.
      - If sector is specific and not 'Agro', prioritize that fund.
      - Never recommend more than 2 funds.

      Based on this, provide your recommendations.
    `,
    model: 'googleai/gemini-1.5-flash-latest',
    config: {
        temperature: 0.1,
    }
});


const recommendFundFlow = ai.defineFlow(
  {
    name: 'recommendFundFlow',
    inputSchema: InvestorProfileSchema,
    outputSchema: RecommendationSchema,
  },
  async (profile) => {
    const { output } = await recommendFundPrompt(profile);
    if (!output) {
      throw new Error('AI failed to generate a response.');
    }
    return output;
  }
);
