import type { Metadata } from "next";
import { Lora, Geist_Mono, Instrument_Sans } from "next/font/google";
import "../globals.css";
import "../components.css";
import { OrganizationJsonLd, WebSiteJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";
import { Providers } from "./provider";

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

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://askbodhi.ai"),
  title: {
    default: "AskBodhi — AI-Led Growth for Forward-Thinking Companies",
    template: "%s | AskBodhi",
  },
  description:
    "AskBodhi helps companies grow through AI-led SEO, Generative Engine Optimization, custom AI engines, and digital diagnostics. Based in the Netherlands, serving globally.",
  authors: [{ name: "RM", url: "https://askbodhi.ai" }],
  creator: "AskBodhi",
  alternates: {
    canonical: "https://askbodhi.ai",
    languages: {
      "en": "https://askbodhi.ai/en",
      "nl": "https://askbodhi.ai/nl",
      "x-default": "https://askbodhi.ai/nl",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "nl_NL",
    url: "https://askbodhi.ai",
    siteName: "AskBodhi",
    title: "AskBodhi — AI-Led Growth for Forward-Thinking Companies",
    description:
      "SEO & GEO optimization, custom AI engines, digital diagnostics, and growth strategy for companies that deserve to be found.",
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const langAttribute = locale === "nl" ? "nl" : "en";
  const alternateLinks = [
    { hreflang: "nl", href: "https://askbodhi.ai/nl" },
    { hreflang: "en", href: "https://askbodhi.ai/en" },
    { hreflang: "x-default", href: "https://askbodhi.ai/nl" },
  ];

  return (
    <html lang={langAttribute} className={`${lora.variable} ${geistMono.variable} ${instrumentSans.variable}`}>
      <head>
        {alternateLinks.map((link) => (
          <link
            key={link.hreflang}
            rel="alternate"
            hrefLang={link.hreflang}
            href={link.href}
          />
        ))}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ServiceJsonLd />
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
