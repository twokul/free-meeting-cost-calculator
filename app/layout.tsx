import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { FollowOnX } from "@/components/follow-on-x";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://free-meeting-cost-calculator.com"),
  title: {
    default: "Free Meeting Cost Calculator",
    template: "%s | Meeting Cost Calculator",
  },
  description:
    "Calculate the real cost of your meetings. Connect your Google Calendar and see how much your company spends on meetings.",
  keywords: [
    "meeting cost",
    "meeting calculator",
    "productivity",
    "time management",
    "meeting ROI",
  ],
  authors: [{ name: "twokul", url: "https://x.com/twokul" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Free Meeting Cost Calculator",
    title: "Free Meeting Cost Calculator",
    description:
      "Calculate the real cost of your meetings. Connect your Google Calendar and see how much your company spends on meetings.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@twokul",
    title: "Free Meeting Cost Calculator",
    description:
      "Calculate the real cost of your meetings. Connect your Google Calendar and see how much your company spends on meetings.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1 flex flex-col">{children}</main>
        <FollowOnX />
        <Footer />
      </body>
    </html>
  );
}
