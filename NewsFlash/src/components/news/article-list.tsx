"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleResponse, Category } from "@/services/newsAPI";
import { ArticleCard } from "./article-card";
import BlankScreen from "../blank-screen";

interface ArticleListProps {
   searchTerm: string;
   selectedCategory: Category;
}

function getSearchParams(query: string, category: Category) {
   const searchParams = new URLSearchParams();
   if (query) {
      searchParams.set("q", query);
   }
   if (category) {
      searchParams.set("category", category);
   }
   return searchParams.toString();
}

export function ArticleList({ searchTerm, selectedCategory }: ArticleListProps) {
   const query = useQuery({
      queryKey: ["top-headline", searchTerm, selectedCategory],
      queryFn: async () =>
         await axios.get<ArticleResponse>(
            `/api/news/top-headlines?${getSearchParams(searchTerm, selectedCategory)}`,
         ),
      staleTime: 1000 * 60 * 5, // 5 minutes
   });

   if (query.isLoading) {
      return (
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
               <CardSkeleton key={index} />
            ))}
         </div>
      );
   }

   if (query.data?.data.error !== undefined) {
      return <BlankScreen message={query.data?.data.error} onButtonClick={() => query.refetch} />;
   }

   if (query.data?.data.articles.length === 0) {
      return (
         <div className="py-10 text-center">
            <h2 className="mb-2 text-2xl font-semibold">No Articles Found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
         </div>
      );
   }

   return (
      <div className="animate-fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {query.data?.data.articles.map((article, i) => <ArticleCard key={i} article={article} />)}
      </div>
   );
}

const CardSkeleton = () => (
   <div className="bg-card space-y-3 rounded-lg p-4 shadow-sm">
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <div className="flex justify-end gap-2 pt-2">
         <Skeleton className="h-8 w-24" />
         <Skeleton className="h-8 w-24" />
      </div>
   </div>
);
