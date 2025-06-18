export interface Category {
   id: string;
   name: string;
}

export interface Article {
   id: string;
   title: string;
   description: string;
   content: string; // Full content for summarization
   source: string;
   url: string;
   imageUrl?: string;
   publishedAt: string; // ISO date string
   category: string; // Category ID
}
