"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren, useEffect, useState } from "react";

import { Header } from "@/components/header";
import { ArticleList } from "@/components/news/article-list";
import { FilterBar } from "@/components/news/filter-bar";
import { Toaster } from "sonner";

export default function NewsPage() {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<string>("");

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
      <Providers>
         <div className="bg-background flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto grow px-4 py-6">
               <FilterBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
               />
               <ArticleList searchTerm={searchTerm} selectedCategory={selectedCategory} />
            </main>
         </div>
      </Providers>
   );
}

type ProvidersProps = PropsWithChildren;

function Providers({ children }: ProvidersProps) {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <QueryClientProvider client={new QueryClient()}>
            {children}
            <Toaster />
         </QueryClientProvider>
      </ThemeProvider>
   );
}
