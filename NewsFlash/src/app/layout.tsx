import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
   title: "NewsFlash",
   description: "Aggregated news from various sources, with summaries and favorites.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: ReactNode;
}>) {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <html lang="en" suppressHydrationWarning>
            <head>
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
               <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                  rel="stylesheet"
               />
            </head>
            <body className="font-body antialiased">
               {children}
               <Toaster />
            </body>
         </html>
      </ThemeProvider>
   );
}
