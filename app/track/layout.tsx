// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/landing/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fedex Express",
  description: "Track your package",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={inter.className} 
        suppressHydrationWarning
      >
        <Navbar />
        
        {/* 
            The Navbar is 'fixed', so 'pt-20' (mobile) and 'pt-32' (desktop) 
            ensure your content starts below the navigation bar.
        */}
        <main className="min-h-screen pt-20 md:pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}