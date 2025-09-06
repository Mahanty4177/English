import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: "Happy Teacher's Day",
  description: "A special Teacher's Day tribute to Subrata Sir.",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full`}>
      <head>
      </head>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-[#050816] via-[#08102a] to-[#061226] text-white font-body antialiased",
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
