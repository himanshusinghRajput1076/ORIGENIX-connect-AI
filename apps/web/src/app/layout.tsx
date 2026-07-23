import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Origenix Connect AI — Discover Investors, Founders & Startups",
  description:
    "AI-powered intelligence platform for discovering and analyzing investors, founders, VCs, startups, and companies. Find your next investment opportunity or perfect co-founder.",
  keywords: [
    "investor discovery",
    "startup finder",
    "VC database",
    "founder search",
    "AI lead scoring",
    "startup intelligence",
    "investment analysis",
  ],
  openGraph: {
    title: "Origenix Connect AI",
    description: "AI-powered investor & startup intelligence platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
