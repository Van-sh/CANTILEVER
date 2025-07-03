import { usePagination } from "@/components/hooks/use-pagination";
import { buttonVariants } from "@/components/ui/button";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type JoinedPaginationProps = {
   currentPage: number;
   totalPages: number;
   paginationItemsToDisplay?: number;
   onPageChange: (page: number) => void;
};

function JoinedPagination({
   currentPage,
   totalPages,
   paginationItemsToDisplay = 5,
   onPageChange,
}: JoinedPaginationProps) {
   const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
      currentPage,
      totalPages,
      paginationItemsToDisplay,
   });

   const handlePageChange = (page: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (page >= 1 && page <= totalPages) {
         onPageChange(page);
      }
   };

   return (
      <Pagination>
         <PaginationContent className="border-card-border inline-flex gap-0 -space-x-px rounded-lg border shadow-sm shadow-black/5 rtl:space-x-reverse">
            <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
               <PaginationPrevious
                  className={cn(
                     buttonVariants({
                        variant: "outline",
                     }),
                     "rounded-lg rounded-r-none border-0 shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
                  )}
                  onClick={handlePageChange(currentPage - 1)}
                  aria-label="Go to previous page"
                  aria-disabled={currentPage === 1}
                  disabled={currentPage === 1}
               />
            </PaginationItem>

            {showLeftEllipsis && (
               <PaginationItem>
                  <PaginationEllipsis
                     className={cn(
                        buttonVariants({
                           variant: "outline",
                        }),
                        "pointer-events-none rounded-none border-0 shadow-none",
                     )}
                  />
               </PaginationItem>
            )}

            {pages.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     className={cn(
                        buttonVariants({
                           variant: "outline",
                        }),
                        "rounded-none border-0 shadow-none focus-visible:z-10",
                        page === currentPage && "bg-accent hover:bg-accent/80",
                     )}
                     onClick={handlePageChange(page)}
                     isActive={page === currentPage}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {showRightEllipsis && (
               <PaginationItem>
                  <PaginationEllipsis
                     className={cn(
                        buttonVariants({
                           variant: "outline",
                        }),
                        "pointer-events-none rounded-none border-0 shadow-none",
                     )}
                  />
               </PaginationItem>
            )}

            <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
               <PaginationNext
                  className={cn(
                     buttonVariants({
                        variant: "outline",
                     }),
                     "rounded-lg rounded-l-none border-0 shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
                  )}
                  onClick={handlePageChange(currentPage + 1)}
                  aria-label="Go to next page"
                  aria-disabled={currentPage === totalPages}
                  disabled={currentPage === totalPages}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}

export { JoinedPagination };
