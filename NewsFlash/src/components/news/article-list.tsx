"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/lib/types";
import { ArticleCard } from "./article-card";

interface ArticleListProps {
   articles: Article[];
   categoriesMap: Map<string, string>;
   isLoading: boolean;
   favorites: Set<string>;
   onToggleFavorite: (articleId: string) => void;
}

export function ArticleList({
   articles,
   categoriesMap,
   isLoading,
   favorites,
   onToggleFavorite,
}: ArticleListProps) {
   if (isLoading) {
      return (
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
               <CardSkeleton key={index} />
            ))}
         </div>
      );
   }

   if (articles.length === 0) {
      return (
         <div className="py-10 text-center">
            <h2 className="mb-2 text-2xl font-semibold">No Articles Found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
         </div>
      );
   }

   return (
      <div className="animate-fadeIn grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {articles.map((article) => (
            <ArticleCard
               key={article.id}
               article={article}
               isFavorite={favorites.has(article.id)}
               onToggleFavorite={onToggleFavorite}
               categoryName={categoriesMap.get(article.category)}
            />
         ))}
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

// TODO: Basic fadeIn animation (add to globals.css or tailwind.config if preferred)
// For simplicity, using a style tag here, but ideally in CSS.
// Tailwind doesn't have a built-in fadeIn animation class by default.
// Adding this via CSS is better practice.
if (typeof window !== "undefined") {
   const style = document.createElement("style");
   style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
   document.head.appendChild(style);
}
