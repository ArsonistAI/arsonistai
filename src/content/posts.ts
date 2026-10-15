export interface Post {
  slug: string;
  titleKey: string;
  excerptKey: string;
  author: string;
  date: string;
  /** ISO date of the last substantive edit. Defaults to `date` when unset. */
  lastModified?: string;
  /** Broad topic for Article `articleSection`, e.g. "AI Design". */
  section?: string;
  image: string;
  content: {
    en: string;
    es: string;
  };
}

export const posts: Post[] = [
  {
    slug: "introducing-product-kpis-bringing-measurable-impact-into-your-design-workflow",
    titleKey: "posts.productKpisPlugin.title",
    excerptKey: "posts.productKpisPlugin.excerpt",
    author: "Jon Sabutis",
    date: "2026-02-28",
    image: "/images/blog/archer.png",
    content: {
      en: `The gap between "shipping features" and "proving impact" is where most product teams lose their footing. Features get built, launches get celebrated, and then comes the scramble, digging through dashboards, stitching together data points, and hoping something sticks when leadership asks the inevitable question: how do we know this worked?

The problem isn't a lack of data. It's a lack of shared language around what success looks like before the first pixel is placed.

## The KPI Problem in Product Design

Most product teams treat Key Performance Indicators as an afterthought, something that gets defined in a spreadsheet after the design is already locked, handed off, and halfway through development. By then, the opportunity to design for measurable outcomes has already passed.

Even teams that prioritize metrics early face a different challenge: choosing the right ones. With hundreds of potential KPIs across acquisition, activation, retention, revenue, and engagement, it's easy to either track everything (and learn nothing) or default to vanity metrics that look impressive in a slide deck but don't actually move the business forward. Recent [B2B SaaS growth benchmark research](https://www.hooklead.com/saas-growth-library/2026-b2b-saas-growth-benchmarks) puts the scale of the problem in perspective: only about a third of B2B SaaS companies formally track activation rate, despite it being one of the strongest predictors of whether a free user ever converts to a paying customer.

We kept seeing this pattern across projects and industries, talented teams building great products but struggling to connect their design decisions to measurable outcomes. No shared framework. No clear benchmarks. No single source of truth that lives where the work actually happens.

So we built one.

## Introducing Product KPIs

Product KPIs is a Figma plugin that integrates a library of over 100 industry-tested Key Performance Indicators directly into your design workflow. Each KPI comes with a clear definition, goal context, and common benchmarks for measurement, bringing greater clarity and accountability into the product design process from the very beginning.

But this isn't just a static reference list. The plugin is designed to meet teams where they are and help them make better decisions faster.

## How It Works

### Intelligent Recommendations

Rather than asking teams to sift through a wall of metrics, Product KPIs includes a step-by-step wizard that collects context about your product, goals, requirements, and constraints. An AI-powered algorithm then processes your answers and surfaces the most relevant, high-impact KPIs for your specific situation.

Think of it as a guided conversation that replaces the midnight Google search for "best KPIs for SaaS" with something far more targeted and actionable.

### Searchable Database

For teams that prefer to browse, the plugin provides a comprehensive, frequently updated database of KPIs organized with tag-based filtering. Whether you're looking for engagement metrics for a consumer app or operational KPIs for an enterprise platform, you can find exactly what you need in seconds.

### In-Context Tracking

With one click, the plugin exports a tracking widget directly into your Figma file. Each widget includes the KPI's definition, goals, benchmarks, and links to additional resources, along with input fields for ownership assignment and notes. This keeps the conversation about measurement anchored in the same space where design decisions are being made, rather than scattered across separate tools and documents.

### Export Anywhere

Not everything lives in Figma, and we built for that reality. Product KPIs supports export to a variety of common file formats, making it easy to share your selected KPIs with stakeholders, plug them into project management tools, or integrate them into the rest of your product stack.

## Who It's For

Product KPIs is built for the teams sitting at the intersection of design and outcomes: product designers who want their mockups to carry a measurement plan, not just a visual spec, and product managers who need a shared vocabulary with design instead of translating requirements back and forth between tools. Founders and small teams who don't have a dedicated analytics function yet use it to make defensible bets without guessing. Agencies and consultancies working across multiple clients use it as a fast way to establish a measurement baseline without starting from a blank page on every engagement.

## A Closer Look: From Wizard to Widget

Here's what using the plugin actually looks like in practice. A designer opens a new Figma file for a subscription onboarding flow and launches Product KPIs. The wizard asks a handful of questions, product type, business model, primary goal for this specific flow, current stage of the product. Based on those answers, it surfaces a shortlist: activation rate, time-to-first-value, and onboarding completion rate, each with its definition, typical benchmark range, and a short note on why it's relevant to an onboarding flow specifically.

The designer selects two of the three, and with one click, a tracking widget appears directly on the canvas next to the flow it measures. The widget carries the KPI definition, benchmark, an owner field, and a notes section, so when a stakeholder opens the file three weeks later, the measurement plan is sitting right where the design decisions were made, not buried in a separate doc nobody remembers to update.

## What the Data Says About Getting This Right

The benchmarks back up why this matters. Current [PLG growth data](https://www.hooklead.com/saas-growth-library/2026-b2b-saas-growth-benchmarks) shows the average product activation rate sitting around 37.5%, with best-in-class teams pushing past 70%, and average time-to-value around 36 hours. Median net revenue retention across B2B SaaS hovers near 88–90%, while top performers exceed 120%. The gap between "average" and "best-in-class" on these numbers isn't about having smarter engineers, it's about teams that know exactly which KPI they're designing toward at every stage of the product, and design deliberately to move it.

That's the gap Product KPIs is built to close, not by generating new numbers, but by making sure the right numbers are part of the conversation before the roadmap is finalized. If you want a deeper look at how to separate a genuinely useful KPI from a vanity metric, we wrote about that distinction in [Why Choosing the Right KPIs Makes All the Difference in Product Success](/insights/why-choosing-the-right-kpis-makes-all-the-difference-in-product-success).

## Why We Built This

At Arsonist AI, we believe the gap between design and measurable impact shouldn't exist. Designers and product managers deserve tools that make defining success a first-class part of the creative process, not a reporting exercise that happens after the fact.

We've seen firsthand how the right KPIs, chosen at the right time, can transform team alignment. When everyone is working toward the same clearly defined outcomes, decisions get sharper, debates get more productive, and the work itself becomes more intentional. This is the same philosophy behind our broader [product design work](/services), measurable outcomes belong in the room from day one, not bolted on after launch.

Product KPIs is our attempt to make that alignment effortless, embedded directly in the tool where the work is already happening.

## Frequently Asked Questions

### What makes Product KPIs different from a spreadsheet of metrics?

A spreadsheet is static and lives outside your workflow, which means it's rarely consulted once the initial planning meeting ends. Product KPIs lives inside Figma, next to the actual design decisions it's meant to inform, with benchmarks and definitions built in so nobody has to go hunting for context.

### Does the plugin work for early-stage products without much data yet?

Yes. The wizard is built to recommend appropriate leading indicators, like activation and time-to-value, for early-stage products, rather than assuming you already have the volume of data needed for lagging indicators like retention or net revenue retention.

### Can I use Product KPIs outside of Figma?

Every KPI you select can be exported to common file formats, so you can bring your chosen metrics into project management tools, decks, or documentation outside of Figma.

### Is Product KPIs free to try?

Product KPIs is available now on the Figma Community, install it directly from Figma to see current pricing and plan details.

### How does the plugin decide which KPIs to recommend for my product?

The wizard weighs your answers about product type, business model, and current goal against the same criteria a strong measurement plan should meet: whether a metric is genuinely tied to a business outcome, whether your team's decisions can actually move it, and whether it's appropriate for your product's current stage. Early-stage products get leading indicators like activation surfaced first; more mature products see retention and revenue-oriented KPIs surface higher in the recommendations.

## Getting Buy-In From the Rest of Your Team

A measurement plan only works if it's actually shared, and the most common reason KPI initiatives stall isn't a lack of good metrics, it's that the metrics live in one person's head or one person's file. Bringing the plugin into a kickoff meeting rather than a solo planning session changes that dynamic immediately: when engineering and product are in the room while the KPIs get selected, there's no separate "translation" step later where design has to convince the rest of the team a metric matters. The widget being visible directly on the design file also means a stakeholder reviewing the work doesn't have to ask what success looks like, it's already annotated next to the flow it measures.

## Get Started

Product KPIs is available now on the [Figma Community](https://www.figma.com/community/plugin/1557583641770417133/product-kpis). Install it, run the wizard, and start designing with measurable intent.

We'd love to hear how your team approaches KPI selection and what you think of the plugin. Reach out to us at info@arsonistai.com.`,
      es: `La brecha entre "lanzar funcionalidades" y "demostrar impacto" es donde la mayoría de los equipos de producto pierde el rumbo. Se construyen funcionalidades, se celebran los lanzamientos, y luego llega la carrera contrarreloj, revisando dashboards, uniendo datos sueltos y esperando que algo cuadre cuando el liderazgo hace la pregunta inevitable: ¿cómo sabemos que esto funcionó?

El problema no es la falta de datos. Es la falta de un lenguaje compartido sobre cómo se ve el éxito antes de colocar el primer píxel.

## El problema de los KPIs en el diseño de producto

La mayoría de los equipos de producto tratan los Indicadores Clave de Desempeño (KPIs) como algo secundario, algo que se define en una hoja de cálculo después de que el diseño ya está cerrado, entregado y a mitad de desarrollo. Para ese momento, la oportunidad de diseñar para resultados medibles ya pasó.

Incluso los equipos que priorizan las métricas desde el inicio enfrentan otro reto: elegir las correctas. Con cientos de KPIs posibles entre adquisición, activación, retención, ingresos y engagement, es fácil caer en dos extremos: medir todo (y no aprender nada) o quedarse con métricas de vanidad que se ven bien en una presentación pero no mueven el negocio. Investigación reciente sobre [benchmarks de crecimiento en SaaS B2B](https://www.hooklead.com/saas-growth-library/2026-b2b-saas-growth-benchmarks) pone el problema en perspectiva: solo cerca de un tercio de las empresas SaaS B2B mide formalmente la tasa de activación, a pesar de ser uno de los predictores más fuertes de si un usuario gratuito llega a convertirse en cliente de pago.

Vimos este mismo patrón una y otra vez, en proyectos e industrias distintas, equipos talentosos construyendo grandes productos, pero sin poder conectar sus decisiones de diseño con resultados medibles. Sin marco compartido. Sin benchmarks claros. Sin una única fuente de verdad que viva donde realmente ocurre el trabajo.

Así que construimos una.

## Presentamos Product KPIs

Product KPIs es un plugin de Figma que integra una biblioteca de más de 100 Indicadores Clave de Desempeño, probados por la industria, directamente en tu flujo de diseño. Cada KPI incluye una definición clara, contexto de objetivo y benchmarks comunes de medición, aportando mayor claridad y responsabilidad al proceso de diseño de producto desde el principio.

Pero esto no es solo una lista de referencia estática. El plugin está diseñado para encontrarse con los equipos donde están y ayudarlos a tomar mejores decisiones, más rápido.

## Cómo funciona

### Recomendaciones inteligentes

En lugar de pedirle a los equipos que filtren un muro de métricas, Product KPIs incluye un asistente paso a paso que recopila contexto sobre tu producto, objetivos, requisitos y restricciones. Un algoritmo impulsado por IA procesa tus respuestas y muestra los KPIs más relevantes y de mayor impacto para tu situación específica.

Piénsalo como una conversación guiada que reemplaza la búsqueda nocturna en Google de "mejores KPIs para SaaS" por algo mucho más específico y accionable.

### Base de datos con búsqueda

Para los equipos que prefieren explorar por su cuenta, el plugin ofrece una base de datos completa y actualizada con frecuencia, organizada con filtros por etiquetas. Ya sea que busques métricas de engagement para una app de consumo o KPIs operativos para una plataforma empresarial, puedes encontrar exactamente lo que necesitas en segundos.

### Seguimiento en contexto

Con un solo clic, el plugin exporta un widget de seguimiento directamente en tu archivo de Figma. Cada widget incluye la definición del KPI, sus objetivos, benchmarks y enlaces a recursos adicionales, junto con campos para asignar responsables y agregar notas. Esto mantiene la conversación sobre medición anclada en el mismo espacio donde se toman las decisiones de diseño, en lugar de dispersa entre herramientas y documentos distintos.

### Exporta a donde lo necesites

No todo vive en Figma, y construimos el plugin pensando en esa realidad. Product KPIs permite exportar a varios formatos de archivo comunes, facilitando compartir los KPIs seleccionados con stakeholders, integrarlos en herramientas de gestión de proyectos o incorporarlos al resto de tu stack de producto.

## Para quién es

Product KPIs está pensado para los equipos que viven en la intersección entre diseño y resultados: diseñadores de producto que quieren que sus mockups incluyan un plan de medición, no solo una especificación visual, y product managers que necesitan un vocabulario compartido con diseño en lugar de traducir requisitos de un lado a otro. Fundadores y equipos pequeños sin una función de analítica dedicada lo usan para tomar decisiones defendibles sin adivinar. Agencias y consultoras que trabajan con múltiples clientes lo usan como una forma rápida de establecer una línea base de medición sin partir de cero en cada proyecto.

## Una mirada de cerca: del asistente al widget

Así se ve usar el plugin en la práctica. Una diseñadora abre un nuevo archivo de Figma para un flujo de onboarding de suscripción y lanza Product KPIs. El asistente hace algunas preguntas, tipo de producto, modelo de negocio, objetivo principal de este flujo específico, etapa actual del producto. Con esas respuestas, muestra una lista corta: tasa de activación, tiempo hasta el primer valor y tasa de finalización del onboarding, cada una con su definición, rango de benchmark típico y una nota breve sobre por qué es relevante para un flujo de onboarding en particular.

La diseñadora selecciona dos de las tres, y con un clic, un widget de seguimiento aparece directamente en el lienzo, junto al flujo que mide. El widget incluye la definición del KPI, el benchmark, un campo de responsable y una sección de notas, así que cuando alguien del equipo abre el archivo tres semanas después, el plan de medición está justo donde se tomaron las decisiones de diseño, no perdido en un documento aparte que nadie recuerda actualizar.

## Lo que dicen los datos sobre hacerlo bien

Los benchmarks respaldan por qué esto importa. Datos actuales de [crecimiento PLG](https://www.hooklead.com/saas-growth-library/2026-b2b-saas-growth-benchmarks) muestran que la tasa de activación promedio ronda el 37.5%, con los equipos de mejor desempeño superando el 70%, y un tiempo hasta el primer valor promedio de 36 horas. La retención neta de ingresos mediana en SaaS B2B se ubica cerca del 88–90%, mientras que los mejores equipos superan el 120%. La diferencia entre "promedio" y "el mejor de su clase" en estos números no se trata de tener ingenieros más inteligentes, se trata de equipos que saben exactamente hacia qué KPI están diseñando en cada etapa del producto, y diseñan de forma deliberada para moverlo.

Esa es la brecha que Product KPIs busca cerrar, no generando nuevos números, sino asegurando que los números correctos formen parte de la conversación antes de cerrar el roadmap. Si quieres profundizar en cómo distinguir un KPI realmente útil de una métrica de vanidad, escribimos sobre esa diferencia en [Por qué elegir los KPIs correctos marca toda la diferencia en el éxito de un producto](/insights/why-choosing-the-right-kpis-makes-all-the-difference-in-product-success).

## Por qué construimos esto

En Arsonist AI creemos que la brecha entre diseño e impacto medible no debería existir. Diseñadores y product managers merecen herramientas que hagan de definir el éxito una parte central del proceso creativo, no un ejercicio de reporte que ocurre después de los hechos.

Hemos visto de primera mano cómo los KPIs correctos, elegidos en el momento correcto, pueden transformar la alineación de un equipo. Cuando todos trabajan hacia los mismos resultados claramente definidos, las decisiones son más precisas, los debates son más productivos y el trabajo mismo se vuelve más intencional. Esta es la misma filosofía detrás de nuestro [trabajo de diseño de producto](/services) más amplio, los resultados medibles deben estar en la sala desde el primer día, no añadidos después del lanzamiento.

Product KPIs es nuestro intento de hacer esa alineación sencilla, integrada directamente en la herramienta donde ya ocurre el trabajo.

## Preguntas frecuentes

### ¿Qué hace diferente a Product KPIs de una hoja de cálculo con métricas?

Una hoja de cálculo es estática y vive fuera de tu flujo de trabajo, lo que significa que rara vez se consulta después de la reunión inicial de planeación. Product KPIs vive dentro de Figma, junto a las decisiones de diseño reales que debe informar, con benchmarks y definiciones incorporados para que nadie tenga que buscar contexto por su cuenta.

### ¿Funciona el plugin para productos en etapa temprana sin muchos datos aún?

Sí. El asistente está diseñado para recomendar indicadores adelantados apropiados, como activación y tiempo hasta el primer valor, para productos en etapa temprana, en lugar de asumir que ya tienes el volumen de datos necesario para indicadores rezagados como retención o retención neta de ingresos.

### ¿Puedo usar Product KPIs fuera de Figma?

Cada KPI que selecciones se puede exportar a formatos de archivo comunes, para que puedas llevar tus métricas elegidas a herramientas de gestión de proyectos, presentaciones o documentación fuera de Figma.

### ¿Product KPIs es gratis para probar?

Product KPIs está disponible ahora en la Comunidad de Figma, instálalo directamente desde Figma para ver los detalles de precios y planes vigentes.

### ¿Cómo decide el plugin qué KPIs recomendar para mi producto?

El asistente evalúa tus respuestas sobre tipo de producto, modelo de negocio y objetivo actual contra los mismos criterios que debería cumplir un buen plan de medición: si una métrica está genuinamente ligada a un resultado de negocio, si las decisiones de tu equipo pueden realmente moverla, y si es apropiada para la etapa actual de tu producto. A los productos en etapa temprana se les muestran primero indicadores adelantados como la activación; a los productos más maduros se les muestran con mayor prioridad KPIs orientados a retención e ingresos.

## Consigue el apoyo del resto de tu equipo

Un plan de medición solo funciona si realmente se comparte, y la razón más común por la que las iniciativas de KPIs se estancan no es la falta de buenas métricas, es que las métricas viven solo en la cabeza de una persona o en el archivo de una persona. Llevar el plugin a una reunión de kickoff en lugar de a una sesión de planeación individual cambia esa dinámica de inmediato: cuando ingeniería y producto están en la sala mientras se seleccionan los KPIs, no hace falta un paso de "traducción" separado después, donde diseño tiene que convencer al resto del equipo de que una métrica importa. Que el widget sea visible directamente en el archivo de diseño también significa que un stakeholder que revisa el trabajo no tiene que preguntar cómo se ve el éxito, ya está anotado justo al lado del flujo que mide.

## Empieza ahora

Product KPIs está disponible ahora en la [Comunidad de Figma](https://www.figma.com/community/plugin/1557583641770417133/product-kpis). Instálalo, ejecuta el asistente y empieza a diseñar con intención medible.

Nos encantaría saber cómo tu equipo aborda la elección de KPIs y qué te parece el plugin. Escríbenos a info@arsonistai.com.`,
    },
  },
  {
    slug: "why-choosing-the-right-kpis-makes-all-the-difference-in-product-success",
    titleKey: "posts.kpis.title",
    excerptKey: "posts.kpis.excerpt",
    author: "Jon Sabutis",
    date: "2025-08-12",
    image: "/images/blog/kpi-blog.png",
    content: {
      en: `In product development and UX design, "impact" isn't just corporate jargon, it's the north star that guides every decision, feature, and design iteration. Yet without the right Key Performance Indicators (KPIs) serving as your compass, defining, measuring, and achieving meaningful impact becomes an expensive guessing game. The difference between successful products and failed launches often comes down to whether teams tracked the right metrics at the right time.

## The Cost of Tracking the Wrong Things

It's easy to mistake activity for progress. A dashboard full of green numbers feels productive, but if those numbers are page views, downloads, or social impressions, they may have nothing to do with whether the product is actually working. Teams that optimize for metrics that are easy to move, rather than metrics that matter, end up shipping features that look successful in a review meeting and fail to change user behavior in any lasting way.

The real cost isn't just wasted engineering time. It's the opportunity cost of not knowing which of your bets actually paid off, which means the next roadmap gets built on guesswork instead of evidence. Recent [B2B SaaS growth benchmark data](https://www.hooklead.com/saas-growth-library/2026-b2b-saas-growth-benchmarks) puts a number on this: only about a third of B2B SaaS companies formally track activation rate, even though it's one of the strongest predictors of whether a free user ever becomes a paying customer. Most of the rest are, in effect, flying blind on the metric that matters most.

## What Separates a Good KPI from a Vanity Metric

A useful KPI has three properties: it's tied to a real business or user outcome, it's something your team's decisions can actually move, and it's comparable over time so you can tell whether you're improving. Vanity metrics fail at least one of these tests, they go up regardless of what you build, or they measure output instead of outcome.

Retention, activation rate, and time-to-value tend to hold up under this test. Total signups and raw traffic usually don't, because they reward acquisition spend more than product quality. A few concrete contrasts make the distinction easier to spot in your own dashboards:

- **Signups vs. activation rate**, signups measure how many people showed up; activation measures how many of them actually experienced the product's core value.
- **Page views vs. time-to-value**, page views measure attention; time-to-value measures how quickly that attention turns into a real outcome.
- **Total downloads vs. week-four retention**, downloads measure curiosity; retention measures whether the product earned a place in someone's routine.

## Popular Frameworks for Choosing the Right Metric

You don't have to build a measurement framework from scratch. A few well-established approaches can shortcut the process:

- **North Star Metric**, a single metric that best captures the core value your product delivers to customers, used to align every team around one shared definition of progress.
- **AARRR ("Pirate Metrics")**, breaks the customer journey into Acquisition, Activation, Retention, Referral, and Revenue, making it easier to see exactly where a product is leaking value.
- **HEART Framework**, Google's framework for measuring user experience across Happiness, Engagement, Adoption, Retention, and Task success, useful when a purely revenue-driven metric would miss real usability problems.
- **OMTM (One Metric That Matters)**, popularized in Lean Analytics, this approach forces a team to pick a single current priority metric rather than monitoring a dozen dashboards at once.

None of these frameworks is universally "correct." The [product-led growth metrics guide from ProductLed](https://www.productled.org/foundations/product-led-growth-metrics) is a useful starting point if you're deciding which one fits your product's current stage and business model.

## Matching KPIs to the Stage of Your Product

The right KPI also depends on where your product is in its life. Early on, activation and qualitative feedback tell you more than revenue ever could, you're still validating that people get value from what you built. Current benchmarks put a healthy activation rate in the 20–40% range, with best-in-class products pushing past 70%.

As the product matures, the questions shift toward retention, expansion, and efficiency. Median net revenue retention across B2B SaaS sits around 88–90%, while top performers exceed 120%, meaning their existing customer base is expanding faster than it's churning. A metric that was the right thing to obsess over at launch can become a distraction a year later if the team never revisits the framework.

## Making KPIs Part of the Design Process, Not an Afterthought

The teams that get this right treat KPI selection as a design decision, not a reporting exercise that happens after launch. When product, design, and engineering agree on what success looks like before the first wireframe is drawn, every subsequent conversation, about scope, trade-offs, and priorities, gets sharper. Debates stop being about opinions and start being about evidence.

This is exactly the gap we built [Product KPIs](/insights/introducing-product-kpis-bringing-measurable-impact-into-your-design-workflow) to close: a Figma plugin that puts industry-tested KPIs, definitions, and benchmarks directly inside the design workflow, so the metric conversation happens at the same table as the design conversation.

## Common Mistakes Teams Make When Selecting KPIs

Even teams that know the theory make predictable mistakes in practice. The most common is treating a KPI as fixed once it's chosen, rather than revisiting it as the product changes, a metric that made sense under a free-trial-only pricing model can quietly stop making sense six months after a usage-based tier launches. Another is choosing a KPI that's already trending in the right direction regardless of the team's actions, which produces the comforting illusion of progress without ever being genuinely informative.

A third mistake is optimizing a single metric in isolation without a guardrail metric attached to it. A team chasing activation rate without also watching retention can end up "activating" users through aggressive onboarding nudges that push someone through a flow without creating lasting value, the activation number goes up while the underlying business gets worse. Pairing every primary KPI with at least one guardrail metric helps catch this before it compounds into a real problem.

## A Practical Example: Choosing KPIs for a New Feature

Say a team is shipping a collaboration feature inside an existing product, something like shared workspaces. Using the AARRR framework as a starting point, the team might identify three candidate metrics: activation (the percentage of users who create or join a shared workspace within their first week), retention (the percentage of workspace members still active 30 days later), and referral (the rate at which existing users invite new collaborators into a workspace).

Rather than tracking all three with equal weight from day one, the team picks activation as its single current priority metric for the first month post-launch, the point where the biggest uncertainty is whether the feature is discoverable and easy enough to use at all. Once activation clears a healthy benchmark, attention shifts to retention, because a feature that's easy to try but doesn't get reused isn't actually solving a real problem yet. This sequencing, one primary metric at a time, chosen based on where the biggest unknown currently sits, tends to produce clearer decisions than monitoring five dashboards simultaneously from launch day.

## Frequently Asked Questions

### How many KPIs should a product team track at once?

Fewer than you'd think. Most teams do better tracking one primary metric per major goal (a North Star Metric or an OMTM) alongside two or three supporting metrics that explain movement in the primary one. Tracking a dozen KPIs at once tends to dilute focus rather than sharpen it.

### What's the difference between a leading and a lagging indicator?

A leading indicator (like activation rate or time-to-value) predicts future outcomes and can be influenced quickly. A lagging indicator (like retention or revenue) confirms what already happened and moves slowly. Early-stage teams should lean on leading indicators simply because they don't have enough time-in-market yet for lagging indicators to be meaningful.

### Should every team have a North Star Metric?

It helps, but only if the metric is chosen carefully. A poorly chosen North Star Metric, one that can be inflated without actually delivering value, does more harm than having no single metric at all. It should be difficult to move without genuinely improving the product.

### What's a reasonable timeframe to wait before deciding a KPI isn't working?

It depends on the metric's natural cadence. A leading indicator like activation can be evaluated within weeks, since users either experience value quickly or they don't. A lagging indicator like net revenue retention needs at least a full quarter, often longer, before a trend is distinguishable from noise, judging it too early is one of the more common ways teams talk themselves out of a strategy that would have worked.

### When should a team reconsider its choice of KPI?

Three signals usually mean it's time to revisit: the metric has been flat for several quarters despite real product changes (suggesting it's no longer measuring what the team thinks it is), the product has entered a new stage of maturity without the measurement framework being updated to match, or the team catches itself justifying decisions based on how the metric looks rather than the outcome it's supposed to represent. That last signal is the most telling, it's the exact moment a KPI starts becoming the vanity metric it was chosen to avoid.

## Conclusion

Choosing the right KPIs isn't a one-time exercise, it's an ongoing discipline that separates teams who learn from their launches from teams who just move on to the next one. Get the metrics right, and everything downstream, from design decisions to roadmap prioritization, gets easier to defend and easier to trust.`,
      es: `En el desarrollo de producto y el diseño UX, "impacto" no es solo una palabra de moda corporativa: es la estrella polar que guía cada decisión, funcionalidad e iteración de diseño. Sin embargo, sin los Indicadores Clave de Desempeño (KPIs) correctos como brújula, definir, medir y lograr un impacto real se convierte en un juego de adivinanzas costoso. La diferencia entre productos exitosos y lanzamientos fallidos suele reducirse a si el equipo midió las métricas correctas en el momento correcto.

## El costo de medir las cosas equivocadas

Es fácil confundir actividad con progreso. Un dashboard lleno de números en verde se siente productivo, pero si esos números son vistas de página, descargas o impresiones en redes sociales, puede que no tengan nada que ver con si el producto realmente está funcionando. Los equipos que optimizan por métricas fáciles de mover, en lugar de métricas que realmente importan, terminan lanzando funcionalidades que se ven exitosas en una reunión de revisión, pero que no cambian el comportamiento del usuario de forma duradera.

El costo real no es solo tiempo de ingeniería desperdiciado. Es el costo de oportunidad de no saber cuáles de tus apuestas realmente dieron resultado, lo que significa que el próximo roadmap se construye sobre conjeturas en lugar de evidencia. Datos recientes de [benchmarks de crecimiento en SaaS B2B](https://www.hooklead.com/saas-growth-library/2026-b2b-saas-growth-benchmarks) le ponen un número a esto: solo cerca de un tercio de las empresas SaaS B2B mide formalmente la tasa de activación, a pesar de ser uno de los predictores más fuertes de si un usuario gratuito se convierte en cliente de pago. La mayoría del resto, en la práctica, vuela a ciegas en la métrica que más importa.

## Qué distingue a un buen KPI de una métrica de vanidad

Un KPI útil tiene tres propiedades: está ligado a un resultado real de negocio o de usuario, es algo que las decisiones de tu equipo pueden realmente mover, y es comparable en el tiempo para saber si estás mejorando. Las métricas de vanidad fallan al menos una de estas pruebas, suben sin importar lo que construyas, o miden output en lugar de resultado.

La retención, la tasa de activación y el tiempo hasta el valor suelen resistir esta prueba. El total de registros y el tráfico bruto, por lo general, no, porque premian el gasto en adquisición más que la calidad del producto. Algunos contrastes concretos hacen la distinción más fácil de detectar en tus propios dashboards:

- **Registros vs. tasa de activación**, los registros miden cuánta gente llegó; la activación mide cuántos de ellos realmente experimentaron el valor central del producto.
- **Vistas de página vs. tiempo hasta el valor**, las vistas de página miden atención; el tiempo hasta el valor mide qué tan rápido esa atención se convierte en un resultado real.
- **Descargas totales vs. retención de la semana cuatro**, las descargas miden curiosidad; la retención mide si el producto se ganó un lugar en la rutina de alguien.

## Marcos populares para elegir la métrica correcta

No tienes que construir un marco de medición desde cero. Algunos enfoques ya establecidos pueden ahorrarte el proceso:

- **North Star Metric**, una sola métrica que mejor captura el valor central que tu producto entrega a los clientes, usada para alinear a todo el equipo alrededor de una misma definición de progreso.
- **AARRR ("Pirate Metrics")**, divide el recorrido del cliente en Adquisición, Activación, Retención, Referencia e Ingresos, facilitando ver exactamente dónde un producto está perdiendo valor.
- **Marco HEART**, el marco de Google para medir la experiencia de usuario a través de Felicidad (Happiness), Engagement, Adopción, Retención y éxito en tareas (Task success), útil cuando una métrica puramente financiera pasaría por alto problemas reales de usabilidad.
- **OMTM (One Metric That Matters)**, popularizado en Lean Analytics, este enfoque obliga a un equipo a elegir una sola métrica prioritaria actual en lugar de monitorear una docena de dashboards a la vez.

Ninguno de estos marcos es universalmente "correcto". La [guía de métricas de crecimiento impulsado por producto de ProductLed](https://www.productled.org/foundations/product-led-growth-metrics) es un buen punto de partida para decidir cuál se ajusta a la etapa actual y al modelo de negocio de tu producto.

## Cómo ajustar los KPIs a la etapa de tu producto

El KPI correcto también depende de en qué etapa de vida está tu producto. Al principio, la activación y el feedback cualitativo dicen más que los ingresos, todavía estás validando que la gente obtiene valor de lo que construiste. Los benchmarks actuales sitúan una tasa de activación saludable entre 20% y 40%, con los productos de mejor desempeño superando el 70%.

A medida que el producto madura, las preguntas se desplazan hacia la retención, la expansión y la eficiencia. La retención neta de ingresos mediana en SaaS B2B ronda el 88–90%, mientras que los mejores equipos superan el 120%, lo que significa que su base actual de clientes crece más rápido de lo que se pierde por cancelaciones. Una métrica que era correcta para obsesionarse en el lanzamiento puede convertirse en una distracción un año después si el equipo nunca revisita el marco.

## Hacer de los KPIs parte del proceso de diseño, no una idea de último momento

Los equipos que hacen esto bien tratan la selección de KPIs como una decisión de diseño, no como un ejercicio de reporte que ocurre después del lanzamiento. Cuando producto, diseño e ingeniería acuerdan cómo se ve el éxito antes de trazar el primer wireframe, cada conversación posterior, sobre alcance, compensaciones y prioridades, se vuelve más precisa. Los debates dejan de ser sobre opiniones y empiezan a ser sobre evidencia.

Esta es exactamente la brecha que construimos [Product KPIs](/insights/introducing-product-kpis-bringing-measurable-impact-into-your-design-workflow) para cerrar: un plugin de Figma que pone KPIs probados por la industria, definiciones y benchmarks directamente dentro del flujo de diseño, para que la conversación sobre métricas ocurra en la misma mesa que la conversación de diseño.

## Errores comunes al elegir KPIs

Incluso los equipos que conocen la teoría cometen errores predecibles en la práctica. El más común es tratar un KPI como algo fijo una vez elegido, en lugar de revisarlo a medida que el producto cambia, una métrica que tenía sentido bajo un modelo de precios de solo prueba gratuita puede dejar de tenerlo silenciosamente seis meses después de lanzar un plan basado en uso. Otro error es elegir un KPI que ya va en la dirección correcta sin importar las acciones del equipo, lo que produce la ilusión reconfortante de progreso sin ser realmente informativo.

Un tercer error es optimizar una sola métrica de forma aislada sin una métrica de resguardo asociada. Un equipo que persigue la tasa de activación sin también vigilar la retención puede terminar "activando" usuarios mediante empujones agresivos de onboarding que llevan a alguien a través de un flujo sin crear valor duradero, el número de activación sube mientras el negocio subyacente empeora. Emparejar cada KPI principal con al menos una métrica de resguardo ayuda a detectar esto antes de que se convierta en un problema real.

## Un ejemplo práctico: elegir KPIs para una nueva funcionalidad

Supongamos que un equipo lanza una funcionalidad de colaboración dentro de un producto existente, algo como espacios de trabajo compartidos. Usando el marco AARRR como punto de partida, el equipo podría identificar tres métricas candidatas: activación (el porcentaje de usuarios que crean o se unen a un espacio de trabajo compartido durante su primera semana), retención (el porcentaje de miembros del espacio de trabajo que siguen activos 30 días después) y referencia (la tasa a la que los usuarios existentes invitan a nuevos colaboradores a un espacio de trabajo).

En lugar de medir las tres con el mismo peso desde el primer día, el equipo elige la activación como su única métrica prioritaria durante el primer mes después del lanzamiento, el punto donde la mayor incertidumbre es si la funcionalidad es lo suficientemente fácil de descubrir y usar. Una vez que la activación supera un benchmark saludable, la atención se traslada a la retención, porque una funcionalidad fácil de probar pero que no se vuelve a usar todavía no está resolviendo un problema real. Esta secuenciación, una métrica principal a la vez, elegida según dónde está la mayor incógnita en ese momento, tiende a producir decisiones más claras que monitorear cinco dashboards simultáneamente desde el día del lanzamiento.

## Preguntas frecuentes

### ¿Cuántos KPIs debería medir un equipo de producto a la vez?

Menos de lo que crees. A la mayoría de los equipos les va mejor midiendo una métrica principal por cada objetivo importante (un North Star Metric o un OMTM) junto con dos o tres métricas de apoyo que expliquen el movimiento de la principal. Medir una docena de KPIs a la vez tiende a diluir el foco en lugar de afinarlo.

### ¿Cuál es la diferencia entre un indicador adelantado y uno rezagado?

Un indicador adelantado (como la tasa de activación o el tiempo hasta el valor) predice resultados futuros y se puede influir rápidamente. Un indicador rezagado (como la retención o los ingresos) confirma lo que ya ocurrió y se mueve lentamente. Los equipos en etapa temprana deberían apoyarse en indicadores adelantados simplemente porque aún no tienen suficiente tiempo en el mercado para que los indicadores rezagados sean significativos.

### ¿Todo equipo debería tener un North Star Metric?

Ayuda, pero solo si la métrica se elige con cuidado. Un North Star Metric mal elegido, uno que se puede inflar sin entregar valor real, hace más daño que no tener ninguna métrica única. Debería ser difícil de mover sin mejorar genuinamente el producto.

### ¿Cuánto tiempo es razonable esperar antes de decidir que un KPI no está funcionando?

Depende del ritmo natural de la métrica. Un indicador adelantado como la activación se puede evaluar en semanas, ya que los usuarios experimentan valor rápido o no lo hacen. Un indicador rezagado como la retención neta de ingresos necesita al menos un trimestre completo, a menudo más, antes de que una tendencia se distinga del ruido, juzgarlo demasiado pronto es una de las formas más comunes en que los equipos se autoconvencen de abandonar una estrategia que habría funcionado.

### ¿Cuándo debería un equipo reconsiderar su elección de KPI?

Tres señales suelen indicar que es momento de revisar: la métrica lleva varios trimestres estancada a pesar de cambios reales de producto (lo que sugiere que ya no está midiendo lo que el equipo cree), el producto entró en una nueva etapa de madurez sin que el marco de medición se haya actualizado, o el equipo se sorprende justificando decisiones basadas en cómo se ve la métrica en lugar de en el resultado que se supone debe representar. Esa última señal es la más reveladora, es el momento exacto en que un KPI empieza a convertirse en la métrica de vanidad que se suponía debía evitar.

## Conclusión

Elegir los KPIs correctos no es un ejercicio de una sola vez, es una disciplina continua que separa a los equipos que aprenden de sus lanzamientos de los que simplemente pasan al siguiente. Acierta con las métricas, y todo lo que viene después, desde las decisiones de diseño hasta la priorización del roadmap, se vuelve más fácil de defender y de confiar.`,
    },
  },
  {
    slug: "containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us",
    titleKey: "posts.containment.title",
    excerptKey: "posts.containment.excerpt",
    author: "Jon Sabutis",
    date: "2025-07-17",
    image: "/images/blog/containment.png",
    content: {
      en: `Artificial intelligence is increasingly shaping the fundamental pillars of society, from the allocation of capital in finance and the dissemination of knowledge in education, to the provision of care in health and the exercise of power in politics, the critical question we face is no longer if AI should be regulated, but how. The imperative for regulation isn't born from speculative sci-fi nightmares of rogue sentient machines threatening humanity. Rather, it is driven by concrete, measurable harms that are already manifesting in our daily lives.

The scale and speed of AI deployment across society has outpaced our regulatory frameworks by decades. Consider that the same algorithms deciding mortgage approvals, criminal sentencing recommendations, and medical diagnoses operate with less oversight than the approval process for a new breakfast cereal.

## The Current Landscape: Documented Harms and Systemic Failures

### Bias Amplification in Critical Systems

Recent studies have documented how AI systems systematically disadvantage marginalized communities. The landmark [Gender Shades study out of MIT](https://news.mit.edu/2018/study-finds-gender-skin-type-bias-artificial-intelligence-systems-0212) found commercial facial-analysis systems misclassified darker-skinned women at error rates as high as 34.7%, compared to error rates near zero for lighter-skinned men. The study's influence pushed major vendors to measurably improve accuracy for underserved groups, proof that scrutiny works, but also proof the harm was real and already shipping in commercial products.

Hiring algorithms trained on historical data raise similar concerns. In [Mobley v. Workday](https://sanfordheisler.com/blog/ai-bias-in-hiring-algorithmic-recruiting-and-your-rights/), a federal court in 2026 allowed discrimination claims to proceed against an AI-powered applicant-screening tool, with plaintiffs alleging the system disadvantaged candidates over 40 and, in earlier filings, on the basis of race and disability. It's one of several active cases, alongside a widely reported ACLU complaint over an AI interview tool used against a deaf, Indigenous applicant, testing whether existing discrimination law can keep pace with automated hiring decisions made at scale.

### The Surveillance Economy

Modern AI surveillance extends far beyond traditional security cameras. Educational institutions deploy emotion recognition software to monitor student engagement, creating psychological profiles that follow students throughout their academic careers. Workplace surveillance systems track employee productivity, bathroom breaks, and social interactions, often with far less transparency than the hiring algorithms above, because monitoring tools are rarely subject to the same legal scrutiny as decisions like termination or promotion.

## Where Regulation Actually Stands in 2026

Talk of AI regulation isn't hypothetical anymore, it's actively being written, delayed, and litigated in real time, and the picture is more mixed than either AI optimists or AI alarmists tend to admit.

In the European Union, most remaining provisions of the [EU AI Act took effect on August 2, 2026](https://www.legiscope.com/blog/eu-ai-act-timeline-deadlines.html), including transparency duties and enforcement powers over general-purpose AI providers, with maximum fines reaching €35 million or 7% of global turnover. But under the Commission's "Digital Omnibus" initiative, [obligations for high-risk AI systems were deferred](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act) to December 2027 and August 2028, a reminder that even the world's most comprehensive AI law is still being negotiated in practice, not just on paper.

In the United States, there is no federal AI law of comparable scope. Instead, regulation is happening state by state, and fast: as of early 2026, lawmakers in 45 states had introduced over 1,500 AI-related bills, more than in all of 2024 combined, according to the [multistate.ai legislation tracker](https://www.multistate.ai/artificial-intelligence-ai-legislation). The approaches vary sharply. California's SB 942 requires generative AI providers to offer watermarking and content-detection tools. Colorado replaced its original AI Act with a narrower automated-decision-making statute effective 2027, requiring consumer notice and a right to human review for high-stakes decisions. Texas, by contrast, passed a Responsible AI Governance Act that mostly limits obligations to government use of AI, leaving the private sector largely untouched. That patchwork is itself a preview of the coordination problem discussed below.

## 9 Practical Strategies for AI Regulation

### 1. Algorithmic Auditing and Transparency Requirements
Mandate regular algorithmic audits for AI systems used in high-stakes decisions. These audits should examine training data, decision-making processes, and outcomes for bias and fairness, the kind of independent scrutiny that identified the accuracy disparities in the Gender Shades study years before regulation caught up.

### 2. Data Rights and Digital Dignity
Implement comprehensive data rights legislation that includes the right to algorithmic explanation, the right to human review of automated decisions, and the right to data portability. Colorado's revised automated-decision-making law is an early, narrow example of this principle in statute.

### 3. Algorithmic Labor Rights
Establish labor rights for AI workers, including fair wages, safe working conditions, and protection from psychological harm, a category that includes both the human raters and moderators training AI systems and the workers whose jobs are being restructured around them.

### 4. Public Interest AI Development
Establish public AI research institutions and require public benefit considerations in AI development, rather than leaving the direction of the technology entirely to a handful of commercial labs.

### 5. Sectoral AI Governance
Develop sector-specific AI governance frameworks that address the particular risks and requirements of each domain, healthcare, hiring, and criminal justice each need different guardrails, which is why Pennsylvania is pursuing healthcare-specific AI rules while New Jersey focuses on employment.

### 6. Democratic Participation in AI Governance
Create participatory governance mechanisms that give communities a voice in AI decisions that affect them, rather than leaving governance entirely to legislators and vendors negotiating without public input.

### 7. Liability and Redress Mechanisms
Establish clear liability frameworks for AI harms, including strict liability for certain high-risk AI applications. Active litigation like Mobley v. Workday is, in effect, courts trying to build this framework case by case in the absence of clear statutes.

### 8. International Cooperation and Standards
Develop international AI governance standards and cooperation mechanisms. The divergence between the EU's comprehensive-but-delayed approach and the US's fragmented state-by-state approach shows what happens without them: companies operating across borders face genuinely different rules depending on jurisdiction.

### 9. Adaptive Regulation and Continuous Monitoring
Create adaptive regulatory frameworks that can evolve with technology, the EU's own decision to defer high-risk provisions by more than a year shows that even well-resourced regulators are still calibrating timelines against real-world implementation capacity.

## What This Means for Businesses Building AI Products

For companies building AI-powered products rather than legislating them, the practical implication of this patchwork is that compliance can no longer be an afterthought bolted on before a launch. A product using AI in hiring, credit, healthcare, or education needs to track requirements across every jurisdiction it operates in, not just its headquarters, and the safest working assumption in 2026 is that the requirements will keep changing under you. Building in audit logging, explainability, and human-review pathways from the start is significantly cheaper than retrofitting them once a regulator or a plaintiff's attorney asks for them.

## What This Means for Individuals

Most people encountering AI-driven decisions, a loan application, a job screening, an insurance quote, still have very little visibility into when AI was involved at all, let alone how it reached its conclusion. The regulatory patchwork described above is starting to change that, but unevenly: a resident of Colorado will have meaningfully different rights to an explanation and human review than a resident of Texas, simply based on where they live, at least until federal legislation or interstate coordination catches up. Until that gap closes, the most practical protection available to most people is simply asking, directly, whether a decision that affects them involved an automated system, a question that a growing number of state laws now give people an explicit right to ask.

## Frequently Asked Questions

### Is there a federal AI law in the United States?

Not yet, as of 2026. Regulation is happening primarily at the state level, which is why requirements vary significantly depending on where a company operates and which state's residents it serves.

### What happens if a company doesn't comply with the EU AI Act?

Penalties can reach €35 million or 7% of global annual turnover, whichever is higher, a maximum fine that exceeds even the GDPR's, reflecting how seriously EU regulators are treating high-risk AI use cases.

### Does AI regulation slow down innovation?

It's a real trade-off, but not an automatic one. Well-designed sectoral rules, the kind we discuss above, tend to concentrate compliance burden on genuinely high-risk uses (hiring, healthcare, credit) rather than blanket restrictions, which is closer to the direction most 2026 state laws are actually taking.

### How can a business track which AI regulations apply to it?

Given how fast the state-by-state landscape is moving in the US alongside the EU's own shifting timeline, most companies operating across multiple jurisdictions rely on a dedicated legal or compliance function rather than tracking changes ad hoc. For smaller teams without that resource, following an established tracker like the ones cited above and reviewing it quarterly is a reasonable minimum, especially for any product touching hiring, credit, healthcare, or education.

## Conclusion

We stand at a critical juncture in human history. The choices we make about AI governance in the coming years will shape the trajectory of technological development and social progress for generations to come. As we've written about separately, [public trust in AI remains deeply divided](/insights/excited-or-terrified-what-people-really-think-about-ai), and that divide is itself part of what regulators are responding to. The nine strategies outlined here, several of which are already showing up in early, imperfect form in real statutes and court cases, provide a roadmap for containing AI's risks while preserving its benefits.`,
      es: `La inteligencia artificial moldea cada vez más los pilares fundamentales de la sociedad, desde la asignación de capital en finanzas y la difusión del conocimiento en educación, hasta la provisión de cuidados en salud y el ejercicio del poder en la política, la pregunta crítica que enfrentamos ya no es si la IA debería regularse, sino cómo. El imperativo de regular no nace de pesadillas especulativas de ciencia ficción sobre máquinas sintientes descontroladas. Nace de daños concretos y medibles que ya se manifiestan en nuestra vida diaria.

La escala y velocidad del despliegue de IA en la sociedad ha superado a los marcos regulatorios por décadas. Considera que los mismos algoritmos que deciden aprobaciones hipotecarias, recomendaciones de sentencias penales y diagnósticos médicos operan con menos supervisión que el proceso de aprobación de un nuevo cereal para desayuno.

## El panorama actual: daños documentados y fallas sistémicas

### Amplificación de sesgos en sistemas críticos

Estudios recientes han documentado cómo los sistemas de IA perjudican sistemáticamente a comunidades marginadas. El histórico [estudio Gender Shades del MIT](https://news.mit.edu/2018/study-finds-gender-skin-type-bias-artificial-intelligence-systems-0212) encontró que los sistemas comerciales de análisis facial clasificaban erróneamente a mujeres de piel oscura con tasas de error de hasta 34.7%, comparado con tasas de error cercanas a cero para hombres de piel clara. La influencia del estudio llevó a los principales proveedores a mejorar de forma medible la precisión para grupos históricamente desatendidos, prueba de que el escrutinio funciona, pero también prueba de que el daño era real y ya estaba presente en productos comerciales.

Los algoritmos de contratación entrenados con datos históricos generan preocupaciones similares. En el caso [Mobley v. Workday](https://sanfordheisler.com/blog/ai-bias-in-hiring-algorithmic-recruiting-and-your-rights/), un tribunal federal permitió en 2026 que avanzaran demandas por discriminación contra una herramienta de selección de candidatos impulsada por IA, con demandantes alegando que el sistema perjudicaba a candidatos mayores de 40 años y, en presentaciones anteriores, por raza y discapacidad. Es uno de varios casos activos, junto a una demanda de la ACLU ampliamente cubierta por una herramienta de entrevistas con IA usada contra una candidata sorda e indígena, que ponen a prueba si las leyes de discriminación existentes pueden seguirle el ritmo a decisiones de contratación automatizadas a gran escala.

### La economía de la vigilancia

La vigilancia moderna con IA va mucho más allá de las cámaras de seguridad tradicionales. Instituciones educativas despliegan software de reconocimiento de emociones para monitorear el compromiso de los estudiantes, creando perfiles psicológicos que los siguen a lo largo de su vida académica. Los sistemas de vigilancia laboral rastrean la productividad de los empleados, los descansos al baño y las interacciones sociales, a menudo con mucha menos transparencia que los algoritmos de contratación mencionados arriba, porque las herramientas de monitoreo rara vez están sujetas al mismo escrutinio legal que decisiones como el despido o el ascenso.

## Dónde está realmente la regulación en 2026

Hablar de regulación de IA ya no es hipotético, se está escribiendo, retrasando y litigando activamente en tiempo real, y el panorama es más mixto de lo que tanto los optimistas como los alarmistas de la IA suelen admitir.

En la Unión Europea, la mayoría de las disposiciones restantes de la [Ley de IA de la UE entraron en vigor el 2 de agosto de 2026](https://www.legiscope.com/blog/eu-ai-act-timeline-deadlines.html), incluyendo obligaciones de transparencia y facultades de aplicación sobre proveedores de IA de propósito general, con multas máximas de hasta 35 millones de euros o el 7% de la facturación global. Pero bajo la iniciativa "Digital Omnibus" de la Comisión, [las obligaciones para sistemas de IA de alto riesgo fueron aplazadas](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act) hasta diciembre de 2027 y agosto de 2028, un recordatorio de que incluso la ley de IA más completa del mundo todavía se está negociando en la práctica, no solo en el papel.

En Estados Unidos no existe una ley federal de IA de alcance comparable. En cambio, la regulación ocurre estado por estado, y rápido: a principios de 2026, legisladores de 45 estados habían presentado más de 1,500 proyectos de ley relacionados con IA, más que en todo 2024 combinado, según el [rastreador de legislación de multistate.ai](https://www.multistate.ai/artificial-intelligence-ai-legislation). Los enfoques varían drásticamente. La SB 942 de California exige que los proveedores de IA generativa ofrezcan marcas de agua y herramientas de detección de contenido. Colorado reemplazó su ley original de IA con un estatuto más específico sobre toma de decisiones automatizada, vigente desde 2027, que exige notificación al consumidor y derecho a revisión humana en decisiones de alto impacto. Texas, en cambio, aprobó una Ley de Gobernanza Responsable de IA que limita las obligaciones principalmente al uso gubernamental de IA, dejando al sector privado prácticamente sin regular. Ese mosaico normativo es, en sí mismo, un anticipo del problema de coordinación que se discute más abajo.

## 9 estrategias prácticas para regular la IA

### 1. Auditoría algorítmica y requisitos de transparencia
Exigir auditorías algorítmicas periódicas para los sistemas de IA usados en decisiones de alto impacto. Estas auditorías deberían examinar los datos de entrenamiento, los procesos de toma de decisiones y los resultados en busca de sesgo e imparcialidad, el tipo de escrutinio independiente que identificó las disparidades de precisión en el estudio Gender Shades años antes de que la regulación las alcanzara.

### 2. Derechos de datos y dignidad digital
Implementar legislación integral de derechos de datos que incluya el derecho a una explicación algorítmica, el derecho a revisión humana de decisiones automatizadas y el derecho a la portabilidad de datos. La ley revisada de toma de decisiones automatizada de Colorado es un ejemplo temprano y acotado de este principio ya en un estatuto.

### 3. Derechos laborales algorítmicos
Establecer derechos laborales para los trabajadores de IA, incluyendo salarios justos, condiciones de trabajo seguras y protección frente al daño psicológico, una categoría que incluye tanto a los evaluadores y moderadores humanos que entrenan los sistemas de IA como a los trabajadores cuyos empleos se están reestructurando en torno a ellos.

### 4. Desarrollo de IA de interés público
Establecer instituciones públicas de investigación en IA y exigir consideraciones de beneficio público en su desarrollo, en lugar de dejar la dirección de la tecnología enteramente en manos de un puñado de laboratorios comerciales.

### 5. Gobernanza sectorial de la IA
Desarrollar marcos de gobernanza de IA específicos por sector que aborden los riesgos y requisitos particulares de cada ámbito, salud, contratación y justicia penal necesitan barreras distintas, por lo que Pensilvania está impulsando reglas específicas de IA en salud mientras Nueva Jersey se enfoca en el empleo.

### 6. Participación democrática en la gobernanza de la IA
Crear mecanismos de gobernanza participativa que le den voz a las comunidades en las decisiones de IA que las afectan, en lugar de dejar la gobernanza enteramente en manos de legisladores y proveedores que negocian sin aporte público.

### 7. Mecanismos de responsabilidad y reparación
Establecer marcos claros de responsabilidad por daños causados por IA, incluyendo responsabilidad estricta para ciertas aplicaciones de alto riesgo. Litigios activos como Mobley v. Workday son, en la práctica, tribunales tratando de construir este marco caso por caso ante la ausencia de estatutos claros.

### 8. Cooperación internacional y estándares
Desarrollar estándares y mecanismos de cooperación internacional en gobernanza de IA. La divergencia entre el enfoque integral (pero aplazado) de la UE y el enfoque fragmentado estado por estado de EE. UU. muestra lo que ocurre sin ellos: las empresas que operan a través de fronteras enfrentan reglas genuinamente distintas según la jurisdicción.

### 9. Regulación adaptativa y monitoreo continuo
Crear marcos regulatorios adaptativos que puedan evolucionar con la tecnología, la propia decisión de la UE de aplazar más de un año las disposiciones de alto riesgo muestra que incluso los reguladores mejor dotados de recursos todavía están calibrando los plazos frente a la capacidad real de implementación.

## Lo que esto significa para las empresas que construyen productos de IA

Para las empresas que construyen productos impulsados por IA, en lugar de legislarlos, la implicación práctica de este mosaico normativo es que el cumplimiento ya no puede ser una idea de último momento añadida justo antes de un lanzamiento. Un producto que usa IA en contratación, crédito, salud o educación necesita rastrear los requisitos de cada jurisdicción en la que opera, no solo la de su sede central, y el supuesto de trabajo más seguro en 2026 es que esos requisitos seguirán cambiando. Incorporar registro de auditoría, explicabilidad y vías de revisión humana desde el inicio resulta significativamente más barato que adaptarlos después, cuando un regulador o el abogado de un demandante los exija.

## Lo que esto significa para las personas

La mayoría de las personas que se enfrentan a decisiones impulsadas por IA, una solicitud de préstamo, un filtro de contratación, una cotización de seguro, todavía tienen muy poca visibilidad sobre cuándo intervino la IA, y mucho menos sobre cómo llegó a su conclusión. El mosaico regulatorio descrito arriba está empezando a cambiar eso, pero de forma desigual: un residente de Colorado tendrá derechos significativamente distintos a una explicación y a revisión humana que un residente de Texas, simplemente según dónde viva, al menos hasta que la legislación federal o la coordinación entre estados se ponga al día. Hasta que esa brecha se cierre, la protección más práctica disponible para la mayoría de las personas es simplemente preguntar, directamente, si una decisión que las afecta involucró un sistema automatizado, una pregunta que un número creciente de leyes estatales ahora les da el derecho explícito de hacer.

## Preguntas frecuentes

### ¿Existe una ley federal de IA en Estados Unidos?

Todavía no, a partir de 2026. La regulación ocurre principalmente a nivel estatal, por lo que los requisitos varían significativamente según dónde opere una empresa y a qué residentes estatales atienda.

### ¿Qué pasa si una empresa no cumple con la Ley de IA de la UE?

Las sanciones pueden alcanzar los 35 millones de euros o el 7% de la facturación anual global, lo que sea mayor, una multa máxima que supera incluso a la del GDPR, lo que refleja qué tan en serio están tomando los reguladores europeos los casos de uso de IA de alto riesgo.

### ¿La regulación de IA frena la innovación?

Es una compensación real, pero no automática. Las reglas sectoriales bien diseñadas, del tipo que discutimos arriba, tienden a concentrar la carga de cumplimiento en usos genuinamente de alto riesgo (contratación, salud, crédito) en lugar de restricciones generales, que es la dirección hacia la que realmente se están moviendo la mayoría de las leyes estatales de 2026.

### ¿Cómo puede una empresa rastrear qué regulaciones de IA le aplican?

Dado lo rápido que se mueve el panorama estado por estado en EE. UU. junto con el calendario cambiante de la propia UE, la mayoría de las empresas que operan en múltiples jurisdicciones dependen de una función legal o de cumplimiento dedicada en lugar de rastrear los cambios de forma improvisada. Para equipos más pequeños sin ese recurso, seguir un rastreador establecido como los citados arriba y revisarlo trimestralmente es un mínimo razonable, especialmente para cualquier producto que toque contratación, crédito, salud o educación.

## Conclusión

Estamos en un momento crítico de la historia humana. Las decisiones que tomemos sobre la gobernanza de la IA en los próximos años determinarán la trayectoria del desarrollo tecnológico y el progreso social por generaciones. Como hemos escrito por separado, [la confianza pública en la IA sigue profundamente dividida](/insights/excited-or-terrified-what-people-really-think-about-ai), y esa división es en sí misma parte de lo que los reguladores están tratando de atender. Las nueve estrategias descritas aquí, varias de las cuales ya aparecen, de forma temprana e imperfecta, en estatutos reales y casos judiciales, ofrecen una hoja de ruta para contener los riesgos de la IA sin renunciar a sus beneficios.`,
    },
  },
  {
    slug: "10-ways-to-incorporate-ai-into-everyday-life",
    titleKey: "posts.everydayAI.title",
    excerptKey: "posts.everydayAI.excerpt",
    author: "Jon Sabutis",
    date: "2025-05-21",
    image: "/images/blog/everyday-ai.png",
    content: {
      en: `As Artificial Intelligence (AI) continues to evolve, it has become an increasingly valuable tool in various aspects of life. From work tasks to personal activities, AI can be a supportive ally in a wide range of scenarios, often in ways that don't feel like "using AI" at all. That shift is measurable, not just anecdotal: recent [Pew Research Center survey data](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/) shows 31% of Americans now interact with AI several times a day, up from 22% just two years earlier, and 44% of U.S. adults now report using ChatGPT specifically, up from 34% the year before.

Here are ten practical, low-effort ways AI is already showing up in daily life, and what makes each one worth trying if you haven't already.

## 1. Language Translation and Learning Assistant
AI-powered language translation tools have revolutionized how people learn new languages and communicate across language barriers. With tools like Google Translate or AI-driven apps like Duolingo, users can quickly and accurately translate words, sentences, or entire paragraphs, and even hold real-time conversations with speakers of another language. For travelers and multilingual households, this has quietly closed a communication gap that used to require a phrasebook or a translator on call.

## 2. Personalized Cooking Assistance
AI can be a tremendous help in the kitchen. AI-powered apps can suggest recipes based on available ingredients, dietary preferences, or even health goals, cutting down on both food waste and the nightly "what should we make" debate. Some go a step further, adjusting portion sizes and substitutions automatically for allergies or macro targets, which turns a generic recipe into something closer to a personal meal plan.

## 3. Smart Home Automation
From smart thermostats like Nest to voice-controlled smart assistants like Amazon Alexa and Google Assistant, AI can streamline day-to-day home management. These systems learn your routines over time, adjusting lighting, temperature, and security without you having to lift a finger. Over months of use, the energy savings from a thermostat that actually learns your schedule can add up to a meaningfully lower utility bill, not just convenience.

## 4. Personal Finance Management
AI can simplify personal finance management by automating budgeting and tracking expenses. Apps can flag unusual spending, forecast cash flow, and surface savings opportunities you'd likely miss scanning a statement by hand. The value here isn't replacing financial judgment, it's catching the small recurring charges and spending patterns that are easy to miss until they've compounded over months.

## 5. Enhanced Customer Service with AI Chatbots
AI chatbots are transforming customer service by offering immediate assistance through messaging platforms, websites, and apps. For simple, repetitive questions, this means no more waiting on hold, and for companies, it means human agents can focus on the issues that actually need a person. The best implementations make it obvious and easy to escalate to a human the moment a question gets complicated, rather than trapping users in a loop.

## 6. Virtual Health Assistants and Wellness Monitoring
AI-driven health assistants are playing an increasingly significant role in healthcare and wellness. Wearables and apps now track sleep, activity, and vital signs continuously, surfacing patterns a once-a-year checkup would never catch. This kind of continuous monitoring is most useful as an early-warning system, flagging a trend worth mentioning to a doctor, not replacing the doctor.

## 7. Productivity Tools and Task Automation
Tools like scheduling assistants can help manage appointments, coordinate meetings, and optimize calendars. AI can also draft routine emails, summarize long documents, and handle the small administrative tasks that quietly eat up a workday. The realistic win here is time, not magic, reclaiming the twenty minutes spent finding a meeting slot across five calendars adds up fast across a year.

## 8. Smart Shopping and Price Comparisons
AI tools can automatically compare prices across different retailers, ensuring the best deals for consumers. Some go further, tracking price history and alerting you when an item you're watching hits its lowest point, which turns "maybe I'll catch a sale" into an automated, passive habit instead of something you have to remember to check.

## 9. Entertainment and Content Recommendations
Platforms like Netflix, Spotify, and YouTube use AI algorithms to recommend content based on a user's history. The better these systems get at understanding taste, the less time you spend browsing and the more time you spend actually watching or listening. The trade-off to understand is the filter bubble effect: these systems optimize for what keeps you engaged, not necessarily what broadens your taste, so it helps to deliberately search outside your usual recommendations now and then.

## 10. Enhanced Travel Experiences
AI-powered travel apps offer personalized recommendations for flights, hotels, restaurants, and activities. Some can even monitor fare changes and rebook automatically when a cheaper option appears after you've already purchased, effectively giving you a price-watching assistant that never sleeps.

## What These Tools Have in Common

Underneath the variety, most of the tools above share the same basic mechanism: they get more useful the more data you give them, whether that's your calendar, your spending history, your recipe preferences, or your health metrics. That's the appeal and the trade-off in the same package. A budgeting app that sees every transaction can catch a fraudulent charge in real time; the same access is exactly why it matters which company built it and how they handle that data.

This is also why the 2026 Pew data on rising AI usage reads differently alongside the finding that about half of Americans worry AI will worsen people's ability to think creatively and connect with each other. The tools in this list are, for the most part, the low-stakes end of that spectrum, a smart thermostat isn't going to erode your relationships. But the habit of defaulting to an AI recommendation, whether it's a recipe or a travel itinerary, is something to notice in yourself over time, if only so it stays a convenience rather than becoming the only way you make small decisions.

## Getting Started Without Overwhelming Yourself

Trying to adopt all ten of these at once is a good way to abandon all of them within a month. A more durable approach is picking the one or two that solve a genuine recurring annoyance, not a hypothetical one, and giving it a few weeks before adding anything else. Someone who already dreads grocery planning will get more out of an AI cooking assistant in month one than someone adding it on top of eight other new habits simultaneously.

There's also a useful distinction between tools that require an ongoing relationship, like a health-tracking wearable or a finance app, and tools you can dip in and out of without any setup cost, like a translation app or a shopping price-comparison tool. Starting with the second category is usually the lower-friction way in, since there's nothing to configure or commit to before you know whether the tool is actually useful to you.

## Frequently Asked Questions

### Do I need technical skills to start using AI in daily life?

No. Nearly all of the tools above, translation apps, smart thermostats, budgeting apps, streaming recommendations, are designed for everyday use with no setup beyond downloading an app or connecting a device.

### Is it safe to give AI apps access to financial or health data?

It depends on the app's privacy practices, not on AI itself. Read the permissions an app requests, check whether data is shared with third parties, and prefer apps that are explicit about what they store and for how long, the same due diligence you'd apply to any app handling sensitive information.

### Which of these is worth trying first?

Start with whichever solves a recurring annoyance rather than a novelty. A smart thermostat or a budgeting app tends to deliver measurable value within the first month, while something like an AI recipe assistant is lower-stakes and easier to simply try.

### Will relying on AI for these tasks make me worse at doing them myself?

It depends on which tasks and how much you offload. Outsourcing price comparisons or fare-tracking doesn't cost you a skill you were building anyway. Outsourcing something like drafting every piece of writing you do, on the other hand, can genuinely blunt a skill over time if it replaces practice rather than freeing up time for higher-value work, so it helps to be deliberate about which category a given habit falls into.

### How do I know if an app's "AI features" are actually useful or just marketing?

Test it against a task you'd otherwise do manually and compare the result honestly. A genuinely useful AI feature saves real time or catches something you'd have missed; a marketing-driven one adds a chatbot interface to something a simple form already handled fine. If a feature doesn't survive that comparison after a couple of tries, it's fair to ignore it and stick with the plain version of the tool.

## Conclusion
AI is no longer a futuristic concept; it's a practical tool that can be incorporated into everyday life. For those who haven't yet explored AI's potential, now is the perfect time to begin, one small habit, app, or automation at a time. If you're curious where this is headed for more personal use cases, we've also written about the more complicated territory of [AI companionship and connection](/insights/would-you-date-an-ai).`,
      es: `A medida que la Inteligencia Artificial (IA) continúa evolucionando, se ha convertido en una herramienta cada vez más valiosa en distintos aspectos de la vida. Desde tareas laborales hasta actividades personales, la IA puede ser un aliado de apoyo en una amplia variedad de escenarios, muchas veces sin que se sienta como "usar IA" en absoluto. Ese cambio es medible, no solo anecdótico: datos recientes del [Pew Research Center](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/) muestran que el 31% de los estadounidenses ahora interactúa con IA varias veces al día, frente al 22% de hace apenas dos años, y que el 44% de los adultos en EE. UU. ya reporta usar específicamente ChatGPT, frente al 34% del año anterior.

Aquí van diez formas prácticas y de bajo esfuerzo en las que la IA ya está presente en la vida diaria, y qué hace que cada una valga la pena probar si aún no lo has hecho.

## 1. Traducción de idiomas y asistente de aprendizaje
Las herramientas de traducción impulsadas por IA han revolucionado cómo la gente aprende nuevos idiomas y se comunica a través de barreras lingüísticas. Con herramientas como Google Translate o apps impulsadas por IA como Duolingo, los usuarios pueden traducir palabras, oraciones o párrafos completos de forma rápida y precisa, e incluso sostener conversaciones en tiempo real con hablantes de otro idioma. Para viajeros y hogares multilingües, esto ha cerrado silenciosamente una brecha de comunicación que antes requería un diccionario de bolsillo o un traductor disponible.

## 2. Asistencia personalizada para cocinar
La IA puede ser una gran ayuda en la cocina. Las apps impulsadas por IA pueden sugerir recetas según los ingredientes disponibles, preferencias alimenticias o incluso objetivos de salud, reduciendo tanto el desperdicio de comida como el debate nocturno de "¿qué hacemos de cenar?". Algunas van más allá, ajustando porciones y sustituciones automáticamente por alergias o metas de macronutrientes, convirtiendo una receta genérica en algo más parecido a un plan de comidas personalizado.

## 3. Automatización del hogar inteligente
Desde termostatos inteligentes como Nest hasta asistentes controlados por voz como Amazon Alexa y Google Assistant, la IA puede simplificar la gestión diaria del hogar. Estos sistemas aprenden tus rutinas con el tiempo, ajustando iluminación, temperatura y seguridad sin que tengas que mover un dedo. Con meses de uso, el ahorro energético de un termostato que realmente aprende tu horario puede traducirse en una factura de servicios notablemente más baja, no solo en comodidad.

## 4. Gestión de finanzas personales
La IA puede simplificar la gestión de finanzas personales automatizando presupuestos y el seguimiento de gastos. Las apps pueden marcar gastos inusuales, proyectar flujo de efectivo y detectar oportunidades de ahorro que probablemente pasarías por alto revisando un estado de cuenta a mano. El valor aquí no es reemplazar el criterio financiero, es detectar los cargos recurrentes pequeños y los patrones de gasto que son fáciles de pasar por alto hasta que se acumulan durante meses.

## 5. Servicio al cliente mejorado con chatbots de IA
Los chatbots de IA están transformando el servicio al cliente al ofrecer asistencia inmediata a través de plataformas de mensajería, sitios web y apps. Para preguntas simples y repetitivas, esto significa no más esperas en línea telefónica, y para las empresas, significa que los agentes humanos pueden enfocarse en los problemas que realmente necesitan una persona. Las mejores implementaciones hacen que sea obvio y fácil escalar a un humano en el momento en que una pregunta se complica, en lugar de atrapar a los usuarios en un bucle.

## 6. Asistentes de salud virtuales y monitoreo de bienestar
Los asistentes de salud impulsados por IA están jugando un papel cada vez más importante en la salud y el bienestar. Los wearables y las apps ahora rastrean el sueño, la actividad y los signos vitales de forma continua, revelando patrones que un chequeo anual jamás detectaría. Este tipo de monitoreo continuo es más útil como sistema de alerta temprana, señalando una tendencia que vale la pena mencionarle a un médico, no reemplazando al médico.

## 7. Herramientas de productividad y automatización de tareas
Herramientas como los asistentes de programación pueden ayudar a gestionar citas, coordinar reuniones y optimizar calendarios. La IA también puede redactar correos rutinarios, resumir documentos extensos y encargarse de las pequeñas tareas administrativas que silenciosamente consumen una jornada laboral. La ganancia realista aquí es tiempo, no magia, recuperar los veinte minutos que se van en encontrar un horario de reunión entre cinco calendarios se acumula rápido a lo largo de un año.

## 8. Compras inteligentes y comparación de precios
Las herramientas de IA pueden comparar precios automáticamente entre distintos retailers, asegurando las mejores ofertas para los consumidores. Algunas van más allá, rastreando el historial de precios y avisándote cuando un artículo que sigues llega a su precio más bajo, convirtiendo el "quizás encuentre una oferta" en un hábito automatizado y pasivo en lugar de algo que tienes que recordar revisar.

## 9. Entretenimiento y recomendaciones de contenido
Plataformas como Netflix, Spotify y YouTube usan algoritmos de IA para recomendar contenido según el historial del usuario. Cuanto mejor entienden estos sistemas tus gustos, menos tiempo pasas explorando y más tiempo pasas realmente viendo o escuchando. La contrapartida a entender es el efecto de burbuja de filtro: estos sistemas optimizan para lo que te mantiene enganchado, no necesariamente para lo que amplía tu gusto, así que ayuda buscar deliberadamente fuera de tus recomendaciones habituales de vez en cuando.

## 10. Experiencias de viaje mejoradas
Las apps de viaje impulsadas por IA ofrecen recomendaciones personalizadas de vuelos, hoteles, restaurantes y actividades. Algunas incluso monitorean cambios de tarifa y reservan automáticamente cuando aparece una opción más barata después de que ya compraste, dándote en la práctica un asistente de vigilancia de precios que nunca duerme.

## Lo que estas herramientas tienen en común

Debajo de la variedad, la mayoría de las herramientas mencionadas comparten el mismo mecanismo básico: se vuelven más útiles cuanta más información les des, ya sea tu calendario, tu historial de gastos, tus preferencias de recetas o tus métricas de salud. Ese es el atractivo y la contrapartida en el mismo paquete. Una app de presupuesto que ve cada transacción puede detectar un cargo fraudulento en tiempo real; ese mismo acceso es exactamente por qué importa qué empresa la construyó y cómo maneja esos datos.

Por eso los datos de Pew de 2026 sobre el aumento del uso de IA se leen distinto junto con el hallazgo de que cerca de la mitad de los estadounidenses teme que la IA empeore la capacidad de las personas para pensar de forma creativa y conectar entre sí. Las herramientas de esta lista son, en su mayoría, el extremo de menor riesgo de ese espectro, un termostato inteligente no va a erosionar tus relaciones. Pero el hábito de recurrir por defecto a una recomendación de IA, ya sea una receta o un itinerario de viaje, es algo que notar en uno mismo con el tiempo, aunque sea para que siga siendo una comodidad y no se convierta en la única forma de tomar pequeñas decisiones.

## Empezar sin abrumarte

Intentar adoptar las diez a la vez es una buena forma de abandonarlas todas en un mes. Un enfoque más duradero es elegir una o dos que resuelvan una molestia recurrente genuina, no hipotética, y darle unas semanas antes de agregar algo más. A alguien que ya odia planear las compras del súper le sacará más provecho a un asistente de cocina con IA en el primer mes que a alguien que lo agrega encima de otros ocho hábitos nuevos al mismo tiempo.

También existe una distinción útil entre herramientas que requieren una relación continua, como un wearable de salud o una app financiera, y herramientas que puedes usar de forma ocasional sin ningún costo de configuración, como una app de traducción o una herramienta de comparación de precios. Empezar por la segunda categoría suele ser la entrada con menos fricción, ya que no hay nada que configurar ni comprometer antes de saber si la herramienta realmente te resulta útil.

## Preguntas frecuentes

### ¿Necesito habilidades técnicas para empezar a usar IA en el día a día?

No. Casi todas las herramientas mencionadas, apps de traducción, termostatos inteligentes, apps de presupuesto, recomendaciones de streaming, están diseñadas para uso cotidiano sin más configuración que descargar una app o conectar un dispositivo.

### ¿Es seguro darle a las apps de IA acceso a datos financieros o de salud?

Depende de las prácticas de privacidad de la app, no de la IA en sí. Lee los permisos que solicita una app, verifica si comparte datos con terceros y prefiere apps que sean explícitas sobre qué almacenan y por cuánto tiempo, la misma diligencia que aplicarías a cualquier app que maneje información sensible.

### ¿Cuál de estas vale la pena probar primero?

Empieza con la que resuelva una molestia recurrente en lugar de una novedad. Un termostato inteligente o una app de presupuesto suele entregar valor medible dentro del primer mes, mientras que algo como un asistente de recetas con IA es de menor riesgo y más fácil de simplemente probar.

### ¿Depender de la IA para estas tareas me hará peor haciéndolas por mi cuenta?

Depende de qué tareas y de cuánto delegues. Delegar la comparación de precios o el seguimiento de tarifas no te cuesta una habilidad que estuvieras desarrollando de todos modos. Delegar algo como redactar todo lo que escribes, en cambio, sí puede debilitar genuinamente una habilidad con el tiempo si reemplaza la práctica en lugar de liberar tiempo para trabajo de mayor valor, así que ayuda ser deliberado sobre en qué categoría cae cada hábito.

### ¿Cómo sé si las "funciones de IA" de una app son realmente útiles o solo marketing?

Ponla a prueba contra una tarea que de otro modo harías manualmente y compara el resultado con honestidad. Una función de IA genuinamente útil ahorra tiempo real o detecta algo que se te hubiera pasado; una impulsada por marketing simplemente le agrega una interfaz de chatbot a algo que un formulario simple ya resolvía bien. Si una función no supera esa comparación después de un par de intentos, es válido ignorarla y quedarte con la versión simple de la herramienta.

## Conclusión
La IA ya no es un concepto futurista; es una herramienta práctica que se puede incorporar a la vida diaria. Para quienes aún no han explorado su potencial, ahora es el momento perfecto para empezar, un hábito, una app o una automatización a la vez. Si tienes curiosidad por hacia dónde va esto en usos más personales, también hemos escrito sobre el territorio más complejo de la [compañía e IA](/insights/would-you-date-an-ai).`,
    },
  },
  {
    slug: "lean-product-canvas-interactive-figma-templates",
    titleKey: "posts.leanCanvas.title",
    excerptKey: "posts.leanCanvas.excerpt",
    author: "Jon Sabutis",
    date: "2025-05-12",
    image: "/images/blog/lean-canvas.png",
    content: {
      en: `When we engaged two of the most influential voices in modern product thinking, Jeff Gothelf and Josh Seiden, co-authors of Lean UX, Sense & Respond, and Who Does What By How Much?, we recognized the opportunity to collaborate on something that could meaningfully impact how product teams work, align, and build across the globe.

At the heart of this collaboration was their vision: to bring the newly evolved [Lean Product Canvas](https://jeffgothelf.com/blog/the-lean-product-canvas/), the successor to the widely-used [Lean UX Canvas](https://leanuxbook.com/), into a modern, flexible, and fully interactive digital format.

## From Lean UX Canvas to Lean Product Canvas

What originally began as the Lean UX Canvas has now evolved into a more comprehensive framework: the Lean Product Canvas. This new format broadens its focus beyond UX execution and into organizational alignment, business goals, and long-term strategy, giving teams a single artifact that connects why they're building something to what they're actually shipping.

The shift reflects something Gothelf and Seiden have argued for years in Lean UX and Sense & Respond: that design, product, and strategy conversations shouldn't live in separate documents owned by separate teams. A canvas is only as useful as the shared understanding it creates, and a canvas that only designers open isn't doing that job.

## A Deep Collaboration with Jeff Gothelf and Josh Seiden

Throughout the collaboration, we worked directly with Jeff Gothelf to translate the Lean Product Canvas into an actionable, facilitation-friendly experience tailored for Figma and FigJam. Every field, prompt, and layout decision was tested against how real teams actually run workshops, not just how the framework looks on a slide.

That distinction matters more than it might sound. A canvas that looks clean in a book chapter can fall apart the moment eight people are trying to fill it out together in a 90-minute session. We built and rebuilt the layout around real facilitation constraints: how much can realistically get filled in per section before a team loses momentum, where sticky-note-style contributions need room to cluster, and how to keep the canvas legible when it's being co-edited live rather than presented after the fact.

## What Teams Are Unlocking

- **Tighter Execution**: Strategy and delivery are connected by a shared language and visual reference.
- **Early Obstacle Detection**: Friction points and gaps are surfaced before development begins.
- **Clarity on Objectives**: OKRs and desired outcomes are defined early.
- **Strategic Alignment**: Teams align around a shared understanding of purpose.

Because the canvas lives natively in Figma and FigJam, it's not a document that gets filled out once and forgotten, it stays in the same workspace where the actual design and planning work happens, so it gets revisited as the product evolves. That's a meaningful departure from how most strategy artifacts get used in practice: filled in once during a kickoff, exported to a slide, and never opened again.

## Inside the Canvas: What Each Section Covers

The Lean Product Canvas is organized around a sequence of questions that build on each other, rather than a grid of disconnected boxes. It typically opens with Business Outcomes, the measurable result the organization actually cares about, which forces the team to articulate success in terms leadership would recognize, not just in terms of shipped features. From there it moves to Users and Customers, then User Outcomes, what the person using the product needs to achieve for the business outcome to follow, which is the step most teams skip when they jump straight from a business goal to a solution.

Only after those are defined does the canvas get to Solutions, followed by Hypotheses, explicit, falsifiable statements about what the team believes will happen if the solution ships, and Experiments, the fastest, cheapest way to test each hypothesis before committing significant engineering time. That ordering is deliberate: teams that start with a solution and work backward to justify it tend to talk themselves into whatever they wanted to build anyway, while teams that start with outcomes are forced to justify the solution on its own merits.

## Common Facilitation Pitfalls

Running a canvas session well is harder than it looks, and we learned a few consistent failure modes while building this with Gothelf. The most common is a team filling in the Solutions section first and then reverse-engineering the outcomes and hypotheses to match it, which defeats the entire purpose of the exercise. A second is one senior voice in the room filling in most of the canvas while everyone else nods along; the canvas only earns its keep when it captures genuine disagreement, not consensus reached through deference. A third is treating the finished canvas as a one-time artifact rather than a living reference, teams that revisit it after each round of experiments get far more value from it than teams that fill it in once and move straight to execution.

## Who Should Use This

The Lean Product Canvas is built for cross-functional teams at the point where a product idea needs to become a shared plan, typically product managers, designers, and engineering leads working together at the start of a new initiative, or revisiting an existing one that's lost direction. It's equally useful for a five-person startup validating a first product and a larger organization trying to get several teams speaking the same language before a big planning cycle. If your team already runs its design work in Figma, the canvas removes the friction of switching tools just to have the strategy conversation.

## Looking Ahead

At Arsonist AI, we believe design tools should do more than look polished, they should amplify team clarity, inspire action, and fuel momentum. The Lean Product Canvas is the first of several collaborations we're building with practitioners whose frameworks have already earned trust in the field. If you're managing brand and template assets more broadly in Figma beyond strategy work, we've also written about [how to use Figma to manage your brand](/insights/how-to-use-figma-to-manage-your-brand).

## Running a Session With a Remote or Hybrid Team

Most of the facilitation challenges above get harder, not easier, when a team isn't in the same room. FigJam's live-cursor visibility helps close some of that gap, everyone can see who's actively contributing in real time, which makes it obvious when one person is dominating the canvas the way it wouldn't be in a video call with cameras off. We generally recommend running remote sessions in shorter blocks than an in-person workshop, 45 minutes with a clear section to complete, rather than a single unbroken 90-minute session, since sustained collaborative focus is harder to hold over a video call.

Assigning a dedicated facilitator who isn't also filling in the canvas themselves matters even more remotely, since it's easy for quieter voices to stay quiet in a chat window in a way body language would otherwise surface in person.

## Frequently Asked Questions

### How is the Lean Product Canvas different from the original Lean UX Canvas?

The Lean UX Canvas focused primarily on UX execution, assumptions, hypotheses, and experiments at the feature level. The Lean Product Canvas broadens that scope to include business goals and organizational strategy, so the same artifact can guide both what gets designed and why it's worth building in the first place.

### Do I need to be familiar with Lean UX to use the canvas effectively?

No. The canvas is built to be facilitation-friendly for teams encountering these concepts for the first time, with prompts that guide a group through the thinking rather than assuming prior familiarity with the framework.

### Can the canvas be used for an existing product, not just a new one?

Yes. Teams often use it to re-align on a product that's already shipped but has drifted from its original goals, the canvas works as well for a strategy reset as it does for a kickoff.

### How long does a full canvas session typically take?

For a first pass, plan for two to three hours with a cross-functional group, ideally split across two sessions rather than one marathon block, teams consistently produce sharper thinking on Business Outcomes and User Outcomes when they're not rushing to also finish Hypotheses and Experiments in the same sitting. Revisiting the canvas after initial experiments run typically takes far less time, closer to 45 minutes, since the team is updating and refining rather than starting from a blank page.

### Does the canvas replace other planning tools like roadmaps or OKRs?

No, it complements them. The canvas operates at the layer just above execution tools, capturing the reasoning that a roadmap or an OKR document usually assumes but rarely states explicitly. Teams typically keep using their existing roadmap and OKR process alongside the canvas, with the canvas serving as the shared reference that keeps those other artifacts grounded in the same underlying logic.

## Get Started

The Lean Product Canvas is available as an interactive Figma and FigJam template. If you'd like support running your team through it, [our product design services](/services) are built around exactly this kind of collaborative strategy work, whether that means facilitating the first session with your team or helping translate the canvas into an ongoing part of how you plan and ship.`,
      es: `Cuando nos asociamos con dos de las voces más influyentes del pensamiento moderno de producto, Jeff Gothelf y Josh Seiden, coautores de Lean UX, Sense & Respond y Who Does What By How Much?, reconocimos la oportunidad de colaborar en algo que podía tener un impacto real en cómo los equipos de producto trabajan, se alinean y construyen en todo el mundo.

En el corazón de esta colaboración estaba su visión: llevar el recién evolucionado [Lean Product Canvas](https://jeffgothelf.com/blog/the-lean-product-canvas/), sucesor del ampliamente usado [Lean UX Canvas](https://leanuxbook.com/), a un formato digital moderno, flexible y completamente interactivo.

## Del Lean UX Canvas al Lean Product Canvas

Lo que originalmente comenzó como el Lean UX Canvas ha evolucionado hacia un marco más completo: el Lean Product Canvas. Este nuevo formato amplía su enfoque más allá de la ejecución de UX hacia la alineación organizacional, los objetivos de negocio y la estrategia de largo plazo, dándole a los equipos un único artefacto que conecta por qué están construyendo algo con qué es lo que realmente están lanzando.

Este cambio refleja algo que Gothelf y Seiden han defendido durante años en Lean UX y Sense & Respond: que las conversaciones de diseño, producto y estrategia no deberían vivir en documentos separados propiedad de equipos separados. Un canvas es tan útil como la comprensión compartida que crea, y un canvas que solo abren los diseñadores no está cumpliendo esa función.

## Una colaboración profunda con Jeff Gothelf y Josh Seiden

A lo largo de la colaboración, trabajamos directamente con Jeff Gothelf para traducir el Lean Product Canvas en una experiencia accionable y fácil de facilitar, adaptada a Figma y FigJam. Cada campo, cada indicación y cada decisión de layout se puso a prueba contra cómo los equipos reales facilitan talleres, no solo cómo se ve el marco en una diapositiva.

Esa distinción importa más de lo que parece. Un canvas que se ve limpio en un capítulo de libro puede desmoronarse en el momento en que ocho personas intentan completarlo juntas en una sesión de 90 minutos. Construimos y reconstruimos el layout en torno a restricciones reales de facilitación: cuánto se puede completar razonablemente por sección antes de que un equipo pierda impulso, dónde las contribuciones estilo notas adhesivas necesitan espacio para agruparse, y cómo mantener el canvas legible cuando se está co-editando en vivo en lugar de presentarse después de los hechos.

## Lo que los equipos están desbloqueando

- **Ejecución más precisa**: la estrategia y la entrega se conectan mediante un lenguaje y una referencia visual compartidos.
- **Detección temprana de obstáculos**: los puntos de fricción y las brechas salen a la luz antes de que comience el desarrollo.
- **Claridad sobre los objetivos**: los OKRs y los resultados deseados se definen desde el principio.
- **Alineación estratégica**: los equipos se alinean alrededor de un entendimiento compartido del propósito.

Debido a que el canvas vive de forma nativa en Figma y FigJam, no es un documento que se llena una vez y se olvida, permanece en el mismo espacio de trabajo donde ocurre el diseño y la planeación real, por lo que se revisita a medida que el producto evoluciona. Esto es una diferencia significativa frente a cómo se usan la mayoría de los artefactos de estrategia en la práctica: se llenan una vez durante el kickoff, se exportan a una diapositiva y nunca se vuelven a abrir.

## Dentro del canvas: qué cubre cada sección

El Lean Product Canvas está organizado alrededor de una secuencia de preguntas que se construyen unas sobre otras, en lugar de una cuadrícula de casillas desconectadas. Suele comenzar con Resultados de Negocio, el resultado medible que realmente le importa a la organización, lo que obliga al equipo a articular el éxito en términos que el liderazgo reconocería, no solo en términos de funcionalidades lanzadas. De ahí pasa a Usuarios y Clientes, y luego a Resultados de Usuario, lo que la persona que usa el producto necesita lograr para que se dé el resultado de negocio, que es el paso que la mayoría de los equipos se salta cuando pasan directamente de un objetivo de negocio a una solución.

Solo después de definir eso, el canvas llega a Soluciones, seguido de Hipótesis, declaraciones explícitas y falseables sobre lo que el equipo cree que pasará si se lanza la solución, y Experimentos, la forma más rápida y económica de poner a prueba cada hipótesis antes de comprometer tiempo significativo de ingeniería. Ese orden es deliberado: los equipos que empiezan por una solución y trabajan hacia atrás para justificarla tienden a autoconvencerse de construir lo que ya querían construir de todos modos, mientras que los equipos que empiezan por los resultados se ven obligados a justificar la solución por sus propios méritos.

## Errores comunes de facilitación

Facilitar bien una sesión de canvas es más difícil de lo que parece, y aprendimos algunos patrones de fallo consistentes mientras construíamos esto junto con Gothelf. El más común es que un equipo llene primero la sección de Soluciones y luego haga ingeniería inversa de los resultados e hipótesis para que encajen, lo que anula por completo el propósito del ejercicio. Un segundo es que una sola voz senior en la sala llene la mayor parte del canvas mientras todos los demás asienten; el canvas solo cumple su función cuando captura desacuerdo genuino, no un consenso alcanzado por deferencia. Un tercero es tratar el canvas terminado como un artefacto de una sola vez en lugar de una referencia viva, los equipos que lo revisitan después de cada ronda de experimentos obtienen mucho más valor de él que los que lo llenan una vez y pasan directo a la ejecución.

## Para quién es esto

El Lean Product Canvas está pensado para equipos multidisciplinarios en el momento en que una idea de producto necesita convertirse en un plan compartido, típicamente product managers, diseñadores y líderes de ingeniería trabajando juntos al inicio de una nueva iniciativa, o retomando una existente que perdió dirección. Es igual de útil para una startup de cinco personas validando su primer producto que para una organización más grande tratando de que varios equipos hablen el mismo idioma antes de un gran ciclo de planeación. Si tu equipo ya hace su trabajo de diseño en Figma, el canvas elimina la fricción de cambiar de herramienta solo para tener la conversación de estrategia.

## Mirando hacia adelante

En Arsonist AI creemos que las herramientas de diseño deberían hacer más que verse pulidas, deberían amplificar la claridad del equipo, inspirar acción y generar impulso. El Lean Product Canvas es la primera de varias colaboraciones que estamos construyendo con profesionales cuyos marcos ya se han ganado la confianza en el campo. Si además administras activos de marca y plantillas de forma más amplia en Figma más allá del trabajo de estrategia, también hemos escrito sobre [cómo usar Figma para gestionar tu marca](/insights/how-to-use-figma-to-manage-your-brand).

## Facilitar una sesión con un equipo remoto o híbrido

La mayoría de los retos de facilitación mencionados arriba se vuelven más difíciles, no más fáciles, cuando un equipo no está en la misma sala. La visibilidad de cursores en vivo de FigJam ayuda a cerrar parte de esa brecha, todos pueden ver quién está contribuyendo activamente en tiempo real, lo que hace evidente cuando una persona está dominando el canvas de una forma que no sería tan obvia en una videollamada con las cámaras apagadas. Generalmente recomendamos ejecutar sesiones remotas en bloques más cortos que un taller presencial, 45 minutos con una sección clara para completar, en lugar de una sola sesión ininterrumpida de 90 minutos, ya que sostener el enfoque colaborativo es más difícil durante una videollamada.

Asignar un facilitador dedicado que no esté también llenando el canvas importa incluso más de forma remota, ya que es fácil que las voces más calladas se mantengan calladas en una ventana de chat de una forma que el lenguaje corporal normalmente evidenciaría en persona.

## Preguntas frecuentes

### ¿En qué se diferencia el Lean Product Canvas del Lean UX Canvas original?

El Lean UX Canvas se enfocaba principalmente en la ejecución de UX, suposiciones, hipótesis y experimentos a nivel de funcionalidad. El Lean Product Canvas amplía ese alcance para incluir objetivos de negocio y estrategia organizacional, de modo que el mismo artefacto pueda guiar tanto qué se diseña como por qué vale la pena construirlo en primer lugar.

### ¿Necesito conocer Lean UX de antemano para usar el canvas de forma efectiva?

No. El canvas está diseñado para ser fácil de facilitar con equipos que encuentran estos conceptos por primera vez, con indicaciones que guían al grupo a través del razonamiento en lugar de asumir familiaridad previa con el marco.

### ¿Se puede usar el canvas para un producto existente, no solo para uno nuevo?

Sí. Los equipos suelen usarlo para realinearse en torno a un producto que ya se lanzó pero que se ha desviado de sus objetivos originales, el canvas funciona tan bien para un reinicio de estrategia como para un kickoff.

### ¿Cuánto dura típicamente una sesión completa de canvas?

Para una primera pasada, planea de dos a tres horas con un grupo multidisciplinario, idealmente divididas en dos sesiones en lugar de un bloque maratónico, los equipos consistentemente producen un pensamiento más agudo sobre Resultados de Negocio y Resultados de Usuario cuando no tienen prisa por terminar también Hipótesis y Experimentos en la misma sesión. Revisar el canvas después de que corren los primeros experimentos suele tomar mucho menos tiempo, más cerca de 45 minutos, ya que el equipo está actualizando y refinando en lugar de empezar desde una página en blanco.

### ¿El canvas reemplaza otras herramientas de planeación como roadmaps u OKRs?

No, las complementa. El canvas opera en la capa justo por encima de las herramientas de ejecución, capturando el razonamiento que un roadmap o un documento de OKRs suele asumir pero rara vez expresa de forma explícita. Los equipos generalmente siguen usando su proceso existente de roadmap y OKRs junto con el canvas, con el canvas funcionando como la referencia compartida que mantiene esos otros artefactos anclados en la misma lógica subyacente.

## Empieza ahora

El Lean Product Canvas está disponible como plantilla interactiva de Figma y FigJam. Si quieres apoyo para guiar a tu equipo a través de él, [nuestros servicios de diseño de producto](/services) están construidos exactamente en torno a este tipo de trabajo colaborativo de estrategia, ya sea facilitando la primera sesión con tu equipo o ayudando a convertir el canvas en una parte continua de cómo planeas y lanzas.`,
    },
  },
  {
    slug: "would-you-date-an-ai",
    titleKey: "posts.dateAI.title",
    excerptKey: "posts.dateAI.excerpt",
    author: "Jon Sabutis",
    date: "2025-04-28",
    image: "/images/blog/handshake.png",
    content: {
      en: `In January 2025, the New York Times published a striking piece about a growing phenomenon: people forming deeply emotional, sometimes romantic connections with AI companions. The article documented the nuanced experiences of users who turn to AI not just for information or productivity, but for connection. Two years on, that phenomenon isn't a niche curiosity anymore, it's a genuine market, with real research attached and real disagreement about what it means.

## From Tool to Companion

For most of AI's public life, the relationship was transactional: ask a question, get an answer, move on. Companion apps break that pattern. They remember context, respond with something resembling empathy, and are available at 2 a.m. when no one else is. That combination, always-on attentiveness paired with conversational fluency, is enough to make the interaction feel less like using software and more like being heard.

The scale of this shift has been fast even by AI standards. Between 2022 and mid-2025, the number of AI companion apps [surged by roughly 700%](https://www.adalovelaceinstitute.org/blog/ai-companions/), and the category has grown into an estimated $49 billion market in under three years. Character.AI reports over 233 million registered users, with more than half of its 20 million monthly active users under the age of 24. Replika has surpassed 30 million downloads. This is no longer a fringe behavior, it's a mainstream product category with a genuinely large, mostly young user base.

## What the Research Actually Shows

The research on outcomes is more mixed than either the enthusiasts or the critics tend to admit. A [Harvard Business School working paper by Julian De Freitas](https://www.hbs.edu/ris/Publication%20Files/24-078_a3d2e2c7-eca1-4767-8543-122e818bf2e5.pdf) found that AI companions can measurably reduce loneliness for users, in some cases performing comparably to talking with another person. At the same time, a widely cited survey found that 90% of the American students using Replika reported experiencing loneliness, significantly above the national average of 53%, yet 63.3% of those same users said their AI companion helped reduce their loneliness or anxiety. Read together, the data suggests these tools are disproportionately reaching people who are already lonely, and that many of them genuinely benefit, even as researchers continue investigating who is helped, who isn't, and at what point continued reliance starts working against someone rather than for them.

The [Ada Lovelace Institute has flagged real risks](https://www.adalovelaceinstitute.org/blog/ai-companions/) alongside these benefits: excessive use may, for some users, worsen loneliness and erode offline social skills over time rather than supplementing them. The clearest evidence of how emotionally real these relationships have become came in 2023, when Replika removed its romantic and erotic roleplay features: the backlash included users reporting acute grief and withdrawal-like symptoms, a reaction more consistent with losing a relationship than losing a feature.

## Why This Is Happening Now

This isn't happening in a vacuum. Rates of loneliness have been climbing for years, and the same technology that makes AI companions possible, large language models capable of sustained, emotionally responsive conversation, has only existed at consumer scale for a few years. The [American Psychological Association's own reporting on the trend](https://www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection) notes that people forming these attachments aren't a fringe group; they're often quite articulate about what the relationship gives them and what it doesn't. Many describe it as a supplement to human connection during a hard stretch, not a replacement for it, closer to journaling or a support app than to a substitute for their social life.

## The Questions We Haven't Answered Yet

What's less settled is what happens at scale. If an AI companion is designed, intentionally or not, to maximize engagement, whose interest does that serve when the user is emotionally invested? What obligation does a company have when someone treats a chatbot as their primary source of emotional support, and what happens to that person when a feature gets deprecated or a company changes its product roadmap? And as these systems get better at reading and responding to emotion, the line between "tool" and "companion" will keep moving, not stay fixed. These are the same categories of accountability question we explore in more detail in [our piece on AI regulation](/insights/containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us), companion apps are simply one of the more emotionally immediate places those questions show up.

## What This Means for Product and Design Teams

This trend isn't only a psychology story, it's also a design story, and one that matters for anyone building conversational or companion-style products. The features that make an AI companion feel real, like persistent memory, responsive tone, and the sense of being "known" over time, are deliberate design decisions, not emergent side effects. Every choice about how quickly a companion responds, how much it remembers, and how it handles a user's bad day is a product decision with real emotional consequences attached, whether or not the team building it thought of it that way.

That puts a different kind of responsibility on product and design teams working in this space than on teams building a productivity tool. A dark pattern in a subscription flow costs someone money; a dark pattern in a companion app's engagement design can cost someone something closer to a relationship. Teams building in this category need to be explicit, internally, about where the line sits between "designed to be genuinely helpful" and "designed to maximize time in app regardless of whether that time is good for the user."

## A Framework for Evaluating AI Companion Products

For teams building or evaluating products in this space, a few questions tend to surface what actually matters. Does the product make it easy for a user to see and control how much they're using it, or does it obscure that information? Does the business model reward genuine user wellbeing, or does it reward engagement regardless of outcome? And critically, what happens to a user's relationship with the product when a feature changes or the company pivots? The Replika romantic-feature removal in 2023 remains the clearest cautionary example: a company treated a feature change as a routine product decision, and a meaningful number of users experienced it as something closer to a loss.

## Frequently Asked Questions

### Can an AI companion actually reduce loneliness?

Early research, including the HBS working paper referenced above, suggests yes for many users, at least in the short term. The open question is what happens with long-term, heavy use, and whether it complements or gradually substitutes for human relationships depending on how it's used.

### Are AI companion apps mostly used by young people?

Usage skews young but isn't exclusive to it. Character.AI's own reported figures show more than half of its monthly users are under 24, but the broader companion app market spans a much wider age range, including older adults using these tools for company or routine conversation.

### What should someone consider before relying heavily on an AI companion?

Whether the relationship is expanding your capacity for connection or quietly replacing it. The research so far suggests the difference often comes down to whether the app is used alongside human relationships and other coping tools, or instead of them.

### Why did removing Replika's romantic features cause such a strong reaction?

Because for many users, the relationship had become emotionally real regardless of what was happening technically under the hood. Removing a feature is a routine product decision from a company's perspective; from a user's perspective who had built months of perceived intimacy with that version of the companion, it functioned more like the sudden change of a real relationship. That mismatch in perceived stakes is a big part of why this category of product carries more responsibility than a typical software update.

### Should parents be concerned about younger users on these platforms?

Given that more than half of Character.AI's monthly users are reportedly under 24, this is a reasonable concern rather than a hypothetical one. The research isn't settled on long-term effects for younger users specifically, but the same principle applies with more urgency: whether the relationship is expanding a young person's social capacity or substituting for it is the question worth watching, and it's one that benefits from an adult being aware the relationship exists at all, given how private and text-based these interactions typically are.

### Are AI companion apps regulated at all?

Not specifically, in most places, though that's starting to shift. General consumer-protection and data-privacy laws still apply, and some of the state AI legislation described in our regulation piece touches on algorithmic transparency broadly, but purpose-built rules for companion apps specifically, covering things like engagement-maximizing design or protections for emotionally vulnerable users, remain rare. It's an open regulatory gap rather than a settled one.

## Conclusion

None of this means the trend is good or bad on its own, it means it's significant enough to take seriously, and the data backs that up on both sides. As AI companions become more capable and more common, the questions they raise about loneliness, mental health, and what we owe the people who rely on them will only get more urgent, not less.`,
      es: `En enero de 2025, The New York Times publicó un artículo contundente sobre un fenómeno en crecimiento: personas formando conexiones profundamente emocionales, a veces románticas, con compañeros de inteligencia artificial. El artículo documentó las experiencias matizadas de usuarios que recurren a la IA no solo por información o productividad, sino por conexión. Dos años después, ese fenómeno ya no es una curiosidad marginal, es un mercado genuino, con investigación real detrás y desacuerdos reales sobre lo que significa.

## De herramienta a compañía

Durante la mayor parte de la vida pública de la IA, la relación fue transaccional: haces una pregunta, obtienes una respuesta, sigues adelante. Las apps de compañía rompen ese patrón. Recuerdan el contexto, responden con algo parecido a la empatía y están disponibles a las 2 a.m. cuando nadie más lo está. Esa combinación, atención constante junto con fluidez conversacional, basta para que la interacción se sienta menos como usar un software y más como sentirse escuchado.

La escala de este cambio ha sido rápida incluso para los estándares de la IA. Entre 2022 y mediados de 2025, el número de apps de compañía con IA [aumentó cerca de un 700%](https://www.adalovelaceinstitute.org/blog/ai-companions/), y la categoría creció hasta convertirse en un mercado estimado de 49 mil millones de dólares en menos de tres años. Character.AI reporta más de 233 millones de usuarios registrados, con más de la mitad de sus 20 millones de usuarios activos mensuales menores de 24 años. Replika ha superado las 30 millones de descargas. Ya no es un comportamiento marginal, es una categoría de producto mainstream con una base de usuarios genuinamente grande y en su mayoría joven.

## Lo que realmente muestra la investigación

La investigación sobre resultados es más mixta de lo que tanto los entusiastas como los críticos suelen admitir. Un [estudio de la Harvard Business School de Julian De Freitas](https://www.hbs.edu/ris/Publication%20Files/24-078_a3d2e2c7-eca1-4767-8543-122e818bf2e5.pdf) encontró que los compañeros de IA pueden reducir de forma medible la soledad de los usuarios, en algunos casos con resultados comparables a hablar con otra persona. Al mismo tiempo, una encuesta ampliamente citada encontró que el 90% de los estudiantes estadounidenses que usan Replika reportó experimentar soledad, significativamente por encima del promedio nacional del 53%, y sin embargo el 63.3% de esos mismos usuarios dijo que su compañero de IA ayudó a reducir su soledad o ansiedad. Leídos en conjunto, los datos sugieren que estas herramientas llegan de forma desproporcionada a personas que ya están solas, y que muchas de ellas realmente se benefician, mientras los investigadores siguen estudiando a quién ayuda, a quién no, y en qué punto la dependencia continua empieza a jugar en contra de alguien en lugar de a su favor.

El [Ada Lovelace Institute ha señalado riesgos reales](https://www.adalovelaceinstitute.org/blog/ai-companions/) junto a estos beneficios: el uso excesivo puede, para algunos usuarios, empeorar la soledad y erosionar las habilidades sociales fuera de línea con el tiempo, en lugar de complementarlas. La evidencia más clara de qué tan reales emocionalmente se han vuelto estas relaciones llegó en 2023, cuando Replika eliminó sus funciones de rol romántico y erótico: la reacción incluyó usuarios reportando duelo agudo y síntomas similares a la abstinencia, una respuesta más propia de perder una relación que de perder una función.

## Por qué esto está pasando ahora

Esto no ocurre en el vacío. Las tasas de soledad han venido en aumento durante años, y la misma tecnología que hace posibles a los compañeros de IA, modelos de lenguaje capaces de sostener conversaciones prolongadas y emocionalmente sensibles, solo ha existido a escala de consumo masivo durante unos pocos años. La [propia cobertura de la American Psychological Association sobre esta tendencia](https://www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection) señala que las personas que forman estos vínculos no son un grupo marginal; suelen ser bastante articuladas sobre lo que la relación les da y lo que no. Muchas la describen como un complemento a la conexión humana durante una etapa difícil, no como un reemplazo, más parecido a llevar un diario o usar una app de apoyo emocional que a un sustituto de su vida social.

## Las preguntas que aún no hemos respondido

Lo que está menos resuelto es qué pasa a gran escala. Si un compañero de IA está diseñado, de forma intencional o no, para maximizar el engagement, ¿a favor de quién juega eso cuando el usuario está emocionalmente involucrado? ¿Qué obligación tiene una empresa cuando alguien trata a un chatbot como su principal fuente de apoyo emocional, y qué le pasa a esa persona cuando una función se descontinúa o una empresa cambia su hoja de ruta de producto? Y a medida que estos sistemas se vuelven mejores para leer y responder a las emociones, la línea entre "herramienta" y "compañía" seguirá moviéndose, no se mantendrá fija. Estas son las mismas categorías de preguntas sobre responsabilidad que exploramos con más detalle en [nuestro artículo sobre regulación de IA](/insights/containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us), las apps de compañía son simplemente uno de los lugares donde esas preguntas se sienten de forma más inmediata a nivel emocional.

## Lo que esto significa para los equipos de producto y diseño

Esta tendencia no es solo una historia de psicología, también es una historia de diseño, y una que importa para cualquiera que construya productos conversacionales o de tipo compañía. Las características que hacen que un compañero de IA se sienta real, como la memoria persistente, el tono receptivo y la sensación de ser "conocido" con el tiempo, son decisiones de diseño deliberadas, no efectos secundarios emergentes. Cada decisión sobre qué tan rápido responde un compañero, cuánto recuerda y cómo maneja un mal día del usuario es una decisión de producto con consecuencias emocionales reales, la haya pensado así el equipo que la construyó o no.

Eso impone un tipo de responsabilidad distinto a los equipos de producto y diseño que trabajan en este espacio, comparado con los equipos que construyen una herramienta de productividad. Un patrón oscuro en un flujo de suscripción le cuesta dinero a alguien; un patrón oscuro en el diseño de engagement de una app de compañía puede costarle a alguien algo más parecido a una relación. Los equipos que construyen en esta categoría necesitan ser explícitos, internamente, sobre dónde está la línea entre "diseñado para ser genuinamente útil" y "diseñado para maximizar el tiempo en la app sin importar si ese tiempo le hace bien al usuario".

## Un marco para evaluar productos de compañía con IA

Para los equipos que construyen o evalúan productos en este espacio, algunas preguntas suelen revelar lo que realmente importa. ¿El producto le facilita al usuario ver y controlar cuánto lo está usando, o esconde esa información? ¿El modelo de negocio premia el bienestar genuino del usuario, o premia el engagement sin importar el resultado? Y de forma crítica, ¿qué le pasa a la relación de un usuario con el producto cuando una función cambia o la empresa pivota? La eliminación de la función romántica de Replika en 2023 sigue siendo el ejemplo cautelar más claro: una empresa trató un cambio de función como una decisión de producto rutinaria, y una cantidad significativa de usuarios lo vivió como algo más parecido a una pérdida.

## Preguntas frecuentes

### ¿Puede un compañero de IA realmente reducir la soledad?

La investigación inicial, incluido el estudio de HBS mencionado arriba, sugiere que sí para muchos usuarios, al menos en el corto plazo. La pregunta abierta es qué pasa con el uso intenso y prolongado, y si complementa o gradualmente sustituye a las relaciones humanas dependiendo de cómo se use.

### ¿Las apps de compañía con IA las usan principalmente jóvenes?

El uso se inclina hacia los jóvenes, pero no es exclusivo de ellos. Las cifras reportadas por Character.AI muestran que más de la mitad de sus usuarios mensuales son menores de 24 años, pero el mercado más amplio de apps de compañía abarca un rango de edad mucho más amplio, incluyendo adultos mayores que usan estas herramientas para tener compañía o conversación rutinaria.

### ¿Qué debería considerar alguien antes de depender mucho de un compañero de IA?

Si la relación está ampliando su capacidad de conexión o silenciosamente reemplazándola. La investigación hasta ahora sugiere que la diferencia suele depender de si la app se usa junto con relaciones humanas y otras herramientas de afrontamiento, o en lugar de ellas.

### ¿Por qué eliminar las funciones románticas de Replika provocó una reacción tan fuerte?

Porque para muchos usuarios, la relación se había vuelto emocionalmente real sin importar lo que ocurriera técnicamente por dentro. Eliminar una función es una decisión de producto rutinaria desde la perspectiva de una empresa; desde la perspectiva de un usuario que había construido meses de intimidad percibida con esa versión del compañero, funcionó más como el cambio repentino de una relación real. Ese desajuste en lo que está en juego, percibido de forma tan distinta, es gran parte de por qué esta categoría de producto conlleva más responsabilidad que una actualización de software típica.

### ¿Deberían los padres preocuparse por los usuarios más jóvenes en estas plataformas?

Dado que más de la mitad de los usuarios mensuales de Character.AI reportadamente son menores de 24 años, esta es una preocupación razonable y no hipotética. La investigación no está resuelta sobre los efectos a largo plazo específicamente en usuarios jóvenes, pero el mismo principio aplica con más urgencia: si la relación está ampliando la capacidad social de un joven o sustituyéndola es la pregunta que vale la pena vigilar, y es una que se beneficia de que un adulto esté al tanto de que la relación existe en absoluto, dado lo privadas y basadas en texto que suelen ser estas interacciones.

### ¿Las apps de compañía con IA están reguladas de alguna forma?

No de manera específica, en la mayoría de los lugares, aunque eso está empezando a cambiar. Las leyes generales de protección al consumidor y privacidad de datos todavía aplican, y parte de la legislación estatal de IA descrita en nuestro artículo sobre regulación toca la transparencia algorítmica de forma general, pero las reglas diseñadas específicamente para apps de compañía, que cubran cosas como el diseño que maximiza el engagement o protecciones para usuarios emocionalmente vulnerables, siguen siendo poco comunes. Es un vacío regulatorio abierto, no uno resuelto.

## Conclusión

Nada de esto significa que la tendencia sea buena o mala en sí misma, significa que es lo suficientemente importante como para tomarla en serio, y los datos lo respaldan en ambos sentidos. A medida que los compañeros de IA se vuelven más capaces y más comunes, las preguntas que plantean sobre la soledad, la salud mental y lo que le debemos a las personas que dependen de ellos solo se volverán más urgentes, no menos.`,
    },
  },
  {
    slug: "how-to-use-figma-to-manage-your-brand",
    titleKey: "posts.figmaBrand.title",
    excerptKey: "posts.figmaBrand.excerpt",
    author: "Jon Sabutis",
    date: "2025-04-15",
    image: "/images/blog/figma-cover.png",
    content: {
      en: `Figma is not just a design tool. It's the command center your brand has been waiting for. Speed, clarity, and collaboration matter more than ever, and Figma has quietly evolved into one of the most essential platforms for managing modern businesses, even beyond the design team.

## The Problem With Traditional Asset Management

Remember the days of losing time digging through disorganized folders named things like "final_final2.pdf"? Every rebrand, every new hire, every "wait, which logo is current?" moment compounds the mess. Figma offers an elegant solution: one living source of truth instead of a folder tree nobody trusts.

## Pages + Components = Organized Brand Power

One of the most underutilized features in Figma is its Pages panel. When paired with Figma Components, you get a system where updates are universally applied, assets are always in sync, and anyone on your team can find what they need, fast. Change a logo once at the component level, and every deck, template, and social post that references it updates automatically.

- Page: Documents – Pitch decks, business plans, proposals
- Page: Social Templates – Instagram, TikTok, and Facebook posts
- Page: Logos & Icons – All your branding marks, componentized
- Page: Brand Guidelines – Colors, fonts, and rules

## What's New in Figma for Brand Management

Figma's recent updates make this system meaningfully stronger for non-designers managing brand assets, not just designers building them. New [AI-native design tokens](https://www.dodefy.com/articles-posts/figma-2026-complete-breakdown-of-new-products-and-how-to-use-them-effectively) let a team define a brand's core color palette once and generate a full, accessible tonal range automatically, respecting WCAG 3.0 contrast requirements without anyone manually checking every shade. [Library branching](https://www.sashikiran.com/blog/figma-2026-updates.html) lets a team experiment with a rebrand or a seasonal variation in a fork of the shared component library, without the risk of breaking the live brand system everyone else depends on.

For day-to-day asset work, built-in tools like Vectorize (turning a raster logo or scanned mark into an editable vector), Remove Background, and Erase Object mean a lot of routine asset cleanup no longer requires exporting to a separate app and back. For teams with large brand libraries, hundreds of pages, thousands of components, Figma's newer rendering architecture also means those files now load in seconds rather than minutes, which matters more than it sounds like once a brand system has been in active use for a couple of years.

## Beyond the Design Team: Figma for Everyone

What started as a design-first platform is now being adopted by marketers, operations leads, startup founders, and even HR departments. A well-structured Figma file becomes a shared language across the company, anyone can duplicate a template, drop in their own copy, and produce something on-brand without pinging a designer.

This matters more as teams grow. In a five-person startup, brand consistency is easy because one person is doing most of the design work. At fifty people, with marketing, sales, and recruiting all producing their own decks and social assets, brand drift happens fast unless there's a shared, accessible system everyone actually uses instead of routing around.

## Setting Up Naming Conventions and Permissions

The system falls apart quietly if naming and access aren't decided upfront. A simple, enforced convention, something like Type/Category/Name, for example "Logo/Primary/Horizontal" or "Template/Social/Instagram-Post", makes a library searchable months later, when the person who built it may no longer be the one maintaining it. Permissions matter just as much: give most of the team edit access to draft and duplicate templates, but restrict who can publish changes to the shared library itself, so a well-meaning edit doesn't silently update every file that references a component.

## Measuring Whether It's Actually Working

A brand system is working if two things are true: someone outside the design team can find and use an on-brand asset without asking a designer for help, and it takes less time to update a brand element across every file than it used to take to find all the places that element lived. If either of those isn't true a few months after setup, it's usually a sign the file is over-organized for how the team actually works, or under-componentized in the places people reach for most often. Social templates and pitch decks tend to get used far more than brand guideline pages, so those deserve the most polish and the tightest component structure.

## Setting This Up Without a Dedicated Design Team

You don't need a full design department to get most of the benefit here. Start with the four-page structure above, build out core components for your logo lockups, color tokens, and type styles first, and resist the urge to componentize everything on day one. A brand system with ten well-maintained components beats one with a hundred half-finished ones. If you want a structured starting point rather than building from a blank file, that's exactly what our [Figma New Business Toolkit](/products) was built to provide.

## Common Reasons Brand Systems Fall Apart

Even well-intentioned setups tend to fail in a few predictable ways. The most common is nobody being explicitly responsible for the library once the initial setup excitement fades, components drift out of date, nobody notices, and six months later half the team is quietly working from exported copies instead of the live library because they've stopped trusting it. A second is over-engineering the initial structure: teams that try to componentize every possible variation before anyone has actually used the system in practice tend to build something too rigid for how work really happens, and abandon it in favor of ad hoc files.

A third, more subtle failure is treating the brand system as a one-way publishing channel rather than a living tool. The teams that keep their Figma brand system healthy long-term are the ones where someone from marketing or ops feels comfortable flagging a stale template or a missing asset directly in the file, not just the design team pushing updates outward.

## Frequently Asked Questions

### Do I need a Figma paid plan to manage brand assets this way?

Components, pages, and shared libraries are available on Figma's free and paid tiers, though team-wide library publishing and some governance features are limited to paid plans. For most small teams, the free tier is enough to get started; larger teams generally need a paid plan to share libraries across multiple projects.

### How is this different from a traditional brand guidelines PDF?

A PDF is static the moment it's exported, if the logo changes, every copy of that PDF is instantly out of date. A Figma-based brand system updates everywhere at once when a component changes, so there's no "which version is current" problem to manage.

### Can non-designers actually use this without breaking the brand system?

Yes, if it's set up correctly. The key is locking core components so they can only be duplicated and customized within defined limits (like swapping copy or an image) rather than left fully editable, which is what keeps a marketer's version of a social template on-brand without a designer reviewing every file.

### How often should a brand system be reviewed and updated?

Quarterly is a reasonable starting point for most teams, frequent enough to catch stale templates or duplicate components before they pile up, but not so frequent that the review itself becomes a maintenance burden. Companies going through frequent rebranding or product launches usually benefit from lighter monthly check-ins focused specifically on the highest-traffic pages, like social templates and pitch decks.

### What's the biggest sign a Figma-based brand system needs an overhaul, not just a review?

When people outside the design team have quietly stopped using it and gone back to exporting static copies or building assets from scratch. That behavior usually means the system stopped matching how the team actually works well before anyone said so out loud, and a review alone won't fix it. At that point it's typically worth restructuring the page hierarchy and component set from the ground up, rather than patching the existing one.

### Can a small team realistically maintain a full brand system in Figma?

Yes, as long as the scope matches the team's size. A three-person team doesn't need all four pages described above on day one; starting with just Logos & Icons and Social Templates, then adding Documents and Brand Guidelines once they're actually needed, avoids building infrastructure for a volume of work that doesn't exist yet. The discipline that matters isn't the size of the system, it's that every component in it actually gets used and maintained.

## The Figma New Business Toolkit

A collection of 30+ easy-to-use, continually updated, interactive templates and assets designed to help you rapidly kickstart or supplement your business. From pitch decks to social kits, the goal is the same one behind everything above: get your brand out of scattered files and into a single, organized system that anyone on the team can use with confidence. If you're also thinking about how to bring strategic planning into the same workspace, we've written about how we did exactly that with the [Lean Product Canvas](/insights/lean-product-canvas-interactive-figma-templates).`,
      es: `Figma no es solo una herramienta de diseño. Es el centro de comando que tu marca ha estado esperando. La velocidad, la claridad y la colaboración importan más que nunca, y Figma se ha convertido silenciosamente en una de las plataformas más esenciales para gestionar negocios modernos, incluso más allá del equipo de diseño.

## El problema con la gestión tradicional de activos

¿Recuerdas los días perdidos buscando en carpetas desordenadas con nombres como "final_final2.pdf"? Cada rebranding, cada nueva contratación, cada momento de "espera, ¿cuál logo es el actual?" agrava el desorden. Figma ofrece una solución elegante: una única fuente de verdad viva en lugar de un árbol de carpetas en el que nadie confía.

## Páginas + Componentes = poder de marca organizado

Una de las funciones más subutilizadas en Figma es su panel de Páginas. Combinado con los Componentes de Figma, obtienes un sistema donde las actualizaciones se aplican de forma universal, los activos siempre están sincronizados y cualquiera en tu equipo puede encontrar lo que necesita, rápido. Cambia un logo una sola vez a nivel de componente, y cada presentación, plantilla y publicación social que lo referencia se actualiza automáticamente.

- Página: Documentos – Presentaciones, planes de negocio, propuestas
- Página: Plantillas sociales – Publicaciones para Instagram, TikTok y Facebook
- Página: Logos e íconos – Todas tus marcas de branding, componentizadas
- Página: Lineamientos de marca – Colores, tipografías y reglas

## Qué hay de nuevo en Figma para la gestión de marca

Las actualizaciones recientes de Figma hacen este sistema notablemente más fuerte para quienes no son diseñadores pero gestionan activos de marca, no solo para quienes los construyen. Los nuevos [tokens de diseño nativos de IA](https://www.dodefy.com/articles-posts/figma-2026-complete-breakdown-of-new-products-and-how-to-use-them-effectively) permiten que un equipo defina la paleta de color central de una marca una sola vez y genere automáticamente un rango tonal completo y accesible, respetando los requisitos de contraste WCAG 3.0 sin que nadie tenga que revisar manualmente cada tono. La [ramificación de bibliotecas](https://www.sashikiran.com/blog/figma-2026-updates.html) permite que un equipo experimente con un rebranding o una variación estacional en una copia derivada de la biblioteca de componentes compartida, sin el riesgo de romper el sistema de marca en vivo del que todos los demás dependen.

Para el trabajo diario con activos, herramientas integradas como Vectorize (que convierte un logo rasterizado o una marca escaneada en un vector editable), Remove Background y Erase Object significan que gran parte de la limpieza rutinaria de activos ya no requiere exportar a una app aparte y volver a importar. Para equipos con bibliotecas de marca grandes, cientos de páginas, miles de componentes, la nueva arquitectura de renderizado de Figma también significa que esos archivos ahora cargan en segundos en lugar de minutos, algo que importa más de lo que parece una vez que un sistema de marca lleva un par de años en uso activo.

## Más allá del equipo de diseño: Figma para todos

Lo que comenzó como una plataforma centrada en el diseño ahora la están adoptando marketing, operaciones, fundadores de startups e incluso departamentos de RR. HH. Un archivo de Figma bien estructurado se convierte en un lenguaje compartido en toda la empresa, cualquiera puede duplicar una plantilla, poner su propio contenido y producir algo alineado con la marca sin tener que recurrir a un diseñador.

Esto importa cada vez más a medida que los equipos crecen. En una startup de cinco personas, la consistencia de marca es fácil porque una sola persona hace la mayor parte del trabajo de diseño. En una de cincuenta, con marketing, ventas y reclutamiento produciendo sus propias presentaciones y activos sociales, la marca se desvía rápido a menos que haya un sistema compartido y accesible que todos realmente usen en lugar de evitar.

## Configurar convenciones de nombres y permisos

El sistema se desmorona silenciosamente si los nombres y el acceso no se deciden desde el principio. Una convención simple y aplicada, algo como Tipo/Categoría/Nombre, por ejemplo "Logo/Principal/Horizontal" o "Plantilla/Social/Instagram-Post", hace que una biblioteca sea buscable meses después, cuando la persona que la construyó ya no sea quien la mantiene. Los permisos importan igual de mucho: dale a la mayoría del equipo acceso de edición para redactar y duplicar plantillas, pero restringe quién puede publicar cambios en la biblioteca compartida misma, para que una edición bien intencionada no actualice silenciosamente cada archivo que referencia un componente.

## Medir si realmente está funcionando

Un sistema de marca está funcionando si se cumplen dos cosas: alguien fuera del equipo de diseño puede encontrar y usar un activo alineado con la marca sin pedirle ayuda a un diseñador, y toma menos tiempo actualizar un elemento de marca en todos los archivos de lo que antes tomaba encontrar todos los lugares donde vivía ese elemento. Si alguna de esas dos cosas no se cumple unos meses después de la implementación, suele ser señal de que el archivo está sobreorganizado para cómo trabaja realmente el equipo, o poco componentizado en los lugares que más se usan. Las plantillas sociales y las presentaciones tienden a usarse mucho más que las páginas de lineamientos de marca, así que merecen el mayor pulido y la estructura de componentes más sólida.

## Cómo implementarlo sin un equipo de diseño dedicado

No necesitas un departamento de diseño completo para obtener la mayor parte del beneficio aquí. Empieza con la estructura de cuatro páginas de arriba, construye primero los componentes centrales para tus combinaciones de logo, tokens de color y estilos tipográficos, y resiste la tentación de componentizar todo desde el primer día. Un sistema de marca con diez componentes bien mantenidos es mejor que uno con cien a medio terminar. Si prefieres un punto de partida estructurado en lugar de construir desde un archivo en blanco, para eso exactamente construimos nuestro [Kit de Nuevo Negocio para Figma](/products).

## Razones comunes por las que los sistemas de marca se desmoronan

Incluso las configuraciones bien intencionadas suelen fallar de algunas formas predecibles. La más común es que nadie sea explícitamente responsable de la biblioteca una vez que pasa el entusiasmo inicial de la implementación, los componentes se desactualizan, nadie lo nota, y seis meses después la mitad del equipo trabaja silenciosamente desde copias exportadas en lugar de la biblioteca en vivo, porque dejaron de confiar en ella. Una segunda es sobrediseñar la estructura inicial: los equipos que intentan componentizar cada variación posible antes de que alguien haya usado realmente el sistema en la práctica tienden a construir algo demasiado rígido para cómo ocurre el trabajo de verdad, y terminan abandonándolo en favor de archivos improvisados.

Una tercera falla, más sutil, es tratar el sistema de marca como un canal de publicación de una sola vía en lugar de una herramienta viva. Los equipos que mantienen su sistema de marca en Figma saludable a largo plazo son aquellos donde alguien de marketing u operaciones se siente cómodo señalando directamente en el archivo una plantilla desactualizada o un activo faltante, no solo el equipo de diseño empujando actualizaciones hacia afuera.

## Preguntas frecuentes

### ¿Necesito un plan pago de Figma para gestionar activos de marca así?

Los componentes, páginas y bibliotecas compartidas están disponibles en los planes gratuito y de pago de Figma, aunque la publicación de bibliotecas para todo el equipo y algunas funciones de gobernanza están limitadas a los planes de pago. Para la mayoría de los equipos pequeños, el plan gratuito es suficiente para empezar; los equipos más grandes generalmente necesitan un plan pago para compartir bibliotecas entre varios proyectos.

### ¿En qué se diferencia esto de un PDF tradicional de lineamientos de marca?

Un PDF queda estático en el momento en que se exporta, si el logo cambia, cada copia de ese PDF queda desactualizada al instante. Un sistema de marca basado en Figma se actualiza en todas partes a la vez cuando un componente cambia, así que no hay que gestionar el problema de "cuál versión es la vigente".

### ¿Pueden las personas que no son diseñadoras usar esto sin romper el sistema de marca?

Sí, si está configurado correctamente. La clave es bloquear los componentes centrales para que solo puedan duplicarse y personalizarse dentro de límites definidos (como cambiar el texto o una imagen) en lugar de dejarlos completamente editables, que es lo que mantiene la versión de una plantilla social hecha por alguien de marketing alineada con la marca sin que un diseñador revise cada archivo.

### ¿Con qué frecuencia debería revisarse y actualizarse un sistema de marca?

Trimestralmente es un buen punto de partida para la mayoría de los equipos, suficientemente seguido para detectar plantillas desactualizadas o componentes duplicados antes de que se acumulen, pero no tan seguido como para convertirse en una carga de mantenimiento en sí misma. Las empresas que pasan por cambios frecuentes de marca o lanzamientos de producto suelen beneficiarse de revisiones mensuales más ligeras, enfocadas específicamente en las páginas de mayor uso, como plantillas sociales y presentaciones.

### ¿Cuál es la señal más clara de que un sistema de marca en Figma necesita una reestructuración, no solo una revisión?

Cuando personas fuera del equipo de diseño dejaron de usarlo silenciosamente y volvieron a exportar copias estáticas o a construir activos desde cero. Ese comportamiento generalmente significa que el sistema dejó de coincidir con cómo trabaja realmente el equipo mucho antes de que alguien lo dijera en voz alta, y una revisión sola no lo va a arreglar. En ese punto suele valer la pena reestructurar la jerarquía de páginas y el conjunto de componentes desde cero, en lugar de parchar el existente.

### ¿Puede un equipo pequeño de verdad mantener un sistema de marca completo en Figma?

Sí, siempre que el alcance coincida con el tamaño del equipo. Un equipo de tres personas no necesita las cuatro páginas completas descritas arriba desde el primer día; empezar solo con Logos e Íconos y Plantillas Sociales, y agregar Documentos y Lineamientos de Marca cuando realmente se necesiten, evita construir infraestructura para un volumen de trabajo que todavía no existe. La disciplina que importa no es el tamaño del sistema, sino que cada componente que existe se use y se mantenga de verdad.

## El Kit de Nuevo Negocio para Figma

Una colección de más de 30 plantillas y activos interactivos, fáciles de usar y actualizados continuamente, diseñados para ayudarte a arrancar o complementar tu negocio rápidamente. Desde presentaciones hasta kits sociales, el objetivo es el mismo que está detrás de todo lo anterior: sacar tu marca de archivos dispersos y llevarla a un sistema único y organizado que cualquiera en el equipo pueda usar con confianza. Si además estás pensando en cómo llevar la planeación estratégica al mismo espacio de trabajo, hemos escrito sobre cómo hicimos exactamente eso con el [Lean Product Canvas](/insights/lean-product-canvas-interactive-figma-templates).`,
    },
  },
  {
    slug: "what-designers-need-to-know-about-ai",
    titleKey: "posts.designersAI.title",
    excerptKey: "posts.designersAI.excerpt",
    author: "Jon Sabutis",
    date: "2025-03-28",
    image: "/images/blog/ken-cover.png",
    content: {
      en: `Every time a designer uploads work to a portfolio site, publishes a Figma community file, or ships an asset to a stock library, there's a real chance that work is being used to train the next generation of AI design models, often without their explicit consent. AI models require vast amounts of data to learn how to generate designs, UI layouts, and illustrations, and that data often comes from the same publicly available images, creative communities, and software tools designers use every day.

## How AI Models Use Designer-Generated Content

Adobe faced significant backlash after users discovered Firefly was trained on Adobe Stock and Behance content. Dribbble has not explicitly confirmed whether its content is used for AI training. While Figma has not disclosed its AI data use, its community files and third-party plugins likely contribute to training datasets, meaning the exact files designers share to help each other work faster may also be feeding the models built to compete with them.

## The Legal Battles Have Already Begun

The most closely watched training-data case in design so far reached a verdict in November 2025: [Getty Images v. Stability AI](https://www.mayerbrown.com/en/insights/publications/2025/11/getty-images-v-stability-ai-what-the-high-courts-decision-means-for-rights-holders-and-ai-developers), decided in the UK's High Court. Getty alleged Stability AI copied more than 12 million of its photographs, along with metadata and descriptions, to train Stable Diffusion. The court rejected Getty's core copyright claim, because the model doesn't store training images directly, it couldn't be proven that outputs were directly derived from Getty's specific photos, but did find limited trademark infringement, since some early Stable Diffusion outputs reproduced watermarks resembling Getty's and iStock's. For designers, the practical takeaway is sobering: the ruling suggests training on copyrighted images may not itself be infringement under UK law, even though it can still create downstream trademark exposure.

The [New York Times' lawsuit against OpenAI and Microsoft](https://legalclarity.org/new-york-times-vs-openai-lawsuit-status-and-timeline/), filed in December 2023 over the use of copyrighted journalism in ChatGPT's training data, remains active and unresolved, still in discovery as of mid-2026, with no trial date set. As recently as July 2026, the Times and other publishers filed a legal memorandum accusing OpenAI of withholding evidence about how its systems were trained, requesting court sanctions. A separate class-action still accuses Stability AI, Midjourney, and DeviantArt of scraping millions of artworks without consent. Together, these cases make one thing clear: the legal framework for consent and compensation in AI training data is still being written in real time, case by case, and outcomes are genuinely inconsistent across jurisdictions.

## What This Means If You Publish Design Work Publicly

The Getty ruling in particular changes the calculus for designers who assumed copyright alone would eventually protect their published work from being used as training data. It may not, at least not automatically, and not everywhere. That doesn't mean there's nothing you can do; it means the protection has to be more deliberate than simply owning the copyright and hoping the law catches up.

## How to Protect Your Designs

- Opt out of AI training when possible
- Make work private on portfolio sites
- Read the terms of service carefully
- Use watermarks or AI-blocking tools

None of these steps are foolproof, but together they meaningfully reduce how much of a designer's public output ends up in a training set without their knowledge. Watermarking in particular has an interesting secondary benefit post-Getty: the ruling's finding on trademark infringement suggests visible marks can matter legally in ways invisible copyright claims currently don't.

## How Design Platforms Are Responding

Different platforms have taken different stances, and the differences matter for where designers choose to publish. Adobe now offers an explicit opt-out setting for Adobe Stock contributors and has stated that Firefly is trained only on licensed and public-domain content going forward, following the earlier backlash over Behance and Stock data. Other platforms have been far less transparent, which is itself informative, a platform's silence on its AI training policy is generally not a sign that one doesn't exist.

This unevenness has pushed some of the response outside individual platforms entirely. Artist and designer advocacy groups have pushed for industry-wide standards around consent and attribution, and tools like Glaze and Nightshade, built by researchers specifically to make images resistant to being cleanly used as AI training data, have seen real adoption among illustrators and designers who want a technical safeguard rather than relying solely on a platform's policy.

## What Designers Can Realistically Expect Going Forward

None of the current legal uncertainty is likely to resolve quickly. The Getty and New York Times cases alone could take years to reach final rulings, and even once they do, an outcome in one jurisdiction won't automatically apply in another. In the meantime, the most realistic posture for a working designer is treating AI training risk the way you'd treat any other business risk, not ignorable, not paralyzing, just something to factor into where and how you publish, the same way you'd think about licensing terms or client contracts.

## Building AI Awareness Into a Design Practice

Beyond individual protective steps, the designers navigating this best treat AI-training risk as an ongoing part of their practice rather than a one-time settings change. That means periodically re-checking a platform's terms of service, since policies shift as litigation and public pressure evolve, Adobe's current opt-out options didn't exist a few years ago, and other platforms will likely follow a similar path under enough pressure. It also means being deliberate about what gets published where: portfolio pieces meant to attract clients may be worth the exposure, while process files, unused concepts, or client work under NDA generally shouldn't be public regardless of AI training concerns.

## Frequently Asked Questions

### Does opting out of AI training actually stop my work from being used?

It reduces the risk but doesn't eliminate it. Opt-out settings only apply to platforms that respect them, and don't retroactively remove work already scraped before the setting was enabled. Combining opt-out settings with private portfolios for your most sensitive work is a more reliable approach than either alone.

### Is it legal for AI companies to train on publicly posted design work?

It depends heavily on jurisdiction and is actively being litigated. The Getty v. Stability AI ruling found no copyright infringement under UK law in that specific case, but the outcome could differ under US law, where the New York Times case is still unresolved, so "legal" currently varies by court and by case.

### Should I stop posting work publicly because of this?

Not necessarily, visibility still matters for building a career, and pulling everything private has real professional costs. The more practical approach is being deliberate about which platforms you use, checking their AI training policies, and treating watermarking and licensing terms as part of your workflow rather than an afterthought.

### Do watermarks or AI-blocking tools actually work?

Imperfectly, but not uselessly. Tools like Glaze work by subtly perturbing an image in ways that are invisible to a human viewer but disrupt how an AI model interprets it during training, which raises the cost and difficulty of using that image cleanly. None of these tools offer a guarantee, and techniques on both sides continue to evolve, but combined with an opt-out setting and a platform's stated policy, they meaningfully shift the odds rather than leaving your work completely unprotected.

### Does this apply to work made for clients, not just personal portfolio pieces?

Yes, and arguably more so. Client work typically carries contractual obligations around confidentiality and ownership that make unauthorized AI training use a bigger liability question, not just a personal one. Adding explicit language to client contracts about how deliverables can and can't be used for AI training closes that gap, since most standard contract templates predate this issue entirely and say nothing about it either way.

### Is there a way to check whether my specific work has already been used for AI training?

Not reliably, in most cases. A handful of tools let you search whether an image resembles content in a known training dataset, but coverage is partial and most major AI labs don't publish searchable records of their full training sets. That gap is itself one of the central complaints in the ongoing lawsuits: without transparency into what a model was actually trained on, individual creators have very little ability to verify their own exposure, let alone seek redress for it.

## The Future of AI and Design Ethics

The intersection of AI and design raises complex ethical and legal questions that won't be settled quickly. Designers must remain informed about how their work is being used, not because the answers are simple, but because the platforms hosting their work rarely make the trade-offs obvious. The same accountability gap shows up across other domains too, which is part of why we've argued that [AI regulation needs to move faster than it currently is](/insights/containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us). If you're navigating how AI fits into your team's design process rather than just your personal portfolio, that's exactly the kind of question our [product design work](/services) is built to help answer.`,
      es: `Cada vez que un diseñador sube trabajo a un portafolio, publica un archivo comunitario en Figma o envía un activo a una biblioteca de stock, existe una posibilidad real de que ese trabajo se esté usando para entrenar la próxima generación de modelos de IA para diseño, muchas veces sin su consentimiento explícito. Los modelos de IA requieren enormes cantidades de datos para aprender a generar diseños, layouts de interfaz e ilustraciones, y esos datos suelen provenir de las mismas imágenes públicas, comunidades creativas y herramientas de software que los diseñadores usan todos los días.

## Cómo usan los modelos de IA el contenido generado por diseñadores

Adobe enfrentó una reacción significativa después de que los usuarios descubrieran que Firefly había sido entrenado con contenido de Adobe Stock y Behance. Dribbble no ha confirmado explícitamente si su contenido se usa para entrenamiento de IA. Aunque Figma no ha revelado su uso de datos para IA, es probable que sus archivos comunitarios y plugins de terceros contribuyan a conjuntos de datos de entrenamiento, lo que significa que los mismos archivos que los diseñadores comparten para ayudarse mutuamente a trabajar más rápido también podrían estar alimentando a los modelos construidos para competir con ellos.

## Las batallas legales ya comenzaron

El caso de datos de entrenamiento más observado en el mundo del diseño hasta ahora llegó a un veredicto en noviembre de 2025: [Getty Images v. Stability AI](https://www.mayerbrown.com/en/insights/publications/2025/11/getty-images-v-stability-ai-what-the-high-courts-decision-means-for-rights-holders-and-ai-developers), resuelto en el Tribunal Superior del Reino Unido. Getty alegó que Stability AI copió más de 12 millones de sus fotografías, junto con metadatos y descripciones, para entrenar Stable Diffusion. El tribunal rechazó el reclamo principal de infracción de derechos de autor de Getty, porque el modelo no almacena las imágenes de entrenamiento directamente, no se pudo probar que los resultados se derivaran directamente de las fotos específicas de Getty, pero sí encontró una infracción de marca limitada, ya que algunos de los primeros resultados de Stable Diffusion reproducían marcas de agua parecidas a las de Getty e iStock. Para los diseñadores, la conclusión práctica es preocupante: el fallo sugiere que entrenar con imágenes protegidas por derechos de autor podría no constituir en sí mismo una infracción bajo la ley del Reino Unido, aunque sí puede generar exposición legal por marca registrada.

La [demanda de The New York Times contra OpenAI y Microsoft](https://legalclarity.org/new-york-times-vs-openai-lawsuit-status-and-timeline/), presentada en diciembre de 2023 por el uso de periodismo protegido por derechos de autor en los datos de entrenamiento de ChatGPT, sigue activa y sin resolver, todavía en fase de descubrimiento de pruebas a mediados de 2026, sin fecha de juicio fijada. Tan recientemente como julio de 2026, el Times y otros editores presentaron un memorial legal acusando a OpenAI de retener evidencia sobre cómo se entrenaron sus sistemas, solicitando sanciones judiciales. Una demanda colectiva aparte sigue acusando a Stability AI, Midjourney y DeviantArt de extraer millones de obras de arte sin consentimiento. En conjunto, estos casos dejan algo claro: el marco legal para el consentimiento y la compensación en datos de entrenamiento de IA todavía se está escribiendo en tiempo real, caso por caso, y los resultados son genuinamente inconsistentes entre jurisdicciones.

## Qué significa esto si publicas tu trabajo de diseño públicamente

El fallo de Getty en particular cambia el cálculo para los diseñadores que asumían que el derecho de autor por sí solo eventualmente protegería su trabajo publicado de ser usado como datos de entrenamiento. Puede que no sea así, al menos no automáticamente, y no en todas partes. Eso no significa que no haya nada que puedas hacer; significa que la protección tiene que ser más deliberada que simplemente poseer el derecho de autor y esperar que la ley se ponga al día.

## Cómo proteger tus diseños

- Opta por no participar en el entrenamiento de IA cuando sea posible
- Haz privado tu trabajo en sitios de portafolio
- Lee los términos de servicio con cuidado
- Usa marcas de agua o herramientas que bloqueen la IA

Ninguno de estos pasos es infalible, pero juntos reducen de forma significativa cuánto del trabajo público de un diseñador termina en un conjunto de entrenamiento sin su conocimiento. Las marcas de agua en particular tienen un beneficio secundario interesante después del caso Getty: el hallazgo del fallo sobre infracción de marca sugiere que las marcas visibles pueden importar legalmente de formas en que actualmente los reclamos invisibles de derechos de autor no lo hacen.

## Cómo están respondiendo las plataformas de diseño

Distintas plataformas han tomado posturas distintas, y esas diferencias importan a la hora de decidir dónde publicar. Adobe ahora ofrece una configuración explícita de exclusión para los colaboradores de Adobe Stock y ha declarado que Firefly se entrena de aquí en adelante solo con contenido licenciado y de dominio público, tras la reacción anterior por los datos de Behance y Stock. Otras plataformas han sido mucho menos transparentes, lo cual es en sí mismo revelador, el silencio de una plataforma sobre su política de entrenamiento de IA generalmente no es señal de que no exista una.

Esta desigualdad ha llevado parte de la respuesta fuera de las plataformas individuales por completo. Grupos de defensa de artistas y diseñadores han impulsado estándares a nivel de industria en torno al consentimiento y la atribución, y herramientas como Glaze y Nightshade, construidas por investigadores específicamente para hacer que las imágenes sean resistentes a usarse limpiamente como datos de entrenamiento de IA, han visto una adopción real entre ilustradores y diseñadores que quieren una salvaguarda técnica en lugar de depender únicamente de la política de una plataforma.

## Qué pueden esperar realmente los diseñadores de aquí en adelante

Es poco probable que la incertidumbre legal actual se resuelva rápido. Solo los casos de Getty y The New York Times podrían tardar años en llegar a fallos finales, e incluso una vez que lo hagan, un resultado en una jurisdicción no aplicará automáticamente en otra. Mientras tanto, la postura más realista para un diseñador en activo es tratar el riesgo de entrenamiento de IA como trataría cualquier otro riesgo de negocio, no ignorable, pero tampoco paralizante, simplemente algo a tener en cuenta al decidir dónde y cómo publicar, de la misma forma en que pensarías en los términos de licencia o los contratos con clientes.

## Incorporar la conciencia sobre IA a la práctica de diseño

Más allá de los pasos individuales de protección, los diseñadores que navegan esto mejor tratan el riesgo de entrenamiento de IA como una parte continua de su práctica en lugar de un cambio de configuración de una sola vez. Eso significa revisar periódicamente los términos de servicio de una plataforma, ya que las políticas cambian a medida que evolucionan los litigios y la presión pública, las opciones actuales de exclusión de Adobe no existían hace unos años, y es probable que otras plataformas sigan un camino similar bajo suficiente presión. También significa ser deliberado sobre qué se publica y dónde: las piezas de portafolio pensadas para atraer clientes pueden justificar la exposición, mientras que los archivos de proceso, los conceptos sin usar o el trabajo de clientes bajo NDA generalmente no deberían ser públicos, independientemente de las preocupaciones sobre entrenamiento de IA.

## Preguntas frecuentes

### ¿Optar por no participar en el entrenamiento de IA realmente evita que usen mi trabajo?

Reduce el riesgo, pero no lo elimina. Las configuraciones de exclusión solo aplican en plataformas que las respetan, y no eliminan retroactivamente trabajo ya extraído antes de activar la configuración. Combinar la exclusión con portafolios privados para tu trabajo más sensible es un enfoque más confiable que cualquiera de los dos por separado.

### ¿Es legal que las empresas de IA entrenen con trabajo de diseño publicado públicamente?

Depende en gran medida de la jurisdicción y actualmente se está litigando de forma activa. El fallo de Getty v. Stability AI no encontró infracción de derechos de autor bajo la ley del Reino Unido en ese caso específico, pero el resultado podría ser distinto bajo la ley de EE. UU., donde el caso de The New York Times sigue sin resolverse, así que "legal" actualmente varía según el tribunal y el caso.

### ¿Debería dejar de publicar trabajo públicamente por esto?

No necesariamente, la visibilidad sigue siendo importante para construir una carrera, y hacer todo privado tiene costos profesionales reales. El enfoque más práctico es ser deliberado sobre qué plataformas usas, revisar sus políticas de entrenamiento de IA, y tratar las marcas de agua y los términos de licencia como parte de tu flujo de trabajo en lugar de una idea de último momento.

### ¿Las marcas de agua o las herramientas que bloquean IA realmente funcionan?

De forma imperfecta, pero no inútil. Herramientas como Glaze funcionan alterando sutilmente una imagen de formas invisibles para un ojo humano pero que interrumpen cómo un modelo de IA la interpreta durante el entrenamiento, lo que eleva el costo y la dificultad de usar esa imagen de forma limpia. Ninguna de estas herramientas ofrece una garantía, y las técnicas de ambos lados siguen evolucionando, pero combinadas con una configuración de exclusión y la política declarada de una plataforma, cambian de forma significativa las probabilidades en lugar de dejar tu trabajo completamente desprotegido.

### ¿Esto aplica también al trabajo hecho para clientes, no solo a piezas de portafolio personal?

Sí, y podría decirse que aún más. El trabajo para clientes suele conllevar obligaciones contractuales de confidencialidad y propiedad que convierten el uso no autorizado para entrenamiento de IA en una cuestión de responsabilidad mayor, no solo personal. Agregar un lenguaje explícito a los contratos con clientes sobre cómo se pueden y no se pueden usar los entregables para entrenamiento de IA cierra esa brecha, ya que la mayoría de las plantillas de contrato estándar son anteriores a este tema por completo y no dicen nada al respecto en ningún sentido.

### ¿Hay alguna forma de verificar si mi trabajo específico ya se usó para entrenamiento de IA?

No de forma confiable, en la mayoría de los casos. Un puñado de herramientas permite buscar si una imagen se parece a contenido en un conjunto de datos de entrenamiento conocido, pero la cobertura es parcial y la mayoría de los grandes laboratorios de IA no publican registros buscables de sus conjuntos de entrenamiento completos. Esa brecha es en sí misma una de las quejas centrales en las demandas en curso: sin transparencia sobre con qué se entrenó realmente un modelo, los creadores individuales tienen muy poca capacidad de verificar su propia exposición, y mucho menos de buscar reparación por ella.

## El futuro de la IA y la ética del diseño

La intersección entre la IA y el diseño plantea preguntas éticas y legales complejas que no se resolverán rápido. Los diseñadores deben mantenerse informados sobre cómo se está usando su trabajo, no porque las respuestas sean simples, sino porque las plataformas que alojan su trabajo rara vez hacen evidentes esas compensaciones. La misma brecha de responsabilidad aparece en otros ámbitos también, lo cual es parte de por qué hemos argumentado que [la regulación de IA necesita avanzar más rápido de lo que lo hace actualmente](/insights/containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us). Si estás pensando en cómo encaja la IA en el proceso de diseño de tu equipo y no solo en tu portafolio personal, ese es exactamente el tipo de pregunta que nuestro [trabajo de diseño de producto](/services) está pensado para responder.`,
    },
  },
  {
    slug: "excited-or-terrified-what-people-really-think-about-ai",
    titleKey: "posts.publicPerception.title",
    excerptKey: "posts.publicPerception.excerpt",
    author: "Jon Sabutis",
    date: "2025-03-28",
    image: "/images/blog/runner.png",
    content: {
      en: `Artificial Intelligence (AI) has rapidly integrated into various facets of daily life, prompting a spectrum of reactions from the general public. The picture that emerges from the data isn't simple optimism or simple fear, it's both, often held by the same people at the same time, and the latest 2026 research makes that tension sharper, not simpler.

## Adoption Is Rising Faster Than Comfort

Usage and unease are climbing together. According to [Pew Research Center's 2026 survey](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/), 31% of Americans now interact with AI several times a day, up from 22% just two years earlier, and 44% of U.S. adults report using ChatGPT specifically, up from 34% the prior year. Workplace adoption is climbing too, the share of U.S. workers who say at least some of their job is done with AI rose from 16% in 2024 to 21% in a September 2025 survey.

Yet that same research found roughly half of Americans believe AI will worsen people's ability to think creatively and form meaningful relationships with others, with far fewer saying it will make those things better. Familiarity is clearly growing faster than trust.

## Privacy and Ethical Concerns

Concerns about how AI handles personal data remain persistent even as adoption grows. Earlier Pew survey data found that over half of Americans believe AI makes it harder to maintain personal privacy, and separate consumer research has found only about a third of UK consumers feel confident using generative AI responsibly, suggesting the gap isn't just about whether people trust AI companies, but whether they trust their own judgment using the tools.

## Job Security and Employment

Forrester's often-cited projection estimates that by 2027, automation will displace approximately 24.7 million jobs while creating 14.9 million new ones, a net loss of roughly 9.8 million jobs. Numbers like these help explain why job security consistently ranks among the top public concerns about AI, even in surveys that show broader support for the technology in other respects.

## Diverse Global Perspectives

Trust in AI varies sharply by country, and the gap has been remarkably stable across years of research. [KPMG's global Trust in AI study](https://kpmg.com/cn/en/home/media/press-releases/2025/05/global-study-reveals-trust-of-ai-remains-a-critical-challenge-reflecting-tension-between-benefits-and-risks.html) found Chinese respondents reporting some of the highest trust, acceptance, and optimism about AI in the world, with 93% of Chinese employees using AI regularly compared to a 58% global average. Earlier KPMG research put willingness to trust AI systems at 67% in China versus 40% in the United States, a gap wide enough that it can't be explained by access to the technology alone; it reflects real differences in culture, institutional trust, and how each country's media covers AI.

## Calls for Regulation

Support for AI regulation in the UK is not just strong, it's growing. A [2026 survey reported by TIME](https://time.com/7213096/uk-public-ai-law-poll/) found 87% of Britons would back a law requiring AI developers to prove their systems are safe before release, and a majority favor restrictions on developing AI models that would exceed human-level intelligence. Separate research from the [Alan Turing Institute](https://www.turing.ac.uk/news/7-10-say-laws-and-regulations-would-increase-their-comfort-ai-amid-rising-public-concerns) found 72% of people say laws and regulation would increase their comfort with AI, up from 62% just a few years earlier, support for regulation is rising in step with usage, not fading as people get used to the technology.

## Positive Outlooks

The picture isn't uniformly negative. Public opinion research consistently finds strong majority support for AI applications with a clear, tangible public benefit, cancer risk assessment, educational tools, and climate research chief among them, evidence that concern and optimism about AI aren't mutually exclusive; they coexist depending on the specific application and who benefits from it. People are considerably more comfortable with AI helping a doctor read a scan than with AI making decisions about their job or their data.

## Generational Differences in AI Sentiment

Age is one of the more consistent predictors of AI sentiment within any single country, not just between countries. Younger adults tend to report higher day-to-day usage and somewhat more comfort experimenting with new AI tools, while older adults report both lower usage and, in several surveys, deeper skepticism about AI's role in high-stakes decisions like healthcare or credit. That gap narrows on specific applications with a clear personal benefit, interest in AI-assisted health monitoring, for instance, tends to be strong across age groups once the benefit is concrete rather than abstract.

This generational pattern matters for anyone building AI products: a single "public" attitude toward AI doesn't really exist. A product aimed at younger, more AI-fluent users can lean into more autonomous, less explained AI behavior, while a product for an older or more skeptical audience typically needs more visible control, explanation, and an easy way to fall back to a human option.

## What Businesses Should Take From This Data

For any company building AI-powered products, the throughline across all of this research is consistent: usage and skepticism are rising together, and treating them as contradictory is a mistake. The businesses seeing the best reception aren't the ones downplaying AI's risks or overselling its capabilities, they're the ones being specific and honest about what their AI actually does, giving users real visibility into and control over how it's used, and building toward the kind of transparency regulators and the public are both independently asking for. Trust, on this data, isn't won by convincing people AI has no downsides; it's won by demonstrating that the downsides are being taken seriously.

## Frequently Asked Questions

### Is public trust in AI increasing or decreasing over time?

Both usage and specific concerns are rising together, rather than one replacing the other. More people use AI daily than two years ago, but Pew's 2026 data shows worry about AI's effect on creativity and relationships also increased over the same period, familiarity hasn't resolved unease so much as sharpened people's sense of what specifically concerns them.

### Why does trust in AI vary so much by country?

Differences in trust track closely with differences in institutional trust more broadly, media coverage patterns, and how directly the state versus private companies are seen as steering AI development. The gap between China and the United States in KPMG's research has held up consistently across multiple years of study, suggesting it reflects something structural rather than a temporary sentiment swing.

### Does support for AI regulation conflict with using AI products?

Not in practice. Surveys consistently find the same population reporting high AI usage and strong support for stricter safety rules simultaneously, people generally want the benefits of the technology alongside real accountability for how it's built and deployed, not one or the other.

### Which AI applications see the strongest public support?

Applications with a clear, tangible benefit to an identifiable person tend to poll best, medical diagnostics, educational tools, and climate or scientific research consistently outperform more abstract or self-interested use cases like advertising personalization or workplace monitoring. The common thread isn't the sophistication of the technology; it's whether the person affected can see who benefits and how.

### How reliable are one-off statistics about AI attitudes reported in the news?

Treat a single number with some caution, especially without a source, sample size, or date attached. Public sentiment on AI has moved quickly enough that a statistic from 2023 can already be stale, and different survey methodologies (a nationally representative panel versus an opt-in online poll) can produce meaningfully different results on the same question. The figures cited throughout this piece are drawn from named research organizations for exactly that reason: so the underlying methodology and date are checkable rather than taken on faith.

### Do people's stated concerns about AI actually change their behavior?

Not always, and that gap says something on its own. Plenty of survey respondents report real concern about AI's effect on privacy or employment while continuing to use AI tools daily, which isn't necessarily inconsistent. It reflects a public that has largely concluded the technology is now unavoidable in daily life and workplaces, so the practical question for most people has shifted from whether to engage with AI to how much oversight and choice they get while doing so. That shift, more than any single statistic in this piece, is probably the clearest signal of where public opinion on AI is actually headed. It also explains why the businesses and regulators paying closest attention to this data aren't trying to talk people out of their concerns, but building the oversight that would let people hold both usage and skepticism at once without contradiction, which is a more useful goal than chasing a universal enthusiasm that the data consistently suggests isn't coming anytime soon, in the US or anywhere else.

## Conclusion

Public perception of AI is complex and multifaceted, and 2026's data shows that complexity deepening rather than resolving as adoption grows. As AI continues to evolve, addressing ethical considerations, ensuring transparency, and implementing robust regulations, several approaches to which we cover in more detail in [our piece on practical AI regulation](/insights/containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us), will be crucial to closing the gap between where public trust is today and where the technology is headed.`,
      es: `La Inteligencia Artificial (IA) se ha integrado rápidamente en distintos aspectos de la vida diaria, provocando un espectro de reacciones en el público general. El panorama que surge de los datos no es simple optimismo ni simple temor, es ambos a la vez, sostenidos muchas veces por las mismas personas al mismo tiempo, y la investigación más reciente de 2026 muestra esa tensión de forma más marcada, no más simple.

## La adopción crece más rápido que la comodidad

El uso y la inquietud están creciendo juntos. Según la [encuesta 2026 del Pew Research Center](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/), el 31% de los estadounidenses ahora interactúa con IA varias veces al día, frente al 22% de hace apenas dos años, y el 44% de los adultos en EE. UU. reporta usar específicamente ChatGPT, frente al 34% del año anterior. La adopción en el lugar de trabajo también crece, la proporción de trabajadores estadounidenses que dice que al menos parte de su trabajo lo hace con IA subió del 16% en 2024 al 21% en una encuesta de septiembre de 2025.

Sin embargo, esa misma investigación encontró que aproximadamente la mitad de los estadounidenses cree que la IA empeorará la capacidad de las personas para pensar de forma creativa y formar relaciones significativas con otros, con muchos menos diciendo que las mejorará. La familiaridad claramente está creciendo más rápido que la confianza.

## Preocupaciones de privacidad y ética

Las preocupaciones sobre cómo la IA maneja los datos personales persisten incluso mientras crece la adopción. Datos anteriores de Pew encontraron que más de la mitad de los estadounidenses cree que la IA dificulta mantener la privacidad personal, y una investigación de consumo por separado encontró que solo cerca de un tercio de los consumidores en el Reino Unido se siente seguro usando IA generativa de forma responsable, lo que sugiere que la brecha no es solo sobre si la gente confía en las empresas de IA, sino sobre si confía en su propio criterio al usar las herramientas.

## Seguridad laboral y empleo

La proyección de Forrester, ampliamente citada, estima que para 2027 la automatización desplazará aproximadamente 24.7 millones de empleos mientras crea 14.9 millones nuevos, una pérdida neta de casi 9.8 millones de empleos. Cifras como estas ayudan a explicar por qué la seguridad laboral se ubica consistentemente entre las principales preocupaciones públicas sobre la IA, incluso en encuestas que muestran un apoyo más amplio a la tecnología en otros aspectos.

## Perspectivas globales diversas

La confianza en la IA varía marcadamente según el país, y esa brecha se ha mantenido notablemente estable a lo largo de los años de investigación. El [estudio global Trust in AI de KPMG](https://kpmg.com/cn/en/home/media/press-releases/2025/05/global-study-reveals-trust-of-ai-remains-a-critical-challenge-reflecting-tension-between-benefits-and-risks.html) encontró que los encuestados chinos reportan algunos de los niveles más altos de confianza, aceptación y optimismo sobre la IA en el mundo, con el 93% de los empleados chinos usando IA regularmente frente a un promedio global del 58%. Investigación anterior de KPMG ubicó la disposición a confiar en sistemas de IA en 67% en China frente a 40% en Estados Unidos, una brecha lo suficientemente amplia como para no poder explicarse solo por el acceso a la tecnología; refleja diferencias reales en cultura, confianza institucional y cómo cubre la IA los medios de cada país.

## Llamados a la regulación

El apoyo a la regulación de IA en el Reino Unido no solo es fuerte, está creciendo. Una [encuesta de 2026 reportada por TIME](https://time.com/7213096/uk-public-ai-law-poll/) encontró que el 87% de los británicos respaldaría una ley que exija a los desarrolladores de IA demostrar que sus sistemas son seguros antes de su lanzamiento, y una mayoría favorece restricciones al desarrollo de modelos de IA que superen la inteligencia humana. Investigación separada del [Alan Turing Institute](https://www.turing.ac.uk/news/7-10-say-laws-and-regulations-would-increase-their-comfort-ai-amid-rising-public-concerns) encontró que el 72% de las personas dice que las leyes y la regulación aumentarían su comodidad con la IA, frente al 62% de solo unos años antes, el apoyo a la regulación crece al mismo ritmo que el uso, no se desvanece a medida que la gente se acostumbra a la tecnología.

## Perspectivas positivas

El panorama no es uniformemente negativo. La investigación de opinión pública encuentra consistentemente un fuerte apoyo mayoritario a las aplicaciones de IA con un beneficio público claro y tangible, la evaluación de riesgo de cáncer, las herramientas educativas y la investigación climática entre las principales, evidencia de que la preocupación y el optimismo sobre la IA no son mutuamente excluyentes; coexisten dependiendo de la aplicación específica y de quién se beneficia de ella. La gente se siente considerablemente más cómoda con que la IA ayude a un médico a leer un escáner que con que la IA tome decisiones sobre su empleo o sus datos.

## Diferencias generacionales en la percepción de la IA

La edad es uno de los predictores más consistentes de la actitud hacia la IA dentro de un mismo país, no solo entre países. Los adultos más jóvenes tienden a reportar mayor uso cotidiano y algo más de comodidad experimentando con nuevas herramientas de IA, mientras que los adultos mayores reportan tanto menor uso como, en varias encuestas, un escepticismo más profundo sobre el papel de la IA en decisiones de alto impacto como salud o crédito. Esa brecha se reduce en aplicaciones específicas con un beneficio personal claro, el interés en el monitoreo de salud asistido por IA, por ejemplo, tiende a ser fuerte en todos los grupos de edad una vez que el beneficio es concreto y no abstracto.

Este patrón generacional importa para cualquiera que construya productos de IA: una sola actitud "pública" hacia la IA realmente no existe. Un producto dirigido a usuarios más jóvenes y familiarizados con la IA puede apoyarse en un comportamiento de IA más autónomo y menos explicado, mientras que un producto para una audiencia mayor o más escéptica generalmente necesita más control visible, más explicación y una forma fácil de recurrir a una opción humana.

## Qué deberían aprender las empresas de estos datos

Para cualquier empresa que construya productos impulsados por IA, el hilo conductor de toda esta investigación es consistente: el uso y el escepticismo están creciendo juntos, y tratarlos como contradictorios es un error. Las empresas que reciben la mejor acogida no son las que minimizan los riesgos de la IA ni las que exageran sus capacidades, son las que son específicas y honestas sobre lo que realmente hace su IA, las que le dan a los usuarios visibilidad y control reales sobre cómo se usa, y las que avanzan hacia el tipo de transparencia que tanto los reguladores como el público están pidiendo, de forma independiente. La confianza, según estos datos, no se gana convenciendo a la gente de que la IA no tiene desventajas; se gana demostrando que esas desventajas se están tomando en serio.

## Preguntas frecuentes

### ¿La confianza pública en la IA está aumentando o disminuyendo con el tiempo?

Tanto el uso como preocupaciones específicas están aumentando juntos, en lugar de que uno reemplace al otro. Más personas usan IA a diario que hace dos años, pero los datos de Pew de 2026 muestran que la preocupación por el efecto de la IA en la creatividad y las relaciones también aumentó en el mismo período, la familiaridad no ha resuelto la inquietud tanto como ha afinado el sentido de la gente sobre qué es específicamente lo que le preocupa.

### ¿Por qué la confianza en la IA varía tanto según el país?

Las diferencias en confianza siguen de cerca las diferencias en la confianza institucional en general, los patrones de cobertura mediática y qué tan directamente se percibe que el Estado, frente a las empresas privadas, dirige el desarrollo de la IA. La brecha entre China y Estados Unidos en la investigación de KPMG se ha mantenido consistente a lo largo de varios años de estudio, lo que sugiere que refleja algo estructural y no un cambio de ánimo pasajero.

### ¿El apoyo a la regulación de IA entra en conflicto con usar productos de IA?

En la práctica, no. Las encuestas encuentran consistentemente que la misma población reporta un alto uso de IA y un fuerte apoyo a reglas de seguridad más estrictas al mismo tiempo, la gente generalmente quiere los beneficios de la tecnología junto con una responsabilidad real sobre cómo se construye y se despliega, no una cosa u otra.

### ¿Qué aplicaciones de IA tienen el mayor apoyo público?

Las aplicaciones con un beneficio claro y tangible para una persona identificable suelen tener mejor recepción en las encuestas, el diagnóstico médico, las herramientas educativas y la investigación climática o científica superan consistentemente a casos de uso más abstractos o de interés propio, como la personalización publicitaria o el monitoreo laboral. El hilo común no es la sofisticación de la tecnología; es si la persona afectada puede ver quién se beneficia y cómo.

### ¿Qué tan confiables son las estadísticas sueltas sobre actitudes hacia la IA que aparecen en las noticias?

Trata con cierta cautela una cifra aislada, especialmente si no viene con fuente, tamaño de muestra o fecha. La percepción pública sobre la IA se ha movido lo suficientemente rápido como para que una estadística de 2023 ya esté desactualizada, y distintas metodologías de encuesta (un panel representativo a nivel nacional frente a una encuesta en línea de participación voluntaria) pueden producir resultados significativamente distintos sobre la misma pregunta. Las cifras citadas a lo largo de este artículo provienen de organizaciones de investigación identificadas exactamente por esa razón: para que la metodología y la fecha subyacentes se puedan verificar en lugar de tomarse como un acto de fe.

### ¿Las preocupaciones expresadas por la gente sobre la IA realmente cambian su comportamiento?

No siempre, y esa brecha dice algo por sí sola. Muchos encuestados reportan preocupación real por el efecto de la IA en la privacidad o el empleo mientras siguen usando herramientas de IA a diario, lo cual no es necesariamente contradictorio. Refleja un público que en gran medida ha concluido que la tecnología ya es inevitable en la vida diaria y en el trabajo, así que la pregunta práctica para la mayoría de las personas ha pasado de si involucrarse con la IA a cuánta supervisión y capacidad de elección tienen mientras lo hacen. Ese cambio, más que cualquier estadística aislada en este artículo, es probablemente la señal más clara de hacia dónde se dirige realmente la opinión pública sobre la IA. Esto también explica por qué las empresas y los reguladores que prestan más atención a estos datos no intentan convencer a la gente de dejar de lado sus preocupaciones, sino que construyen la supervisión que permitiría a las personas sostener a la vez el uso y el escepticismo sin contradicción, lo cual es una meta más útil que perseguir un entusiasmo universal que, según los datos, no parece estar en camino.

## Conclusión

La percepción pública de la IA es compleja y multifacética, y los datos de 2026 muestran que esa complejidad se profundiza en lugar de resolverse a medida que crece la adopción. A medida que la IA continúa evolucionando, abordar las consideraciones éticas, garantizar la transparencia e implementar regulaciones sólidas, varios enfoques que cubrimos con más detalle en [nuestro artículo sobre regulación práctica de IA](/insights/containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us), será crucial para cerrar la brecha entre dónde está la confianza pública hoy y hacia dónde se dirige la tecnología.`,
    },
  },
];
