/** Prose that ships in both locales, mirroring the `content` shape in posts.ts. */
export interface LocalizedText {
  en: string;
  es: string;
}

/** A screenshot shown under a section's body. */
export interface CaseStudyImage {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption?: LocalizedText;
}

export interface CaseStudy {
  slug: string;
  title: LocalizedText;
  /** Optional display name for listing pages (e.g. "Hello Cloud IT") */
  displayName?: string;
  client: string;
  /** Public site for the work. Omitted for private builds with nothing to visit. */
  url?: string;
  heroImage: string;
  /** ISO date of the last substantive edit. Feeds sitemap `lastModified`. */
  lastModified: string;
  /** Short meta description, kept under 155 characters. `summary` is far too long for one. */
  metaDescription: LocalizedText;
  summary: LocalizedText;
  /** Measured results shown as tiles under the summary. */
  stats?: {
    value: string;
    label: LocalizedText;
  }[];
  sections: {
    heading: LocalizedText;
    body: LocalizedText;
    image?: CaseStudyImage;
  }[];
}

/** Resolve a localized string for the current request locale, falling back to English. */
export function localized(text: LocalizedText, locale: string): string {
  return locale === "es" ? text.es : text.en;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "moneyball-ats",
    title: {
      en: "Moneyball ATS",
      es: "Moneyball ATS",
    },
    displayName: "Moneyball ATS",
    client: "ArsonistAI",
    heroImage: "/images/work/ats-hero.jpg",
    lastModified: "2026-10-15",
    metaDescription: {
      en: "How ArsonistAI built an applicant tracking system whose local AI quotes its sources, refuses what it cannot answer, and leaves decisions to people.",
      es: "Cómo ArsonistAI creó un sistema de selección con IA local que cita sus fuentes, rechaza lo que no sabe y deja cada decisión a las personas.",
    },
    summary: {
      en: "We built an applicant tracking system for small in-house recruiting teams, with three AI features that each have to prove their output before anyone sees it. A notetaker drafts the interview scorecard from raw notes, a question box answers plain questions about the hiring pipeline, and a screening summary sums up each candidate in sentences that cite their source. The model runs on the recruiter's own computer, so candidate data never leaves the machine and no call costs anything. Every quote is checked word for word against its source, every number comes from code rather than the model, and a person makes every hiring decision.",
      es: "Creamos un sistema de seguimiento de candidatos para equipos de selección pequeños, con tres funciones de IA que deben probar lo que dicen antes de que nadie lo vea. Un asistente redacta la ficha de la entrevista a partir de las notas, un cuadro de preguntas responde en lenguaje sencillo sobre el proceso de selección y un resumen describe a cada candidato con frases que citan su fuente. El modelo corre en el propio equipo del reclutador, así que los datos de los candidatos nunca salen de la máquina y ninguna consulta cuesta nada. Cada cita se comprueba palabra por palabra contra su fuente, cada número sale del código y no del modelo, y una persona toma cada decisión de contratación.",
    },
    stats: [
      {
        value: "82%",
        label: {
          en: "of interview evidence filed correctly",
          es: "de la evidencia bien archivada",
        },
      },
      {
        value: "26/26",
        label: {
          en: "pipeline questions read right",
          es: "preguntas leídas del todo bien",
        },
      },
      {
        value: "6/6",
        label: {
          en: "unanswerable questions refused",
          es: "preguntas sin respuesta rechazadas",
        },
      },
      {
        value: "0",
        label: {
          en: "invented quotes on a scorecard",
          es: "citas inventadas en una ficha",
        },
      },
    ],
    sections: [
      {
        heading: { en: "The Challenge", es: "El reto" },
        body: {
          en: "Hiring is where a confident wrong sentence does the most damage. A made-up quote on a scorecard is a made-up reason to reject a person, and rules on automated hiring tools keep spreading, from New York City's Local Law 144 to the EU AI Act and Colorado's AI Act. Most recruiting software adds AI as a box that answers in a sure voice and leaves the checking to the reader. The goal was AI that saves real time on interview notes, reporting and screening, without ever putting an unchecked claim in front of a hiring manager.",
          es: "La selección de personal es donde una frase falsa dicha con seguridad hace más daño. Una cita inventada en una ficha de entrevista es una razón inventada para rechazar a alguien, y las normas sobre herramientas de contratación automatizadas no dejan de crecer, de la Local Law 144 de Nueva York a la Ley de IA de la UE y la de Colorado. La mayoría del software de selección añade la IA como un cuadro que responde con aplomo y deja la verificación al lector. El objetivo era una IA que ahorre tiempo real en notas, informes y filtros, sin poner nunca una afirmación sin comprobar delante de quien contrata.",
        },
      },
      {
        heading: { en: "Our Approach", es: "Nuestro enfoque" },
        body: {
          en: "We started each feature from one question: what does the model have to prove before its output reaches a screen? Four rules hold across the product. The model proposes, and plain code decides what is shown. Anything the checks throw away stays on screen, struck through, with the reason in words. The person keeps every decision, so the model can suggest a rating but never select one, and a summary never recommends. And the model runs locally through Ollama, free per call and fully optional, with a fallback that works without it and says which path produced what is on screen. Instead of a vague AI label, the interface says \"Drafted by qwen3.6, running on this computer\", so readers know exactly what wrote the text and where their data went.",
          es: "Empezamos cada función con una sola pregunta: ¿qué tiene que demostrar el modelo antes de que su respuesta llegue a la pantalla? Cuatro reglas rigen todo el producto. El modelo propone y un código sencillo decide qué se muestra. Lo que las comprobaciones descartan sigue en pantalla, tachado y con el motivo por escrito. La persona conserva cada decisión, así que el modelo puede sugerir una nota pero nunca elegirla, y un resumen nunca recomienda. Y el modelo corre en local con Ollama, gratis en cada consulta y del todo opcional, con un modo alternativo que funciona sin él y que indica qué camino produjo lo que se ve. En lugar de una etiqueta vaga de IA, la interfaz dice \"Redactado por qwen3.6 en este equipo\", para que se sepa con exactitud qué escribió el texto y a dónde fueron los datos.",
        },
      },
      {
        heading: {
          en: "Scorecard Drafts",
          es: "Fichas redactadas",
        },
        body: {
          en: "The interviewer pastes raw notes, and the model drafts up to three quotes per attribute, a suggested rating and a one-line reason. A schema limits the model to the attributes in the interview kit, so it cannot invent one. Every quote is then matched against the notes. The match forgives changes in case, spacing and quote marks, but not paraphrase, and a quote under three words fails because it proves nothing. Quotes that touch a trait protected by US employment law, such as age, family or health, are held back with the reason shown. A suggested rating only survives when a real quote supports it, and the rating buttons stay empty until the interviewer picks one.",
          es: "Quien entrevista pega sus notas y el modelo redacta hasta tres citas por atributo, una nota sugerida y una razón de una línea. Un esquema limita al modelo a los atributos de la guía de entrevista, así que no puede inventar uno. Después, cada cita se busca en las notas. La búsqueda perdona cambios de mayúsculas, espacios y comillas, pero no una paráfrasis, y una cita de menos de tres palabras no pasa porque no prueba nada. Las citas sobre rasgos que protege la ley laboral de EE. UU., como la edad, la familia o la salud, se retienen con el motivo a la vista. Una nota sugerida solo se mantiene si la respalda una cita real, y los botones de nota siguen vacíos hasta que la persona elige una.",
        },
        image: {
          src: "/images/work/ats-draft-scorecard.webp",
          width: 1340,
          height: 1620,
          alt: {
            en: "Two scorecard attributes with drafted evidence, each quote marked as found word for word in the source, and a suggested rating beside a Use button",
            es: "Dos atributos de la ficha con evidencia redactada, cada cita marcada como encontrada palabra por palabra en la fuente, y una nota sugerida junto a un botón para usarla",
          },
          caption: {
            en: "Each kept quote is marked as found word for word in the notes. The rating stays a suggestion until the interviewer picks it.",
            es: "Cada cita que se mantiene aparece como encontrada palabra por palabra en las notas. La nota sigue siendo una sugerencia hasta que la persona la elige.",
          },
        },
      },
      {
        heading: {
          en: "Pipeline Questions",
          es: "Preguntas al proceso",
        },
        body: {
          en: "Recruiters can ask plain questions such as \"which source turns into hires most often?\" The model only reads the question. It picks a metric and filters from closed lists built from live data, and the same code that draws every chart computes the answer, so the model never states a number. Before any figure appears, small chips show how the question was read: the metric, the time window, the role and the source, so a misreading is caught at a glance. Questions no metric can answer, such as \"which candidate is the best culture fit?\" or \"what salary should we offer?\", are turned down with a reason instead of being matched to the nearest metric.",
          es: "Los reclutadores pueden hacer preguntas sencillas como \"¿qué fuente acaba en más contrataciones?\". El modelo solo lee la pregunta. Elige una métrica y unos filtros de listas cerradas creadas a partir de los datos reales, y el mismo código que dibuja cada gráfico calcula la respuesta, así que el modelo nunca da un número. Antes de que aparezca una cifra, unas etiquetas muestran cómo se leyó la pregunta: la métrica, el periodo, el puesto y la fuente, para detectar de un vistazo una mala lectura. Las preguntas que ninguna métrica responde, como \"¿qué candidato encaja mejor en la cultura?\" o \"¿qué salario ofrecemos?\", se rechazan con un motivo en vez de asignarse a la métrica más parecida.",
        },
        image: {
          src: "/images/work/ats-ask-refusal.webp",
          width: 2016,
          height: 600,
          alt: {
            en: "The Ask about your pipeline box answering a culture fit question with: not something these numbers can answer",
            es: "El cuadro de preguntas sobre el proceso responde a una pregunta sobre encaje cultural diciendo que esos números no pueden responderla",
          },
          caption: {
            en: "A question that no metric can answer is refused with a reason, never guessed at.",
            es: "Una pregunta que ninguna métrica puede responder se rechaza con un motivo y nunca se adivina.",
          },
        },
      },
      {
        heading: {
          en: "Cited Summaries",
          es: "Resúmenes con fuentes",
        },
        body: {
          en: "On request, the model writes up to five sentences about a candidate from their scorecards, recruiter notes and rejection reasons, with each record numbered and labeled. Every sentence must cite one record and pass four checks: the record exists, the quote is in it, every number appears in it, and nothing touches a protected trait. Sentences that pass open to their source with the quoted words marked. Sentences that fail are listed under \"Left out after checking\" with the reason. The page is also honest about its limits: the checks confirm that the words exist, not that a sentence reads them fairly, and it says so under every summary.",
          es: "Cuando se le pide, el modelo escribe hasta cinco frases sobre un candidato a partir de sus fichas, las notas del reclutador y los motivos de rechazo, con cada registro numerado y etiquetado. Cada frase debe citar un registro y pasar cuatro comprobaciones: que el registro exista, que la cita esté en él, que cada número aparezca en él y que nada toque un rasgo protegido. Las frases que pasan se abren a su fuente con las palabras citadas resaltadas. Las que no pasan quedan en una lista de \"Descartadas tras comprobar\" con el motivo. La página también es honesta sobre sus límites: las comprobaciones confirman que las palabras existen, no que la frase las lea con justicia, y lo dice debajo de cada resumen.",
        },
        image: {
          src: "/images/work/ats-screening-summary.webp",
          width: 1324,
          height: 806,
          alt: {
            en: "A screening summary of five sentences, each followed by a link to the interview record it cites and that record's rating",
            es: "Un resumen de cinco frases, cada una seguida de un enlace al registro de entrevista que cita y a la nota de ese registro",
          },
          caption: {
            en: "Every sentence cites the record it came from, and the footer says what the checks can and cannot confirm.",
            es: "Cada frase cita el registro del que sale, y el pie explica lo que las comprobaciones pueden y no pueden confirmar.",
          },
        },
      },
      {
        heading: { en: "The Result", es: "El resultado" },
        body: {
          en: "An eval script scores every feature against fixed test cases, both before and after the checks, so the value of the checks is measured rather than claimed. On the default local model, qwen3.6, the notetaker filed 82% of labeled evidence under the right attribute, against 30% for plain keyword matching, and no invented or protected-trait quote reached the form. It read all 26 pipeline questions fully right, including the 6 that should be refused. 98% of summary sentences passed every check, and the one that failed was held back. A smaller 2 GB model also runs, and the eval shows plainly where it falls short: it adds filters nobody asked for, which is exactly the mistake the chips that show how a question was read are there to catch.",
          es: "Un script de evaluación puntúa cada función con casos de prueba fijos, antes y después de las comprobaciones, para que su valor se mida y no solo se afirme. Con el modelo local por defecto, qwen3.6, el asistente colocó el 82% de la evidencia etiquetada en el atributo correcto, frente al 30% de una búsqueda por palabras clave, y ninguna cita inventada o sobre rasgos protegidos llegó a la ficha. Leyó del todo bien las 26 preguntas sobre el proceso, incluidas las 6 que debía rechazar. El 98% de las frases de los resúmenes pasó todas las comprobaciones, y la única que falló quedó retenida. También funciona un modelo más pequeño de 2 GB, y la evaluación muestra con claridad dónde se queda corto: añade filtros que nadie pidió, justo el error que las etiquetas de lectura de cada pregunta existen para detectar.",
        },
      },
      {
        heading: {
          en: "Technology & Deployment",
          es: "Tecnología y despliegue",
        },
        body: {
          en: "The ATS runs on Next.js 15, React 19 and TypeScript, with SQLite for storage and Tailwind CSS for styling. It ships as a web app or as a Mac desktop app built with Tauri. The models run through Ollama on the same machine, with qwen3.6 by default and llama3.2 as a lighter option, and a single setting turns the model off entirely. Funnel and pass-through numbers come from an event log of stage changes rather than from current state, so reports never shift after the fact. The interface was audited against WCAG 2.2 AA, and its weakest text pairing has a contrast ratio of 7.22 to 1.",
          es: "El sistema usa Next.js 15, React 19 y TypeScript, con SQLite para los datos y Tailwind CSS para los estilos. Funciona como aplicación web o como aplicación de escritorio para Mac hecha con Tauri. Los modelos corren con Ollama en el mismo equipo, con qwen3.6 por defecto y llama3.2 como opción más ligera, y un solo ajuste apaga el modelo por completo. Las cifras del embudo y de paso entre etapas salen de un registro de eventos de cada cambio de etapa y no del estado actual, así que los informes nunca cambian a posteriori. La interfaz se auditó según WCAG 2.2 AA, y su combinación de texto más débil tiene un contraste de 7,22 a 1.",
        },
      },
    ],
  },
  {
    slug: "hello-cit",
    title: {
      en: "Hello CIT Website",
      es: "Web de Hello CIT",
    },
    displayName: "Hello Cloud IT",
    client: "Hello CIT",
    url: "https://www.hellocit.com/",
    heroImage: "/images/work/hello-cit-hero.jpg",
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
