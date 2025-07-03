"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";

import AuthErrorScreen from "@/components/auth-error-screen";
import { FilterBar } from "@/components/filter-bar";
import { Header } from "@/components/header";
import { ArticleList } from "@/components/news/article-list";
import { useSession } from "@/lib/auth-client";
import { type Category } from "@/services/newsAPI";

export default function NewsPage() {
   const session = useSession();

   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<Category>("general");

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
      <QueryClientProvider client={new QueryClient()}>
         <div className="bg-background flex min-h-screen flex-col">
            <Header />
            {session.data ? (
               <main className="container mx-auto grow px-4 py-6">
                  <FilterBar
                     searchTerm={searchTerm}
                     onSearchChange={setSearchTerm}
                     selectedCategory={selectedCategory}
                     onCategoryChange={setSelectedCategory}
                  />
                  <ArticleList searchTerm={searchTerm} selectedCategory={selectedCategory} />
               </main>
            ) : (
               <AuthErrorScreen />
            )}
         </div>
      </QueryClientProvider>
   );
}
