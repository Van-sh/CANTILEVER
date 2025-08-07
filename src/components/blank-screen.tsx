import { MouseEventHandler, useRef } from "react";

import { Button } from "@/components/ui/button";

export type BlankScreenProps = {
   message: string;
   onButtonClick: MouseEventHandler<HTMLButtonElement>;
};

export default function BlankScreen({ message, onButtonClick }: BlankScreenProps) {
   const emoji = useRef(emojis[Math.floor(Math.random() * emojis.length)]);

   return (
      <main className="px-6 py-24 text-center">
         <p className="text-7xl">{emoji.current}</p>
         <p className="mt-4 text-3xl font-bold">{message}</p>
         <Button className="mt-10" onClick={onButtonClick} asChild>
            Retry
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
