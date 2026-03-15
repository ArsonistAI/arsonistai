export interface CaseStudy {
  slug: string;
  title: string;
  /** Optional display name for listing pages (e.g. "Hello Cloud IT") */
  displayName?: string;
  client: string;
  url: string;
  heroImage: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "hello-cit",
    title: "Interactive Website for Hello CIT",
    displayName: "Hello Cloud IT",
    client: "Hello CIT",
    url: "https://www.hellocit.com/",
    heroImage: "/images/work/hello-cit-hero.png",
    summary:
      "The Hello CIT marketing website was delivered as a modern, bilingual (English/Spanish) site built with Next.js App Router and optional WordPress headless integration. The scope included full design implementation—Hero, Solutions, Testimonials, FAQ, Team, Contact, Blog preview, Footer—a working contact form with reliable email delivery via Brevo, comprehensive SEO, scroll animations, and legal pages. The outcome is a production-ready site at https://www.hellocit.com, deployed on Vercel, with contact form submissions sent as HTML emails to the client via Brevo's API and indexing and social previews correctly configured for search and sharing.",
    sections: [
      {
        heading: "The Challenge",
        body: "Hello CIT needed a modern, bilingual marketing website that could communicate their technology offerings—AI factories, digital agents, and infrastructure solutions—to enterprise clients across Latin America. In the headless setup, the contact form originally posted to WordPress (WPForms); WordPress returned 200/302, but WPForms did not process submissions (nonce/backend not triggered), so no notification emails were sent. Reliable contact capture and email delivery were essential for the site to be production-ready.",
      },
      {
        heading: "Our Approach",
        body: "We delivered the site using the Next.js App Router with full design implementation across all requested sections: Hero, Solutions, Testimonials, FAQ, Team, Contact form, Blog preview, and Footer. Content and UI are localized via a language toggle (English/Spanish), with optional WordPress (WPGraphQL) for posts, team, FAQ, and footer data, and fallback content in content/ for both locales. Styling used Tailwind CSS with design tokens (brand-blue, ink), Plus Jakarta Sans for typography, and the site was structured for deployment on Vercel with production alias www.hellocit.com.",
      },
      {
        heading: "Key Features",
        body: "The home page includes a Hero with headline, CTA, language switcher (Español/English), navigation, and rows for Marcas and Certificaciones. A Solutions card grid with 100px icons and titles links to solution detail pages (e.g. Hello Infrastructure, Hello Agents). Testimonials, an FAQ accordion with a \"more questions\" CTA, and a Team section with member cards follow. The ContactForm is a client component with name, email, product-of-interest dropdown (eight products plus \"Other\"), and message; it POSTs to /api/contact with loading, success, and error states and a double-submit guard. A BlogPreviewWidget shows the latest three posts with images, date, title, excerpt, and \"Read more\" links. ScrollReveal uses Intersection Observer for scroll animations (opacity and translateY) and respects prefers-reduced-motion. The Footer provides CTA, company description, nav links, license, and contact with scroll anchor #contacto. SEO includes locale-aware metadata (title, description, canonical, Open Graph, Twitter), JSON-LD (Organization and WebSite), sitemap.xml, robots.txt, OG image (1200×630), and favicon.",
      },
      {
        heading: "The Result",
        body: "The production-ready site is live at https://www.hellocit.com, deployed on Vercel with the production branch main. Contact form submissions are sent as HTML emails to the client (default: info@hellocloudit.com) via the Brevo Transactional Email API; the API route validates required fields, builds the email with sender and reply-to set to the submitter, and returns clear success or error responses. Indexing and social previews are correctly configured for search and sharing. The repository (e.g. GitHub, main branch) and Vercel environment variables (BREVO_API_KEY and optional CONTACT_* settings) are documented for maintenance and verification.",
      },
      {
        heading: "Technology & Deployment",
        body: "The stack is Next.js 16 (App Router), React, and TypeScript with Tailwind CSS and Plus Jakarta Sans (local variable font). Data comes from optional WordPress (WPGraphQL) or fallback content in content/ (ES/EN). Hosting is on Vercel with production alias www.hellocit.com. Email is handled by the Brevo Transactional Email API (no WPForms in the headless flow). Required environment variable: BREVO_API_KEY. Optional: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_FROM_NAME. Brevo sender and domain (e.g. hellocloudit.com) verification and DMARC are recommended for deliverability.",
      },
    ],
  },
];
