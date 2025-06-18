"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { LogIn, LogOut, Newspaper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
   const { data } = useSession();
   const router = useRouter();

   return (
      <header className="bg-card sticky top-0 z-40 shadow-xs">
         <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <Link
               href="/"
               className="text-primary flex items-center gap-2 transition-opacity hover:opacity-80"
            >
               <Newspaper className="h-8 w-8" />
               <h1 className="font-headline text-2xl font-bold">NewsFlash</h1>
            </Link>

            {data?.user ? (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                           <AvatarImage
                              src={data.user.image!}
                              alt="User Avatar"
                              data-ai-hint="profile avatar"
                           />
                           <AvatarFallback>
                              {/* Get first two name initials */}
                              {data.user.name
                                 .split(" ")
                                 .map((name) => name[0])
                                 .join("")
                                 .substring(0, 2)}
                           </AvatarFallback>
                        </Avatar>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                     <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                           <p className="text-sm leading-none font-medium">{data.user.name}</p>
                           <p className="text-muted-foreground text-xs leading-none">
                              {data.user.email}
                           </p>
                        </div>
                     </DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : (
               <Button onClick={() => router.push("/sign-in")} variant="outline">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
               </Button>
            )}
         </div>
      </header>
   );
}
