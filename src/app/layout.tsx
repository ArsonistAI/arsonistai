import type { Metadata } from "next";

const siteUrl = "https://arsonistai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ArsonistAI — AI Design Firm | Human-Centered AI Solutions",
    template: "%s — ArsonistAI",
  },
  description:
    "ArsonistAI is an AI design firm building accessible, scalable, and human-centered AI solutions. We offer AI-powered content generation, concept visualization, product design, and operations consulting.",
  keywords: [
    "AI design firm",
    "AI design agency",
    "AI consulting",
    "AI product design",
    "human-centered AI",
    "AI content generation",
    "concept visualization",
    "AI UX design",
    "AI-powered design",
    "artificial intelligence design",
    "AI strategy",
    "AI operations consulting",
    "machine learning design",
    "AI solutions",
    "Arsonist AI",
  ],
  authors: [{ name: "ArsonistAI", url: siteUrl }],
  creator: "ArsonistAI",
  publisher: "ArsonistAI",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: siteUrl,
    siteName: "ArsonistAI",
    title: "ArsonistAI — AI Design Firm | Human-Centered AI Solutions",
    description:
      "AI design firm specializing in content generation, concept visualization, product design, and operations consulting. Making AI accessible, scalable, and human-centered.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArsonistAI — AI Design Firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArsonistAI — AI Design Firm | Human-Centered AI Solutions",
    description:
      "AI design firm specializing in content generation, concept visualization, product design, and operations consulting.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}/en`,
      es: `${siteUrl}/es`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
