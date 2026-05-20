import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SwiftCab — The Future of Urban Mobility",
  description:
    "AI-powered cab booking that feels like magic. Smart routes, premium rides, joyful travel — built for the cities of tomorrow.",
  keywords: [
    "cab booking",
    "futuristic taxi",
    "AI mobility",
    "premium rides",
    "airport transfer",
    "smart transportation",
  ],
  authors: [{ name: "SwiftCab" }],
  openGraph: {
    title: "SwiftCab — The Future of Urban Mobility",
    description:
      "AI-powered cab booking that feels like magic. Smart routes, premium rides, joyful travel.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-ink-950 text-white antialiased selection:bg-sunny-400 selection:text-ink-950">
        {children}
      </body>
    </html>
  );
}
