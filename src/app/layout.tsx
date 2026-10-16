import type { Metadata } from "next";
import { SITE_URL as siteUrl, alternatesFor } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ArsonistAI: AI Integration Firm | Human-Centered AI Solutions",
    template: "%s — ArsonistAI",
  },
  description:
    "ArsonistAI is an AI integration firm building accessible, scalable, and human-centered AI solutions. We offer custom MCP servers, Openclaw setup, Claude and Cursor training, content generation, and operations consulting.",
  keywords: [
    "AI integration firm",
    "AI integration services",
    "AI integration consulting",
    "AI consulting",
    "MCP server development",
    "Model Context Protocol",
    "Claude Code training",
    "Cursor training",
    "Openclaw installation",
    "human-centered AI",
    "AI content generation",
    "AI strategy",
    "AI operations consulting",
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
    title: "ArsonistAI: AI Integration Firm | Human-Centered AI Solutions",
    description:
      "AI integration firm: custom MCP servers, Openclaw setup, Claude and Cursor training, and operations consulting. Making AI accessible, scalable, and human-centered.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ArsonistAI: AI Integration Firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArsonistAI: AI Integration Firm | Human-Centered AI Solutions",
    description:
      "AI integration firm: custom MCP servers, Openclaw setup, Claude and Cursor training, and operations consulting.",
    images: ["/images/og-image.jpg"],
  },
  // `/` redirects to `/en`, so the default canonical must be the locale root,
  // never the bare origin.
  alternates: alternatesFor("en"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? [],
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
