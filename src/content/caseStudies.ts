/** Prose that ships in both locales, mirroring the `content` shape in posts.ts. */
export interface LocalizedText {
  en: string;
  es: string;
}

export interface CaseStudy {
  slug: string;
  title: LocalizedText;
  /** Optional display name for listing pages (e.g. "Hello Cloud IT") */
  displayName?: string;
  client: string;
  url: string;
  heroImage: string;
  /** ISO date of the last substantive edit. Feeds sitemap `lastModified`. */
  lastModified: string;
  /** Short meta description, kept under 155 characters. `summary` is far too long for one. */
  metaDescription: LocalizedText;
  summary: LocalizedText;
  sections: {
    heading: LocalizedText;
    body: LocalizedText;
  }[];
}

/** Resolve a localized string for the current request locale, falling back to English. */
export function localized(text: LocalizedText, locale: string): string {
  return locale === "es" ? text.es : text.en;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "hello-cit",
    title: {
      en: "Interactive Website for Hello CIT",
      es: "Sitio web interactivo para Hello CIT",
    },
    displayName: "Hello Cloud IT",
    client: "Hello CIT",
    url: "https://www.hellocit.com/",
    heroImage: "/images/work/hello-cit-hero.png",
    lastModified: "2026-03-06",
    metaDescription: {
      en: "How ArsonistAI built Hello CIT a bilingual Next.js marketing site with reliable Brevo email delivery, full SEO, and a Vercel deployment.",
      es: "Cómo ArsonistAI construyó para Hello CIT un sitio bilingüe en Next.js con entrega de correo por Brevo, SEO completo y despliegue en Vercel.",
    },
    summary: {
      en: "The Hello CIT marketing website was delivered as a modern, bilingual (English/Spanish) site built with Next.js App Router and optional WordPress headless integration. The scope included full design implementation—Hero, Solutions, Testimonials, FAQ, Team, Contact, Blog preview, Footer—a working contact form with reliable email delivery via Brevo, comprehensive SEO, scroll animations, and legal pages. The outcome is a production-ready site at https://www.hellocit.com, deployed on Vercel, with contact form submissions sent as HTML emails to the client via Brevo's API and indexing and social previews correctly configured for search and sharing.",
      es: "El sitio web de marketing de Hello CIT se entregó como un sitio moderno y bilingüe (inglés/español) construido con Next.js App Router y una integración headless opcional con WordPress. El alcance incluyó la implementación completa del diseño (Hero, Soluciones, Testimonios, Preguntas frecuentes, Equipo, Contacto, vista previa del blog y pie de página), un formulario de contacto funcional con entrega confiable de correo mediante Brevo, SEO integral, animaciones de scroll y páginas legales. El resultado es un sitio listo para producción en https://www.hellocit.com, desplegado en Vercel, donde los envíos del formulario llegan al cliente como correos HTML a través de la API de Brevo, con la indexación y las vistas previas sociales configuradas correctamente para búsqueda y para compartir.",
    },
    sections: [
      {
        heading: { en: "The Challenge", es: "El reto" },
        body: {
          en: "Hello CIT needed a modern, bilingual marketing website that could communicate their technology offerings—AI factories, digital agents, and infrastructure solutions—to enterprise clients across Latin America. In the headless setup, the contact form originally posted to WordPress (WPForms); WordPress returned 200/302, but WPForms did not process submissions (nonce/backend not triggered), so no notification emails were sent. Reliable contact capture and email delivery were essential for the site to be production-ready.",
          es: "Hello CIT necesitaba un sitio de marketing moderno y bilingüe capaz de comunicar su oferta tecnológica (fábricas de IA, agentes digitales y soluciones de infraestructura) a clientes empresariales de toda América Latina. En el montaje headless, el formulario de contacto enviaba originalmente a WordPress (WPForms); WordPress devolvía 200/302, pero WPForms no procesaba los envíos porque no se activaba el nonce ni el backend, así que nunca se enviaban correos de notificación. Una captura de contactos y una entrega de correo confiables eran indispensables para que el sitio estuviera listo para producción.",
        },
      },
      {
        heading: { en: "Our Approach", es: "Nuestro enfoque" },
        body: {
          en: "We delivered the site using the Next.js App Router with full design implementation across all requested sections: Hero, Solutions, Testimonials, FAQ, Team, Contact form, Blog preview, and Footer. Content and UI are localized via a language toggle (English/Spanish), with optional WordPress (WPGraphQL) for posts, team, FAQ, and footer data, and fallback content in content/ for both locales. Styling used Tailwind CSS with design tokens (brand-blue, ink), Plus Jakarta Sans for typography, and the site was structured for deployment on Vercel with production alias www.hellocit.com.",
          es: "Entregamos el sitio con el App Router de Next.js e implementamos por completo el diseño de todas las secciones solicitadas: Hero, Soluciones, Testimonios, Preguntas frecuentes, Equipo, formulario de contacto, vista previa del blog y pie de página. El contenido y la interfaz se localizan mediante un selector de idioma (inglés/español), con WordPress opcional (WPGraphQL) para entradas, equipo, preguntas frecuentes y datos del pie de página, y contenido de respaldo en content/ para ambos idiomas. Los estilos se construyeron con Tailwind CSS y tokens de diseño (brand-blue, ink), tipografía Plus Jakarta Sans, y el sitio quedó estructurado para desplegarse en Vercel con el alias de producción www.hellocit.com.",
        },
      },
      {
        heading: { en: "Key Features", es: "Funcionalidades clave" },
        body: {
          en: "The home page includes a Hero with headline, CTA, language switcher (Español/English), navigation, and rows for Marcas and Certificaciones. A Solutions card grid with 100px icons and titles links to solution detail pages (e.g. Hello Infrastructure, Hello Agents). Testimonials, an FAQ accordion with a \"more questions\" CTA, and a Team section with member cards follow. The ContactForm is a client component with name, email, product-of-interest dropdown (eight products plus \"Other\"), and message; it POSTs to /api/contact with loading, success, and error states and a double-submit guard. A BlogPreviewWidget shows the latest three posts with images, date, title, excerpt, and \"Read more\" links. ScrollReveal uses Intersection Observer for scroll animations (opacity and translateY) and respects prefers-reduced-motion. The Footer provides CTA, company description, nav links, license, and contact with scroll anchor #contacto. SEO includes locale-aware metadata (title, description, canonical, Open Graph, Twitter), JSON-LD (Organization and WebSite), sitemap.xml, robots.txt, OG image (1200×630), and favicon.",
          es: "La página de inicio incluye un Hero con titular, CTA, selector de idioma (Español/English), navegación y filas de Marcas y Certificaciones. Una cuadrícula de tarjetas de Soluciones, con iconos de 100 px y títulos, enlaza a páginas de detalle (por ejemplo Hello Infrastructure y Hello Agents). Siguen los testimonios, un acordeón de preguntas frecuentes con un CTA de \"más preguntas\" y una sección de Equipo con tarjetas de cada integrante. El ContactForm es un componente de cliente con nombre, correo, un desplegable de producto de interés (ocho productos más \"Otro\") y mensaje; envía por POST a /api/contact con estados de carga, éxito y error, además de protección contra envíos duplicados. El BlogPreviewWidget muestra las tres entradas más recientes con imagen, fecha, título, extracto y enlace \"Leer más\". ScrollReveal usa Intersection Observer para las animaciones de scroll (opacidad y translateY) y respeta prefers-reduced-motion. El pie de página ofrece CTA, descripción de la empresa, enlaces de navegación, licencia y contacto con el ancla #contacto. El SEO incluye metadatos por idioma (título, descripción, canónica, Open Graph, Twitter), JSON-LD (Organization y WebSite), sitemap.xml, robots.txt, imagen OG (1200×630) y favicon.",
        },
      },
      {
        heading: { en: "The Result", es: "El resultado" },
        body: {
          en: "The production-ready site is live at https://www.hellocit.com, deployed on Vercel with the production branch main. Contact form submissions are sent as HTML emails to the client (default: info@hellocloudit.com) via the Brevo Transactional Email API; the API route validates required fields, builds the email with sender and reply-to set to the submitter, and returns clear success or error responses. Indexing and social previews are correctly configured for search and sharing. The repository (e.g. GitHub, main branch) and Vercel environment variables (BREVO_API_KEY and optional CONTACT_* settings) are documented for maintenance and verification.",
          es: "El sitio, listo para producción, está en línea en https://www.hellocit.com, desplegado en Vercel con la rama de producción main. Los envíos del formulario de contacto llegan al cliente como correos HTML (por defecto a info@hellocloudit.com) mediante la API de correo transaccional de Brevo; la ruta de API valida los campos obligatorios, arma el correo con remitente y reply-to apuntando a quien envió el formulario, y devuelve respuestas claras de éxito o error. La indexación y las vistas previas sociales están configuradas correctamente para búsqueda y para compartir. El repositorio (por ejemplo GitHub, rama main) y las variables de entorno de Vercel (BREVO_API_KEY y los ajustes opcionales CONTACT_*) quedaron documentados para mantenimiento y verificación.",
        },
      },
      {
        heading: {
          en: "Technology & Deployment",
          es: "Tecnología y despliegue",
        },
        body: {
          en: "The stack is Next.js 16 (App Router), React, and TypeScript with Tailwind CSS and Plus Jakarta Sans (local variable font). Data comes from optional WordPress (WPGraphQL) or fallback content in content/ (ES/EN). Hosting is on Vercel with production alias www.hellocit.com. Email is handled by the Brevo Transactional Email API (no WPForms in the headless flow). Required environment variable: BREVO_API_KEY. Optional: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_FROM_NAME. Brevo sender and domain (e.g. hellocloudit.com) verification and DMARC are recommended for deliverability.",
          es: "El stack es Next.js 16 (App Router), React y TypeScript con Tailwind CSS y Plus Jakarta Sans (fuente variable local). Los datos provienen de WordPress opcional (WPGraphQL) o del contenido de respaldo en content/ (ES/EN). El alojamiento es Vercel con el alias de producción www.hellocit.com. El correo se gestiona con la API de correo transaccional de Brevo, sin WPForms en el flujo headless. Variable de entorno obligatoria: BREVO_API_KEY. Opcionales: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_FROM_NAME. Se recomienda verificar el remitente y el dominio en Brevo (por ejemplo hellocloudit.com) y configurar DMARC para mejorar la entregabilidad.",
        },
      },
    ],
  },
];
