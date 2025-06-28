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

export type ArticleResponse = {
   totalArticles: number;
   articles: Article[];
};

const baseURL = "https://gnews.io/api/v4";
const useMockData = env.NODE_ENV === "development";

const newsAPI = {
   getTopHeadlines: async (query: string, category: Category) => {
      const queryParams = new URLSearchParams({ apikey: env.GNEWS_API_KEY, lang: "en" });
      if (query) {
         queryParams.set("q", query);
      }
      if (category) {
         queryParams.set("category", category);
      }
      const response = await axios.get<ArticleResponse>(
         `${baseURL}/top-headlines?${queryParams.toString()}`,
      );

      // TODO: Add error handling for gnews api request

      if (useMockData) {
         const articles = Object.values(mockArticles).flat();

         const mockTopHeadlines = articles;
         response.data.articles.unshift(...mockTopHeadlines);
         response.data.totalArticles += articles.length;
      }
      return response.data;
   },
};
export default newsAPI;
