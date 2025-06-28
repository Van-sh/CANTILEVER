import "server-only";

import axios from "axios";

import { env } from "@/env";
import { mockArticles } from "./data";

export type Category =
   | "general"
   | "world"
   | "nation"
   | "business"
   | "technology"
   | "entertainment"
   | "sports"
   | "science"
   | "health";

export type Source = {
   name: string;
   url: string;
};

export type Article = {
   title: string;
   description: string;
   content: string; // Full content for summarization
   source: Source;
   url: string;
   image?: string;
   publishedAt: string; // ISO date string
};

export type ArticleSuccessResponse = {
   totalArticles: number;
   articles: Article[];
   error: undefined;
};

export type ArticleErrorResponse = {
   totalArticles: undefined;
   articles: undefined;
   error: string;
};

export type ArticleResponse = ArticleSuccessResponse | ArticleErrorResponse;

const baseURL = "https://gnews.io/api/v4";
const useMockData = env.NODE_ENV === "development";

const newsAPI = {
   getTopHeadlines: async (query: string | null, category: Category | null) => {
      const queryParams = new URLSearchParams({ apikey: env.GNEWS_API_KEY, lang: "en" });
      if (query) {
         queryParams.set("q", query);
      }
      if (category) {
         queryParams.set("category", category);
      }

      let apiResponse: ArticleSuccessResponse = {} as ArticleSuccessResponse;
      try {
         const response = await axios.get<ArticleSuccessResponse>(
            `${baseURL}/top-headlines?${queryParams.toString()}`,
         );
         apiResponse = response.data;

         // TODO: Add error handling for gnews api request

         if (useMockData) {
            const articles = Object.values(mockArticles).flat();
            let filteredMockArticles: Article[] = [];

            if (category && category !== "general") {
               filteredMockArticles = mockArticles[category] || [];
            } else {
               filteredMockArticles = articles;
            }

            if (query) {
               const lowerCaseQuery = query.toLowerCase();
               filteredMockArticles = filteredMockArticles.filter(
                  (article) =>
                     article.title.toLowerCase().includes(lowerCaseQuery) ||
                     article.description.toLowerCase().includes(lowerCaseQuery) ||
                     article.content.toLowerCase().includes(lowerCaseQuery),
               );
            }

            apiResponse.articles.unshift(...filteredMockArticles);
            apiResponse.totalArticles += articles.length;
         }
         return apiResponse;
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.errors?.[0] || error.message;

            switch (status) {
               case 400:
                  console.error("[GNEWS_API_ERROR] Bad Request:", message);
                  return {
                     error: "Your request to the news service was invalid.",
                  };
               case 401:
                  console.error("[GNEWS_API_ERROR] Unauthorized:", message);
                  return {
                     error: "Invalid GNews API key. Please check your .env file.",
                  };
               case 403:
                  console.error("[GNEWS_API_ERROR] Forbidden:", message);
                  return {
                     error: "You have reached your daily quota for the news service.",
                  };
               case 429:
                  console.error("[GNEWS_API_ERROR] Too Many Requests:", message);
                  return {
                     error: "Too many requests to the news service. Please try again later.",
                  };
               case 500:
                  console.error("[GNEWS_API_ERROR] Internal Server Error:", message);
                  return {
                     error: "The news service is experiencing internal problems.",
                  };
               case 503:
                  console.error("[GNEWS_API_ERROR] Service Unavailable:", message);
                  return {
                     error: "The news service is temporarily unavailable for maintenance.",
                  };
               default:
                  console.error("[GNEWS_API_ERROR] Failed to fetch articles:", message);
                  return {
                     error: `Failed to fetch articles from the news service (status ${status}).`,
                  };
            }
         }
         console.error("[GNEWS_API_ERROR] An unexpected error occurred:", error);
         return {
            error: "An unexpected error occurred while fetching news.",
         };
      }
   },
};
export default newsAPI;
