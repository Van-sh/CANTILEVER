"use server";

/**
 * @fileOverview This file defines a Genkit flow for summarizing news articles.
 *
 * - summarizeArticle - An async function that takes an article's content and returns a concise summary.
 * - SummarizeArticleInput - The input type for the summarizeArticle function, containing the article content.
 * - SummarizeArticleOutput - The output type for the summarizeArticle function, containing the article summary.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SummarizeArticleInputSchema = z.object({
   articleContent: z
      .string()
      .describe("The full text content of the news article to be summarized."),
});
export type SummarizeArticleInput = z.infer<typeof SummarizeArticleInputSchema>;

const SummarizeArticleOutputSchema = z.object({
   summary: z.string().describe("A concise summary of the main points covered in the article."),
   shouldSummarize: z
      .boolean()
      .describe("Whether the article would benefit from summarization or not."),
});
export type SummarizeArticleOutput = z.infer<typeof SummarizeArticleOutputSchema>;

export async function summarizeArticle(
   input: SummarizeArticleInput,
): Promise<SummarizeArticleOutput> {
   return summarizeArticleFlow(input);
}

const summarizeArticlePrompt = ai.definePrompt({
   name: "summarizeArticlePrompt",
   input: { schema: SummarizeArticleInputSchema },
   output: { schema: SummarizeArticleOutputSchema },
   prompt: `You are a highly skilled AI trained to summarize news articles.

  Given the content of a news article, you will generate a concise summary of the main points.
  You will also assess whether the article would benefit from summarization, and set the "shouldSummarize" field appropriately.
  If the article is already very short and concise, or does not contain significant information that needs summarizing, you should set "shouldSummarize" to false.

  Article Content: {{{articleContent}}}
  `,
});

const summarizeArticleFlow = ai.defineFlow(
   {
      name: "summarizeArticleFlow",
      inputSchema: SummarizeArticleInputSchema,
      outputSchema: SummarizeArticleOutputSchema,
   },
   async (input) => {
      const { output } = await summarizeArticlePrompt(input);
      return output!;
   },
);
