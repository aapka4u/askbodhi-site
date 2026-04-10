import type { Metadata } from "next";
import { Lora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebSiteJsonLd, ServiceJsonLd } from "@/components/JsonLd";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://askbodhi.com"),
  title: {
    default: "AskBodhi — AI-Led Growth for Forward-Thinking Companies",
    template: "%s | AskBodhi",
  },
  description:
    "AskBodhi helps companies grow through AI-led SEO, Generative Engine Optimization, custom AI engines, and digital diagnostics. Based in the Netherlands, serving globally.",
  keywords: [
    "AI consulting",
    "generative engine optimization",
    "GEO",
    "SEO advies",
    "AI-led growth",
    "ai consultant",
    "seo consultant",
    "ai agency",
  ],
  authors: [{ name: "Rajul", url: "https://askbodhi.com/about" }],
  creator: "AskBodhi",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "nl_NL",
    url: "https://askbodhi.com",
    siteName: "AskBodhi",
    title: "AskBodhi — AI-Led Growth for Forward-Thinking Companies",
    description:
      "SEO & GEO optimization, custom AI engines, digital diagnostics, and growth strategy. See clearly. Act decisively. Grow intelligently.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AskBodhi — AI-Led Growth for Forward-Thinking Companies",
    description:
      "SEO & GEO optimization, custom AI engines, digital diagnostics, and growth strategy.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${geistMono.variable}`}>
      <head>
        {/* Instrument Sans from Fontsource CDN */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ServiceJsonLd />
        {children}
      </body>
    </html>
  );
}
