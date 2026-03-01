import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import EmberBackgroundWrapper from "@/components/EmberBackgroundWrapper";
import HeatWaveFilter from "@/components/HeatWaveFilter";
import SecurityGuard from "@/components/SecurityGuard";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  setRequestLocale(locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ArsonistAI",
    url: "https://arsonistai.com",
    logo: "https://arsonistai.com/Logo_Orange.svg",
    description:
      "AI design firm building accessible, scalable, and human-centered AI solutions.",
    email: "hello@arsonistai.com",
    sameAs: [
      "https://www.instagram.com/arsonistai/",
      "https://www.linkedin.com/company/arsonistai/",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "AI Design",
      "Product Design",
      "UX Design",
      "AI Consulting",
      "Content Generation",
      "Concept Visualization",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ArsonistAI",
    url: "https://arsonistai.com",
    inLanguage: [locale === "es" ? "es" : "en"],
    description:
      "AI design firm specializing in content generation, concept visualization, product design, and operations consulting.",
  };

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        <script
          id="organization-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <EmberBackgroundWrapper />
        <HeatWaveFilter />
        <NextIntlClientProvider locale={locale}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-lava focus:text-background focus:rounded-shape-md focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <CustomCursor />
        <SecurityGuard />
      </body>
    </html>
  );
}
