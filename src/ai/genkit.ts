import { genkit, type Genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { env } from "@/env";

/**
 * Cache the genkit server in development
 */
const globalForAi = globalThis as unknown as {
   ai: Genkit | null;
};

export const ai =
   globalForAi.ai ??
   genkit({
      plugins: [
         googleAI({
            apiKey: env.GEMINI_API_KEY,
         }),
      ],
      model: "googleai/gemini-2.0-flash",
   });
if (env.NODE_ENV !== "production") globalForAi.ai = ai;
