"use client";

import { format, parseISO } from "date-fns";
import { BookOpenText, CalendarDays, FileText, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { summarizeArticle, type SummarizeArticleOutput } from "@/ai/flows/summarize-article";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Article } from "@/services/newsAPI/";
import { toast } from "sonner";

interface ArticleCardProps {
   article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
   const [isSummarizing, setIsSummarizing] = useState(false);
   const [summaryResult, setSummaryResult] = useState<SummarizeArticleOutput | null>(null);
   const [showSummaryDialog, setShowSummaryDialog] = useState(false);

   const handleSummarize = async () => {
      setIsSummarizing(true);
      setSummaryResult(null);
      try {
         const result = await summarizeArticle({ articleContent: article.content });
         setSummaryResult(result);
         setShowSummaryDialog(true);
      } catch (error) {
         console.error("Error summarizing article:", error);
         toast.error("Error Summarizing", {
            description: "Could not summarize the article. Please try again later.",
         });
      } finally {
         setIsSummarizing(false);
      }
   };

   const formattedDate = format(parseISO(article.publishedAt), "MMM d, yyyy");

   return (
      <>
         <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
               {article.image && (
                  <div className="relative mb-4 h-48 w-full overflow-hidden rounded-t-lg">
                     <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        data-ai-hint="news article"
                        priority={false}
                     />
                  </div>
               )}
               <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
               >
                  <CardTitle className="font-headline text-lg leading-tight">
                     {article.title}
                  </CardTitle>
               </Link>
               <CardDescription className="pt-1 text-sm">
                  <span className="font-medium">{article.source.name}</span>
                  <div className="text-muted-foreground mt-1 flex items-center text-xs">
                     <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                     {formattedDate}
                  </div>
               </CardDescription>
            </CardHeader>
            <CardContent className="grow">
               <p className="text-muted-foreground line-clamp-3 text-sm">{article.description}</p>
            </CardContent>
            <CardFooter className="flex justify-center gap-2 pt-4">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  aria-label="Summarize article"
               >
                  {isSummarizing ? (
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                     <FileText className="mr-2 h-4 w-4" />
                  )}
                  Summarize
               </Button>
               <Button size="sm" asChild variant="default">
                  <Link href={article.url} target="_blank" rel="noopener noreferrer">
                     Read More
                     <BookOpenText className="ml-2 h-4 w-4" />
                  </Link>
               </Button>
            </CardFooter>
         </Card>

         <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
            <DialogContent className="sm:max-w-[625px]">
               <DialogHeader>
                  <DialogTitle className="font-headline">Article Summary</DialogTitle>
                  <DialogDescription>AI-generated summary for: {article.title}</DialogDescription>
               </DialogHeader>
               <ScrollArea className="max-h-[60vh] pr-6">
                  {summaryResult ? (
                     summaryResult.shouldSummarize && summaryResult.summary ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                           {summaryResult.summary}
                        </p>
                     ) : (
                        <p className="text-muted-foreground text-sm">
                           This article is already concise or does not require a summary at this
                           time.
                        </p>
                     )
                  ) : (
                     <div className="flex h-20 items-center justify-center">
                        <Loader2 className="text-primary h-8 w-8 animate-spin" />
                     </div>
                  )}
               </ScrollArea>
            </DialogContent>
         </Dialog>
      </>
   );
}
