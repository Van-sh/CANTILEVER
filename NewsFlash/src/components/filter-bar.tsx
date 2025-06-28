"use client";

import { Search, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { categories } from "@/services/newsAPI/data";
interface FilterBarProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
   selectedCategory: string;
   onCategoryChange: (categoryId: string) => void;
}

export function FilterBar({
   searchTerm,
   onSearchChange,
   selectedCategory,
   onCategoryChange,
}: FilterBarProps) {
   return (
      <div className="bg-card sticky top-[calc(var(--header-height,68px)+1rem)] z-30 mb-6 rounded-lg p-4 shadow-sm">
         <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative w-full sm:grow">
               <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
               <Input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search articles"
               />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[200px]">
               <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="w-full" aria-label="Select category">
                     <ListFilter className="text-muted-foreground mr-2 h-5 w-5" />
                     <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Categories</SelectItem>
                     {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                           {category}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
         </div>
      </div>
   );
}
