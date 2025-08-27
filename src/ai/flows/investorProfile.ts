import { ai } from '@/ai/genkit';
import { flow } from 'genkit/flow';
import { z } from 'zod';

const InvestorProfileSchema = z.object({
  objective: z.string(),
  horizon: z.string(),
  riskTolerance: z.string(),
  liquidity: z.string(),
  initialTicket: z.string(),
  sector: z.string(),
});

export const recommendFundFlow = flow(
  {
    name: 'recommendFundFlow',
    inputSchema: InvestorProfileSchema,
    outputSchema: z.object({
      recommendations: z.array(z.object({
        fundSlug: z.string(),
        justification: z.string(),
      })),
    }),
  },
  async (profile) => {
    const prompt = `
      You are an expert investment advisor for Aquila Fund FCR, a premium investment fund in Portugal.
      Your task is to recommend one or two funds from the list below based on the investor's profile.
      Provide a brief, one-sentence justification for each recommendation, in Portuguese.

      Available Funds:
      - aquila-wheels: Golden Visa eligible, classic cars, high risk/return, 8-year term. Slug: "aquila-wheels".
      - aquila-hotel-invest: Golden Visa eligible, luxury hotels, high growth, 8-year term, annual dividends. Slug: "aquila-hotel-invest".
      - aquila-real-estate: Not for Golden Visa, real estate, moderate risk, stability, 8-year term. Slug: "aquila-real-estate".
      - aquila-agro: Coming soon, agriculture. Slug: "aquila-agro".

      Investor Profile:
      - Main objective: ${profile.objective}
      - Investment horizon: ${profile.horizon}
      - Risk tolerance: ${profile.riskTolerance}
      - Desired liquidity: ${profile.liquidity}
      - Initial ticket: ${profile.initialTicket}
      - Sector of interest: ${profile.sector}

      Heuristics:
      - If objective is 'Golden Visa', prioritize 'aquila-wheels' and 'aquila-hotel-invest'.
      - If risk tolerance is 'Baixa' (Low) or 'Moderada' (Moderate) and objective is 'Proteção patrimonial' (Wealth protection), strongly recommend 'aquila-real-estate'.
      - If horizon is '8+ anos' and risk is 'Alta' (High), favor 'aquila-wheels' and 'aquila-hotel-invest'.
      - If sector is 'Agro', recommend 'aquila-agro' and state it is coming soon in the justification.
      - If sector is specific and not 'Agro', prioritize that fund.
      - Never recommend more than 2 funds.

      Based on this, provide your recommendations in JSON format. Do not include any other text.
      The entire output must be a single, valid JSON object.
      Example response format:
      {
        "recommendations": [
          {
            "fundSlug": "aquila-wheels",
            "justification": "Este fundo alinha-se ao seu interesse em ativos de alto crescimento e é elegível para o Golden Visa."
          }
        ]
      }
    `;

    const llmResponse = await ai.generate({
      prompt,
      model: 'googleai/gemini-1.5-flash-latest',
      config: { temperature: 0.1 },
      output: { format: 'json' },
    });
    
    const response = llmResponse.output();
    if (!response) {
      throw new Error('AI failed to generate a response.');
    }
    
    // Basic validation of the AI output
    const parsed = z.object({
      recommendations: z.array(z.object({
        fundSlug: z.string(),
        justification: z.string(),
      })).optional(),
    }).safeParse(response);
    
    if (!parsed.success) {
        console.error("AI output validation failed", parsed.error);
        throw new Error("AI returned data in an unexpected format.");
    }

    return { recommendations: parsed.data.recommendations || [] };
  }
);
