import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

export default function BlankScreen() {
   const emoji = useRef(emojis[Math.floor(Math.random() * emojis.length)]);

   return (
      <main className="px-6 py-24 text-center">
         <p className="text-7xl">{emoji.current}</p>
         <p className="mt-4 text-3xl font-bold">Please Sign in</p>
         <Button className="mt-10" asChild>
            <Link href={"/sign-in"}>
               <LogIn className="mr-2 h-4 w-4" />
               Sign In
            </Link>
         </Button>
      </main>
   );
}

const emojis = [
   "😕",
   "🫤",
   "😟",
   "🙁",
   "☹️",
   "😮",
   "😯",
   "😲",
   "😳",
   "🥺",
   "🥹",
   "😦",
   "😧",
   "😨",
   "😰",
   "😥",
   "😢",
   "😭",
   "😱",
   "😖",
   "😣",
   "😞",
   "😓",
   "😩",
   "😫",
];
