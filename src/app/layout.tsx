import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poshpavilion — Stylish & Comfortable Women Sandals",
  description:
    "Discover elegant, comfortable women's sandals at Poshpavilion. Modern fashion crafted for the confident woman. Shop our latest collection and order on WhatsApp.",
  keywords: [
    "Poshpavilion",
    "women sandals",
    "fashion",
    "comfortable sandals",
    "elegant footwear",
    "women fashion",
  ],
  authors: [{ name: "Poshpavilion" }],
  icons: {
    icon: "/logo-poshpavilion.png",
  },
  openGraph: {
    title: "Poshpavilion — Stylish & Comfortable Women Sandals",
    description:
      "Discover elegant, comfortable women's sandals at Poshpavilion. Modern fashion crafted for the confident woman.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
