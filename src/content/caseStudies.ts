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
      en: "Hello CIT Website",
      es: "Web de Hello CIT",
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
      en: "We delivered the Hello CIT marketing website as a modern site in English and Spanish, built with the Next.js App Router and an optional link to WordPress as a headless content source. The work covered the full design, from the hero, solutions, testimonials, FAQ, team, and contact sections to the blog preview and footer, plus a contact form that reliably sends email through Brevo, full SEO, scroll animations, and legal pages. The result is a live site at hellocit.com, hosted on Vercel, where each form entry reaches the client as an HTML email sent through the Brevo API, and search and social previews are set up correctly.",
      es: "Entregamos el sitio de marketing de Hello CIT como un sitio moderno en inglés y en español, hecho con el App Router de Next.js y con WordPress como fuente de contenido opcional. El trabajo cubrió todo el diseño, de la portada y las soluciones a los testimonios, las preguntas, el equipo, el contacto, el blog y el pie de página, además de un formulario cuyo correo llega sin falta a través de Brevo, un SEO completo, animaciones al hacer scroll y páginas legales. El sitio ya está en línea en hellocit.com, alojado en Vercel. Cada mensaje del formulario le llega al cliente como un correo HTML por la API de Brevo, y la búsqueda y las vistas previas en redes funcionan bien.",
    },
    sections: [
      {
        heading: { en: "The Challenge", es: "El reto" },
        body: {
          en: "Hello CIT needed a modern marketing website in two languages that could explain what they offer, from AI factories and digital agents to infrastructure, to large companies across Latin America. In the headless setup, the contact form first sent its data to a WordPress form plugin. WordPress said the request went through, but the plugin never processed it, so no one was ever emailed. The site could not go live until every contact was captured and every email arrived.",
          es: "Hello CIT necesitaba un sitio moderno en dos idiomas para explicar lo que ofrece, de fábricas de IA y agentes digitales a infraestructura, a grandes empresas de toda América Latina. En el montaje headless, el formulario de contacto enviaba los datos a un plugin de formularios de WordPress. WordPress decía que todo iba bien, pero el plugin nunca procesaba los envíos, así que nadie recibía ningún correo. El sitio no podía salir hasta que cada contacto quedara guardado y cada correo llegara.",
        },
      },
      {
        heading: { en: "Our Approach", es: "Nuestro enfoque" },
        body: {
          en: "We built the site with the Next.js App Router and the full design for every section asked for: the hero, solutions, testimonials, FAQ, team, contact form, blog preview, and footer. A language switch moves the content and interface between English and Spanish. Posts, team, FAQ, and footer data can come from WordPress, with backup content in the code for both languages. The styles use Tailwind CSS with the brand's color tokens and the Plus Jakarta Sans typeface, and the site was set up to deploy on Vercel at hellocit.com.",
          es: "Hicimos el sitio con el App Router de Next.js y el diseño completo de cada sección que se pidió: la portada, las soluciones, los testimonios, las preguntas, el equipo, el formulario, el blog y el pie de página. Un selector cambia todo el contenido entre inglés y español. Las entradas, el equipo, las preguntas y el pie de página pueden venir de WordPress, y el código guarda contenido de respaldo en los dos idiomas. Los estilos usan Tailwind CSS con los colores de la marca y la tipografía Plus Jakarta Sans, y el sitio quedó listo para salir en Vercel en hellocit.com.",
        },
      },
      {
        heading: { en: "Key Features", es: "Funcionalidades clave" },
        body: {
          en: "The home page opens with a hero that has a headline, a call to action, a switch between Spanish and English, the main menu, and rows of brands and certifications. A grid of solution cards, each with a large icon and a title, links to a page for each solution, such as Hello Infrastructure and Hello Agents. Below that come testimonials, an FAQ that opens and closes with a link for more questions, and a team section with a card for each person. The contact form asks for a name, an email, a product of interest from a list of eight plus other, and a message. It sends to the site's own contact route, shows loading, success, and error states, and blocks double sends. A blog preview shows the three newest posts with an image, date, title, summary, and a read more link. Sections fade in as you scroll, and the effect turns off for people who ask their device for less motion. The footer has a call to action, a short company description, links, the license, and a contact anchor. For SEO, every page has titles, descriptions, canonical links, and social previews in each language, along with structured data, a sitemap, a robots file, a share image, and a favicon.",
          es: "La portada abre con un titular, una llamada a la acción, un selector entre español e inglés, el menú y filas de marcas y certificaciones. Una cuadrícula de tarjetas de soluciones, cada una con un icono grande y un título, lleva a una página por solución, como Hello Infrastructure y Hello Agents. Luego vienen los testimonios, unas preguntas frecuentes que se abren y se cierran con un enlace para más preguntas, y una sección de equipo con una tarjeta por persona. El formulario de contacto pide nombre, correo, un producto de interés de una lista de ocho más otro, y un mensaje. Lo envía a la ruta de contacto del propio sitio, muestra los estados de carga, éxito y error, y evita los envíos dobles. Un bloque de blog muestra las tres entradas más nuevas con imagen, fecha, título, resumen y un enlace para leer más. Las secciones aparecen al hacer scroll, y el efecto se apaga para quien pide menos movimiento en su equipo. El pie de página trae una llamada a la acción, una breve descripción de la empresa, enlaces, la licencia y un ancla de contacto. Para el SEO, cada página tiene título, descripción, enlace canónico y vista previa en redes en cada idioma, además de datos estructurados, un mapa del sitio, un archivo robots, una imagen para compartir y un favicon.",
        },
      },
      {
        heading: { en: "The Result", es: "El resultado" },
        body: {
          en: "The site is live at hellocit.com, hosted on Vercel from the main branch. Each contact form entry reaches the client as an HTML email sent through Brevo's email API. The site's contact route checks the required fields, builds the email so a reply goes straight to the person who wrote in, and returns a clear success or error message. Search indexing and social previews are set up correctly. The code repository and the hosting settings, including the Brevo API key and the optional contact settings, are documented so the site is easy to maintain and check.",
          es: "El sitio está en línea en hellocit.com, alojado en Vercel desde la rama main. Cada mensaje del formulario le llega al cliente como un correo HTML enviado por la API de correo de Brevo. La ruta de contacto del sitio revisa los campos obligatorios, arma el correo para que la respuesta vaya directo a quien escribió y devuelve un mensaje claro de éxito o de error. La búsqueda y las vistas previas en redes están bien configuradas. El repositorio del código y los ajustes del alojamiento, como la clave de Brevo y los ajustes de contacto opcionales, quedaron documentados para que el sitio sea fácil de mantener y revisar.",
        },
      },
      {
        heading: {
          en: "Technology & Deployment",
          es: "Tecnología y despliegue",
        },
        body: {
          en: "The site runs on Next.js 16 with the App Router, React, and TypeScript, styled with Tailwind CSS and the Plus Jakarta Sans typeface served from the site itself. Content can come from WordPress, with backup content in the code in both languages. It is hosted on Vercel at hellocit.com. Email goes through Brevo's email API, so the WordPress form plugin is no longer in the loop. One setting holds the Brevo API key, and three more can set where contact email goes and who it comes from. To make sure email arrives, we recommend verifying the sender and domain in Brevo and setting up DMARC.",
          es: "El sitio usa Next.js 16 con el App Router, React y TypeScript, con estilos en Tailwind CSS y la tipografía Plus Jakarta Sans servida desde el propio sitio. El contenido puede venir de WordPress, con contenido de respaldo en el código en los dos idiomas. Está alojado en Vercel en hellocit.com. El correo sale por la API de correo de Brevo, así que el plugin de formularios de WordPress ya no se usa. Un ajuste guarda la clave de la API de Brevo y otros tres, opcionales, fijan a dónde va el correo y quién lo envía. Para que el correo llegue bien, conviene verificar el remitente y el dominio en Brevo y configurar DMARC.",
        },
      },
    ],
  },
];
