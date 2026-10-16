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
  /** Omitted for our own products, which have no client to credit. */
  client?: string;
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
    slug: "design-engineer-ide",
    title: { en: "Design Engineer IDE", es: "Design Engineer IDE" },
    heroImage: "/images/work/dide-hero.jpg",
    lastModified: "2026-10-15",
    metaDescription: {
      en: "How ArsonistAI built Design Engineer IDE, a local-first workspace that shows designers what changed, what waits on them, and what their agents did.",
      es: "Cómo ArsonistAI creó Design Engineer IDE, un entorno local que muestra a los diseñadores qué cambió, qué los espera y qué hicieron sus agentes.",
    },
    summary: {
      en: "dide, the Design Engineer IDE, is a project workspace for designers who build: the people who ship interface code, review pull requests, follow tickets across teams, and run several AI coding agents at once. Instead of another dashboard, dide keeps a local record of everything that happens across Linear, GitHub and a markdown knowledge base, joins it into one thread per piece of work, and lets you act on it from the same screen. It answers the questions that cost the most time: what changed since I last looked, what is waiting on me, what is quietly stalling, and what did the agents do while I was in a meeting. All of it runs and stays on the user's own machine.",
      es: "dide, el Design Engineer IDE, es un entorno de proyectos para diseñadores que también construyen: quienes publican código de interfaz, revisan pull requests, siguen tickets entre equipos y usan varios agentes de IA a la vez. En lugar de otro panel de control, dide guarda un registro local de todo lo que pasa en Linear, GitHub y una base de conocimiento en markdown, lo une en un solo hilo por cada trabajo y permite actuar desde la misma pantalla. Responde a las preguntas que más tiempo cuestan: qué cambió desde la última vez que miré, qué me está esperando, qué se está estancando sin ruido y qué hicieron los agentes mientras yo estaba en una reunión. Todo funciona y se queda en el propio equipo del usuario.",
    },
    stats: [
      {
        value: "3",
        label: { en: "work sources in one record", es: "fuentes en un solo registro" },
      },
      {
        value: "3",
        label: { en: "AI coding agents metered", es: "agentes de IA medidos" },
      },
      {
        value: "7:1",
        label: { en: "minimum text contrast", es: "contraste mínimo del texto" },
      },
      {
        value: "680+",
        label: { en: "automated tests", es: "pruebas automáticas" },
      },
    ],
    sections: [
      {
        heading: { en: "The Challenge", es: "El reto" },
        body: {
          en: "A design engineer is the maker, the reviewer and the orchestrator at once. In a single morning they ship interface code, review pull requests, follow tickets across several teams, keep notes in a knowledge base and run three or four AI coding sessions whose output no other tool shows. Answering \"what needs me right now?\" meant opening four apps and rebuilding the picture by hand. Dashboards that tried to help failed because you could look but not act, and team tools failed by fighting the systems teams already use.",
          es: "Un ingeniero de diseño crea, revisa y coordina al mismo tiempo. En una sola mañana publica código de interfaz, revisa pull requests, sigue tickets de varios equipos, toma notas en una base de conocimiento y lanza tres o cuatro sesiones de agentes de IA cuyo trabajo ninguna otra herramienta muestra. Responder a \"¿qué me necesita ahora mismo?\" obligaba a abrir cuatro aplicaciones y rehacer el panorama a mano. Los paneles que intentaron ayudar fracasaron porque solo dejaban mirar y no actuar, y las herramientas de equipo fracasaron al competir con los sistemas que los equipos ya usan.",
        },
      },
      {
        heading: { en: "Our Approach", es: "Nuestro enfoque" },
        body: {
          en: "We treated work as a stream to replay, not a pile to sort. dide works like a flight recorder: one append-only event log on the user's machine takes in every change from Linear, GitHub and the knowledge base, and every screen is a query over that log. A ticket, its pull requests and the notes that mention it join into one thread through links that already exist, such as a ticket ID in a branch name or a URL in a note. Fuzzy matches are only ever suggested and never joined on their own, because a wrong join destroys trust faster than a missing one. dide also remembers when your own eyes last touched each item, so every screen can show what changed since you last looked.",
          es: "Tratamos el trabajo como una secuencia que se puede repasar, no como una pila que hay que ordenar. dide funciona como una caja negra: un único registro de eventos en el equipo del usuario recoge cada cambio de Linear, GitHub y la base de conocimiento, y cada pantalla es una consulta sobre ese registro. Un ticket, sus pull requests y las notas que lo mencionan se unen en un solo hilo gracias a enlaces que ya existen, como el código de un ticket en el nombre de una rama o una URL en una nota. Las coincidencias aproximadas solo se sugieren y nunca se unen por sí solas, porque una unión errónea destruye la confianza más rápido que una que falta. dide también recuerda cuándo miraste cada elemento por última vez, así que cada pantalla puede mostrar qué cambió desde entonces.",
        },
      },
      {
        heading: { en: "Catch-Up", es: "Ponerse al día" },
        body: {
          en: "Catch-Up is the first screen after any time away, and it is titled with the gap it covers, such as \"Since Fri 15:20, 7h ago\". It separates direct requests, like review requests and assignments, from social signals like mentions, then lists the requests you made of others and the pull requests you have open. Each row shows who is waiting and for how long. A detail pane shows what changed since your last scan, and acknowledging an item moves your read point forward, so the list shrinks as you work through it. Nothing is ever labeled as blocked unless a source can prove the dependency.",
          es: "Catch-Up es la primera pantalla después de cualquier ausencia, y su título indica el tiempo que abarca, como \"Desde el viernes a las 15:20, hace 7 h\". Separa las peticiones directas, como revisiones y asignaciones, de las señales sociales como las menciones, y luego muestra lo que pediste a otros y los pull requests que tienes abiertos. Cada fila indica quién espera y desde hace cuánto. Un panel de detalle muestra qué cambió desde tu última revisión, y al confirmar un elemento tu punto de lectura avanza, así que la lista se reduce a medida que trabajas. Nada se marca nunca como bloqueado si una fuente no puede probar la dependencia.",
        },
        image: {
          src: "/images/work/dide-catchup.webp",
          width: 1540,
          height: 1300,
          alt: {
            en: "Catch-Up sections for review requests, assignments, social signals, requests you made and pull requests you have open, each row with a person and a wait time",
            es: "Secciones de Catch-Up con revisiones, asignaciones, señales sociales, peticiones propias y pull requests abiertos, cada fila con una persona y un tiempo de espera",
          },
          caption: {
            en: "Direct requests come first, each with the person waiting and how long they have waited. Empty sections say so plainly.",
            es: "Las peticiones directas van primero, cada una con quién espera y desde hace cuánto. Las secciones vacías lo dicen con claridad.",
          },
        },
      },
      {
        heading: { en: "The Traverse", es: "La línea de tiempo" },
        body: {
          en: "The Traverse draws work as time. Each thread is a line running left to right, grouped by project, with a live marker for now. Busy stretches grow thicker and warmer, so a thread that has gone flat and cool is a stall you can spot without reading a word. A mark on every line shows where you last looked, and knowledge base entries settle along the bottom as a band of sediment beneath the faster work above. For first-day users and portfolio viewers, a designed synthetic week fills the view, and it is labeled on screen as synthetic data.",
          es: "El Traverse dibuja el trabajo como tiempo. Cada hilo es una línea que avanza de izquierda a derecha, agrupada por proyecto, con un marcador en vivo del momento actual. Los tramos con más actividad se vuelven más gruesos y cálidos, así que un hilo plano y frío es un estancamiento que se ve sin leer una palabra. Una marca en cada línea indica dónde miraste por última vez, y las entradas de la base de conocimiento se asientan abajo como un sedimento, bajo el trabajo más rápido de arriba. Para los usuarios nuevos y para quien ve el portafolio, una semana sintética diseñada llena la vista y aparece en pantalla como datos sintéticos.",
        },
        image: {
          src: "/images/work/dide-traverse.webp",
          width: 1720,
          height: 472,
          alt: {
            en: "Three threads drawn as lines across a week, grouped under two projects, with thicker blocks where there was activity and a now marker on the right",
            es: "Tres hilos dibujados como líneas a lo largo de una semana, agrupados en dos proyectos, con bloques más gruesos donde hubo actividad y un marcador del momento actual a la derecha",
          },
          caption: {
            en: "Each line is one piece of work across the week, grouped by project. Thicker, warmer stretches mean more activity.",
            es: "Cada línea es un trabajo a lo largo de la semana, agrupado por proyecto. Los tramos más gruesos y cálidos indican más actividad.",
          },
        },
      },
      {
        heading: { en: "Writing Back Safely", es: "Escritura segura" },
        body: {
          en: "dide acts as well as reports. From the same screen you can comment on a Linear ticket, change its state, or approve a GitHub pull request or request changes on it. Every write is optimistic, goes through a visible outbox, and is never allowed to fail in silence. While building it, we found and fixed the cases that quietly break trust: a retry that could post a comment twice while the first request was still in flight, a failure that left a row looking pending, and a comment that reached Linear but was shown as failed. Each fix was proven against a real ticket.",
          es: "dide actúa además de informar. Desde la misma pantalla puedes comentar un ticket de Linear, cambiar su estado, o aprobar un pull request de GitHub o pedir cambios en él. Cada escritura es optimista, pasa por una bandeja de salida visible y nunca puede fallar en silencio. Durante el desarrollo encontramos y corregimos los casos que rompen la confianza sin avisar: un reintento que podía publicar un comentario dos veces mientras la primera petición seguía en curso, un fallo que dejaba una fila como pendiente y un comentario que llegó a Linear pero se mostraba como fallido. Cada corrección se probó contra un ticket real.",
        },
      },
      {
        heading: { en: "Watching the Agents", es: "Los agentes a la vista" },
        body: {
          en: "The sidebar carries gauges for the work, from review debt to unpushed code, and for the AI agents behind it. Token spend adds up the last 30 days of Claude Code, Codex and Cursor usage from each agent's own records. Weekly allowance gauges show a percentage only when the provider publishes one, and they drop a reading once its cycle resets, because a bar measured against a guessed limit is worse than one that admits it does not know. A Projects view scans the local code folder and flags work at risk, such as uncommitted changes, unpushed commits or a repo with no remote, ordered by how much work is at stake.",
          es: "La barra lateral tiene indicadores del trabajo, de las revisiones pendientes al código sin subir, y de los agentes de IA que hay detrás. El gasto de tokens suma los últimos 30 días de uso de Claude Code, Codex y Cursor a partir de los registros de cada agente. Los indicadores de cuota semanal solo muestran un porcentaje cuando el proveedor lo publica, y descartan una lectura cuando su ciclo se reinicia, porque una barra medida contra un límite adivinado es peor que una que admite no saberlo. Una vista de proyectos revisa la carpeta de código local y señala el trabajo en riesgo, como cambios sin confirmar, commits sin subir o un repositorio sin remoto, ordenado según cuánto trabajo está en juego.",
        },
      },
      {
        heading: { en: "Room for AI, with Rules", es: "IA con reglas claras" },
        body: {
          en: "dide uses a model only where code cannot do the job, such as reading long comment threads or turning a sentence into a query. The model layer was built and tested before the first feature, under rules set in advance. Every generated sentence must cite the events it came from, or it is dropped. Attention data such as your read history never leaves the machine, and a test enforces that. Every call is logged with its cost, and dide counts its own usage on the same gauge as the agents it meters. One switch turns AI off, and every screen is complete without it.",
          es: "dide usa un modelo solo donde el código no puede hacer el trabajo, como leer hilos largos de comentarios o convertir una frase en una consulta. La capa del modelo se construyó y se probó antes de la primera función, con reglas fijadas de antemano. Cada frase generada debe citar los eventos de los que sale o se descarta. Los datos de atención, como tu historial de lectura, nunca salen del equipo, y una prueba lo garantiza. Cada llamada se registra con su coste, y dide cuenta su propio uso en el mismo indicador que los agentes que mide. Un solo ajuste apaga la IA, y cada pantalla está completa sin ella.",
        },
      },
      {
        heading: { en: "Built to a Standard", es: "Hecho con criterio" },
        body: {
          en: "Every color in dide is generated in the LCH color space to meet its contrast floor, 7:1 for text and 3:1 for other marks, and tests check it on every surface. The type scale, weights, corner radii, icons and line lengths are enforced by tests in the same way, so a stray font size or a hand-drawn icon fails the build. dide never shows a pop-up, badge or toast you did not ask for. Each view ships with designed empty, loading, error and offline states, and being offline is treated as normal rather than as an error.",
          es: "Cada color de dide se genera en el espacio de color LCH para cumplir su contraste mínimo, 7:1 para el texto y 3:1 para otras marcas, y las pruebas lo comprueban en cada superficie. La escala tipográfica, los pesos, los radios de las esquinas, los iconos y la longitud de las líneas también se controlan con pruebas, así que un tamaño de letra suelto o un icono dibujado a mano rompe la compilación. dide nunca muestra una ventana emergente, una insignia o un aviso que no hayas pedido. Cada vista incluye estados diseñados para vacío, carga, error y sin conexión, y estar sin conexión se trata como algo normal y no como un error.",
        },
      },
      {
        heading: {
          en: "Technology & Deployment",
          es: "Tecnología y despliegue",
        },
        body: {
          en: "dide is a macOS desktop app built with Tauri 2, with a Rust backend and a React and TypeScript front end. All data lives in one local SQLite file with full-text search. Each source has its own ingest lane, with no sync server in between, and GitHub access reuses the developer's existing GitHub CLI login, so no new token is stored. A command-line companion, didectl, can drive every backend path without opening the window, and more than 680 automated tests cover the front end and the backend.",
          es: "dide es una aplicación de escritorio para macOS hecha con Tauri 2, con un backend en Rust y una interfaz en React y TypeScript. Todos los datos viven en un único archivo SQLite local con búsqueda de texto completo. Cada fuente tiene su propia vía de ingesta, sin un servidor de sincronización de por medio, y el acceso a GitHub reutiliza la sesión que el desarrollador ya tiene en la CLI de GitHub, así que no se guarda ningún token nuevo. Una herramienta de línea de comandos, didectl, puede ejecutar cada parte del backend sin abrir la ventana, y más de 680 pruebas automáticas cubren la interfaz y el backend.",
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
