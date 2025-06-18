"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ArticleList } from "@/components/news/article-list";
import { FilterBar } from "@/components/news/filter-bar";
import { Header } from "@/components/header";
import { categories as defaultCategories, mockArticles } from "@/lib/data";
import type { Article, Category } from "@/lib/types";

export default function NewsPage() {
   const [articles, setArticles] = useState<Article[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<string>("all");
   const [favorites, setFavorites] = useState<Set<string>>(new Set());

   useEffect(() => {
      // Simulate API call
      const timer = setTimeout(() => {
         setArticles(mockArticles);
         setCategories(defaultCategories);
         setIsLoading(false);
      }, 1000); // Simulate network delay
      return () => clearTimeout(timer);
   }, []);

   const categoriesMap = useMemo(() => {
      const map = new Map<string, string>();
      categories.forEach((cat) => map.set(cat.id, cat.name));
      return map;
   }, [categories]);

   const displayedArticles = useMemo(() => {
      return articles.filter((article) => {
         const categoryMatch = selectedCategory === "all" || article.category === selectedCategory;
         const searchTermMatch =
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.source.toLowerCase().includes(searchTerm.toLowerCase());
         return categoryMatch && searchTermMatch;
      });
   }, [articles, selectedCategory, searchTerm]);

   const toggleFavorite = (articleId: string) => {
      setFavorites((prev) => {
         const newFavorites = new Set(prev);
         if (newFavorites.has(articleId)) {
            newFavorites.delete(articleId);
         } else {
            newFavorites.add(articleId);
         }
         // In a real app, you'd persist this to local storage or a backend
         // For now, it's just client-side state
         console.log("Favorites:", Array.from(newFavorites));
         return newFavorites;
      });
   };

   // Estimate header height for sticky FilterBar positioning.
   // This is a common CSS trick; a more robust solution might involve ResizeObserver.
   useEffect(() => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
         const headerHeight = headerElement.offsetHeight;
         document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
      }
   }, []);

   return (
      <div className="bg-background flex min-h-screen flex-col">
         <Header />
         <main className="container mx-auto grow px-4 py-6">
            <FilterBar
               categories={categories}
               searchTerm={searchTerm}
               onSearchChange={setSearchTerm}
               selectedCategory={selectedCategory}
               onCategoryChange={setSelectedCategory}
            />
            {isLoading && articles.length === 0 ? (
               <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                  <Loader2 className="text-primary h-12 w-12 animate-spin" />
               </div>
            ) : (
               <ArticleList
                  articles={displayedArticles}
                  categoriesMap={categoriesMap}
                  isLoading={isLoading && articles.length > 0} // Show skeleton for subsequent loads if any
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
               />
            )}
         </main>
      </div>
   );
}
