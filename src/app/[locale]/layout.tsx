import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import EmberBackgroundWrapper from "@/components/EmberBackgroundWrapper";
import HeatWaveFilter from "@/components/HeatWaveFilter";
import SecurityGuard from "@/components/SecurityGuard";
import LineFitter from "@/components/LineFitter";
import { SITE_URL, ORG_ID, WEBSITE_ID } from "@/lib/seo";
import { services } from "@/content/services";
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
  const t = await getTranslations({ locale });

  // Declared once here with a stable @id. Every other page references it as
  // { "@id": ORG_ID } instead of restating a partial copy of the organization.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: "ArsonistAI",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/Logo_Orange.svg`,
    },
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      "AI integration firm building custom MCP servers, chatbot audits, voice agents, AI workflow automation, and LLM cost optimization.",
    email: "hello@arsonistai.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@arsonistai.com",
      contactType: "sales",
      availableLanguage: ["en", "es"],
    },
    areaServed: "Worldwide",
    // Derived from the service catalog so the schema cannot drift from the site.
    serviceType: services.map((service) => t(service.titleKey)),
    // Keep in sync with the social links in Footer.tsx.
    sameAs: [
      "https://www.instagram.com/arsonistai/",
      "https://www.linkedin.com/company/arsonistai/",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "AI Integration",
      "AI Agents",
      "Model Context Protocol",
      "AI Consulting",
      "Chatbot Testing",
      "Voice AI Agents",
      "AI Workflow Automation",
      "LLM Cost Optimization",
      "Claude Code",
      "Cursor",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "ArsonistAI",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: [locale === "es" ? "es" : "en"],
    description:
      "AI integration firm: custom MCP servers, chatbot audits, voice agents, workflow automation, LLM cost optimization, and Claude and Cursor training.",
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
        <LineFitter />
      </body>
    </html>
  );
}
