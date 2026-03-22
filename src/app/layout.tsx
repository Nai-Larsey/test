import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academy Portal",
  description: "Next-generation educational management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased font-inter`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="pl-64 flex-1 flex flex-col bg-slate-50/50">
          {children}
        </main>
      </body>
    </html>
  );
}
