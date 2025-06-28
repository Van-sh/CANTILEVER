"use client";

import { ListFilter, Search } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { type Category } from "@/services/newsAPI";
import { categories } from "@/services/newsAPI/data";

interface FilterBarProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
   selectedCategory: string;
   onCategoryChange: (categoryId: Category) => void;
}

export function FilterBar({
   searchTerm,
   onSearchChange,
   selectedCategory,
   onCategoryChange,
}: FilterBarProps) {
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
   const previousSearchTerm = useRef(searchTerm);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         if (previousSearchTerm.current !== debouncedSearchTerm) {
            onSearchChange(debouncedSearchTerm);
            previousSearchTerm.current = debouncedSearchTerm;
         }
      }, 750);

      return () => {
         clearTimeout(timeoutId);
      };
   }, [debouncedSearchTerm, onSearchChange]);

   const categoryList: ReactNode[] = [];

   for (const category in categories) {
      // @ts-ignore
      categoryList.push(<SelectItem value={category}>{categories[category]}</SelectItem>);
   }

   return (
      <div className="bg-card sticky top-[calc(var(--header-height,68px)+1rem)] z-30 mb-6 rounded-lg p-4 shadow-sm">
         <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative w-full sm:grow">
               <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
               <Input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full pl-10"
                  value={debouncedSearchTerm}
                  onChange={(e) => setDebouncedSearchTerm(e.target.value)}
                  aria-label="Search articles"
               />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[200px]">
               <Select
                  defaultValue="general"
                  value={selectedCategory}
                  onValueChange={onCategoryChange}
               >
                  <SelectTrigger className="w-full" aria-label="Select category">
                     <ListFilter className="text-muted-foreground mr-2 h-5 w-5" />
                     <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>{categoryList}</SelectContent>
               </Select>
            </div>
         </div>
      </div>
   );
}
