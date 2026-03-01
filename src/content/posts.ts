export interface Post {
  slug: string;
  titleKey: string;
  excerptKey: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "introducing-product-kpis-bringing-measurable-impact-into-your-design-workflow",
    titleKey: "posts.productKpisPlugin.title",
    excerptKey: "posts.productKpisPlugin.excerpt",
    author: "Jon Sabutis",
    date: "2026-02-28",
    image: "/images/blog/archer.png",
    content: `In the fast-paced world of product development, the gap between "shipping features" and "proving impact" is where most teams lose their footing. Features get built, launches get celebrated, and then comes the scramble — digging through dashboards, stitching together data points, and hoping something sticks when leadership asks the inevitable question: how do we know this worked?

The problem isn't a lack of data. It's a lack of shared language around what success looks like before the first pixel is placed.

## The KPI Problem in Product Design

Most product teams treat Key Performance Indicators as an afterthought — something that gets defined in a spreadsheet after the design is already locked, handed off, and halfway through development. By then, the opportunity to design for measurable outcomes has already passed.

Even teams that prioritize metrics early face a different challenge: choosing the right ones. With hundreds of potential KPIs across acquisition, activation, retention, revenue, and engagement, it's easy to either track everything (and learn nothing) or default to vanity metrics that look impressive in a slide deck but don't actually move the business forward.

We kept seeing this pattern across projects and industries — talented teams building great products but struggling to connect their design decisions to measurable outcomes. No shared framework. No clear benchmarks. No single source of truth that lives where the work actually happens.

So we built one.

## Introducing Product KPIs

Product KPIs is a Figma plugin that integrates a library of over 100 industry-tested Key Performance Indicators directly into your design workflow. Each KPI comes with a clear definition, goal context, and common benchmarks for measurement — bringing greater clarity and accountability into the product design process from the very beginning.

But this isn't just a static reference list. The plugin is designed to meet teams where they are and help them make better decisions faster.

## How It Works

### Intelligent Recommendations

Rather than asking teams to sift through a wall of metrics, Product KPIs includes a step-by-step wizard that collects context about your product, goals, requirements, and constraints. An AI-powered algorithm then processes your answers and surfaces the most relevant, high-impact KPIs for your specific situation.

Think of it as a guided conversation that replaces the midnight Google search for "best KPIs for SaaS" with something far more targeted and actionable.

### Searchable Database

For teams that prefer to browse, the plugin provides a comprehensive, frequently updated database of KPIs organized with tag-based filtering. Whether you're looking for engagement metrics for a consumer app or operational KPIs for an enterprise platform, you can find exactly what you need in seconds.

### In-Context Tracking

With one click, the plugin exports a tracking widget directly into your Figma file. Each widget includes the KPI's definition, goals, benchmarks, and links to additional resources — along with input fields for ownership assignment and notes. This keeps the conversation about measurement anchored in the same space where design decisions are being made, rather than scattered across separate tools and documents.

### Export Anywhere

Not everything lives in Figma, and we built for that reality. Product KPIs supports export to a variety of common file formats, making it easy to share your selected KPIs with stakeholders, plug them into project management tools, or integrate them into the rest of your product stack.

## Why We Built This

At Arsonist AI, we believe the gap between design and measurable impact shouldn't exist. Designers and product managers deserve tools that make defining success a first-class part of the creative process — not a reporting exercise that happens after the fact.

We've seen firsthand how the right KPIs, chosen at the right time, can transform team alignment. When everyone is working toward the same clearly defined outcomes, decisions get sharper, debates get more productive, and the work itself becomes more intentional.

Product KPIs is our attempt to make that alignment effortless — embedded directly in the tool where the work is already happening.

## Get Started

Product KPIs is available now on the Figma Community. Install it, run the wizard, and start designing with measurable intent.

We'd love to hear how your team approaches KPI selection and what you think of the plugin. Reach out to us at info@arsonistai.com.`,
  },
  {
    slug: "why-choosing-the-right-kpis-makes-all-the-difference-in-product-success",
    titleKey: "posts.kpis.title",
    excerptKey: "posts.kpis.excerpt",
    author: "Jon Sabutis",
    date: "2025-08-12",
    image: "/images/blog/kpi-blog.png",
    content: `In the fast-paced world of product development and UX design, "impact" isn't just corporate jargon—it's the north star that guides every decision, feature, and design iteration. Yet without the right Key Performance Indicators (KPIs) serving as your compass, defining, measuring, and achieving meaningful impact becomes an expensive guessing game. The difference between successful products and failed launches often comes down to whether teams tracked the right metrics at the right time.`,
  },
  {
    slug: "containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us",
    titleKey: "posts.containment.title",
    excerptKey: "posts.containment.excerpt",
    author: "Jon Sabutis",
    date: "2025-07-17",
    image: "/images/blog/containment.png",
    content: `In an era where artificial intelligence is increasingly shaping the fundamental pillars of society—from the allocation of capital in finance and the dissemination of knowledge in education, to the provision of care in health and the exercise of power in politics—the critical question we face is no longer if AI should be regulated, but how. The imperative for regulation isn't born from speculative sci-fi nightmares of rogue sentient machines threatening humanity. Rather, it is driven by concrete, measurable harms that are already manifesting in our daily lives.

The scale and speed of AI deployment across society has outpaced our regulatory frameworks by decades. Consider that the same algorithms deciding mortgage approvals, criminal sentencing recommendations, and medical diagnoses operate with less oversight than the approval process for a new breakfast cereal.

## The Current Landscape: Documented Harms and Systemic Failures

### Bias Amplification in Critical Systems

Recent studies have documented how AI systems systematically disadvantage marginalized communities. Facial recognition systems demonstrate error rates up to 35% higher for women of color compared to white men. Hiring algorithms trained on historical data perpetuate workplace discrimination, screening out qualified candidates based on zip codes, names, or educational backgrounds that correlate with protected characteristics.

### The Surveillance Economy

Modern AI surveillance extends far beyond traditional security cameras. Educational institutions deploy emotion recognition software to monitor student engagement, creating psychological profiles that follow students throughout their academic careers. Workplace surveillance systems track employee productivity, bathroom breaks, and social interactions.

## 9 Practical Strategies for AI Regulation

### 1. Algorithmic Auditing and Transparency Requirements
Mandate regular algorithmic audits for AI systems used in high-stakes decisions. These audits should examine training data, decision-making processes, and outcomes for bias and fairness.

### 2. Data Rights and Digital Dignity
Implement comprehensive data rights legislation that includes the right to algorithmic explanation, the right to human review of automated decisions, and the right to data portability.

### 3. Algorithmic Labor Rights
Establish labor rights for AI workers, including fair wages, safe working conditions, and protection from psychological harm.

### 4. Public Interest AI Development
Establish public AI research institutions and require public benefit considerations in AI development.

### 5. Sectoral AI Governance
Develop sector-specific AI governance frameworks that address the particular risks and requirements of each domain.

### 6. Democratic Participation in AI Governance
Create participatory governance mechanisms that give communities a voice in AI decisions that affect them.

### 7. Liability and Redress Mechanisms
Establish clear liability frameworks for AI harms, including strict liability for certain high-risk AI applications.

### 8. International Cooperation and Standards
Develop international AI governance standards and cooperation mechanisms.

### 9. Adaptive Regulation and Continuous Monitoring
Create adaptive regulatory frameworks that can evolve with technology.

## Conclusion

We stand at a critical juncture in human history. The choices we make about AI governance in the coming years will shape the trajectory of technological development and social progress for generations to come. The nine strategies outlined here provide a roadmap for containing AI's risks while preserving its benefits.`,
  },
  {
    slug: "10-ways-to-incorporate-ai-into-everyday-life",
    titleKey: "posts.everydayAI.title",
    excerptKey: "posts.everydayAI.excerpt",
    author: "Jon Sabutis",
    date: "2025-05-21",
    image: "/images/blog/everyday-ai.png",
    content: `As Artificial Intelligence (AI) continues to evolve, it has become an increasingly valuable tool in various aspects of life. From work tasks to personal activities, AI can be a supportive ally in a wide range of scenarios.

## 1. Language Translation and Learning Assistant
AI-powered language translation tools have revolutionized how people learn new languages and communicate across language barriers. With tools like Google Translate or AI-driven apps like Duolingo, users can quickly and accurately translate words, sentences, or entire paragraphs.

## 2. Personalized Cooking Assistance
AI can be a tremendous help in the kitchen. AI-powered apps can suggest recipes based on available ingredients, dietary preferences, or even health goals.

## 3. Smart Home Automation
From smart thermostats like Nest to voice-controlled smart assistants like Amazon Alexa and Google Assistant, AI can streamline day-to-day home management.

## 4. Personal Finance Management
AI can simplify personal finance management by automating budgeting and tracking expenses.

## 5. Enhanced Customer Service with AI Chatbots
AI chatbots are transforming customer service by offering immediate assistance through messaging platforms, websites, and apps.

## 6. Virtual Health Assistants and Wellness Monitoring
AI-driven health assistants are playing an increasingly significant role in healthcare and wellness.

## 7. Productivity Tools and Task Automation
Tools like scheduling assistants can help manage appointments, coordinate meetings, and optimize calendars.

## 8. Smart Shopping and Price Comparisons
AI tools can automatically compare prices across different retailers, ensuring the best deals for consumers.

## 9. Entertainment and Content Recommendations
Platforms like Netflix, Spotify, and YouTube use AI algorithms to recommend content based on a user's history.

## 10. Enhanced Travel Experiences
AI-powered travel apps offer personalized recommendations for flights, hotels, restaurants, and activities.

## Conclusion
AI is no longer a futuristic concept; it's a practical tool that can be incorporated into everyday life. For those who haven't yet explored AI's potential, now is the perfect time to begin.`,
  },
  {
    slug: "lean-product-canvas-interactive-figma-templates",
    titleKey: "posts.leanCanvas.title",
    excerptKey: "posts.leanCanvas.excerpt",
    author: "Jon Sabutis",
    date: "2025-05-12",
    image: "/images/blog/lean-canvas.png",
    content: `When we engaged two of the most influential voices in modern product thinking—Jeff Gothelf and Josh Seiden, co-authors of Lean UX, Sense & Respond, and Who Does What By How Much?—we recognized the opportunity to collaborate on something that could meaningfully impact how product teams work, align, and build across the globe.

At the heart of this collaboration was their vision: to bring the newly evolved Lean Product Canvas—the successor to the widely-used Lean UX Canvas—into a modern, flexible, and fully interactive digital format.

### From Lean UX Canvas to Lean Product Canvas

What originally began as the Lean UX Canvas has now evolved into a more comprehensive framework: the Lean Product Canvas. This new format broadens its focus beyond UX execution and into organizational alignment, business goals, and long-term strategy.

### A Deep Collaboration with Jeff Gothelf and Josh Seiden

Throughout the collaboration, we worked directly with Jeff Gothelf to translate the Lean Product Canvas into an actionable, facilitation-friendly experience tailored for Figma and FigJam.

### What Teams Are Unlocking

- Tighter Execution: Strategy and delivery are connected by a shared language and visual reference.
- Early Obstacle Detection: Friction points and gaps are surfaced before development begins.
- Clarity on Objectives: OKRs and desired outcomes are defined early.
- Strategic Alignment: Teams align around a shared understanding of purpose.

### Looking Ahead

At Arsonist AI, we believe design tools should do more than look polished—they should amplify team clarity, inspire action, and fuel momentum.`,
  },
  {
    slug: "would-you-date-an-ai",
    titleKey: "posts.dateAI.title",
    excerptKey: "posts.dateAI.excerpt",
    author: "Jon Sabutis",
    date: "2025-04-28",
    image: "/images/blog/handshake.png",
    content: `On January 2025, the New York Times published a striking piece about a growing phenomenon: people forming deeply emotional, sometimes romantic connections with AI companions. The article documents the nuanced experiences of users who turn to AI not just for information or productivity, but for connection.

This trend raises important questions about the nature of human connection, the role of technology in our emotional lives, and where we draw the line between tool and companion. As AI becomes more sophisticated in its ability to understand and respond to human emotions, these questions will only become more pressing.

The implications extend beyond personal relationships into broader societal considerations about loneliness, mental health, and the evolving definition of companionship in the digital age.`,
  },
  {
    slug: "how-to-use-figma-to-manage-your-brand",
    titleKey: "posts.figmaBrand.title",
    excerptKey: "posts.figmaBrand.excerpt",
    author: "Jon Sabutis",
    date: "2025-04-15",
    image: "/images/blog/figma-cover.png",
    content: `Figma is not just a design tool. It's the command center your brand has been waiting for. In an era where speed, clarity, and collaboration are everything, Figma has quietly evolved into one of the most essential platforms for managing modern businesses—even beyond the design team.

### The Problem With Traditional Asset Management

Remember the days of losing time digging through disorganized folders named things like "final_final2.pdf"? Figma offers an elegant solution.

### Pages + Components = Organized Brand Power

One of the most underutilized features in Figma is its Pages panel. When paired with Figma Components, you get a system where updates are universally applied, assets are always in sync, and anyone on your team can find what they need, fast.

- Page: Documents – Pitch decks, business plans, proposals
- Page: Social Templates – Instagram, TikTok, and Facebook posts
- Page: Logos & Icons – All your branding marks, componentized
- Page: Brand Guidelines – Colors, fonts, and rules

### Beyond the Design Team: Figma for Everyone

What started as a design-first platform is now being adopted by marketers, operations leads, startup founders, and even HR departments.

### The Figma New Business Toolkit

A collection of 30+ easy-to-use, continually updated, interactive templates and assets designed to help you rapidly kickstart or supplement your business.`,
  },
  {
    slug: "what-designers-need-to-know-about-ai",
    titleKey: "posts.designersAI.title",
    excerptKey: "posts.designersAI.excerpt",
    author: "Jon Sabutis",
    date: "2025-03-28",
    image: "/images/blog/ken-cover.png",
    content: `Are AI Models Training on Your Designs? What Every Designer Needs to Know.

AI models require vast amounts of data to learn how to generate designs, UI layouts, and illustrations. This data often comes from publicly available images, creative communities, and software tools—many of which designers actively use.

### How AI Models Use Designer-Generated Content

Adobe faced significant backlash after users discovered Firefly was trained on Adobe Stock and Behance content. Dribbble has not explicitly confirmed whether its content is used for AI training. While Figma has not disclosed its AI data use, its community files and third-party plugins likely contribute to training datasets.

### The Legal Battles Have Already Begun

A class-action lawsuit accuses Stability AI, Midjourney, and DeviantArt of scraping millions of artworks without consent. The New York Times sued OpenAI for allegedly using copyrighted journalism in ChatGPT's training data.

### How to Protect Your Designs

- Opt out of AI training when possible
- Make work private on portfolio sites
- Read the terms of service carefully
- Use watermarks or AI-blocking tools

### The Future of AI and Design Ethics

The intersection of AI and design raises complex ethical and legal questions. Designers must remain informed about how their work is being used.`,
  },
  {
    slug: "excited-or-terrified-what-people-really-think-about-ai",
    titleKey: "posts.publicPerception.title",
    excerptKey: "posts.publicPerception.excerpt",
    author: "Jon Sabutis",
    date: "2025-03-28",
    image: "/images/blog/runner.png",
    content: `Artificial Intelligence (AI) has rapidly integrated into various facets of daily life, prompting a spectrum of reactions from the general public.

### Predominant Concerns

A Pew Research Center survey revealed that 52% of Americans are more concerned than excited about AI in daily life, with only 10% feeling more excited than concerned.

### Privacy and Ethical Issues

Over half (53%) of Americans believe AI exacerbates the challenge of maintaining personal information privacy. Ethical considerations also loom large, with only about a third of UK consumers confident in their ability to use generative AI responsibly.

### Job Security and Employment

Forrester predicts that by 2027, automation will displace approximately 24.7 million jobs while creating 14.9 million new ones, resulting in a net loss of 9.8 million jobs.

### Diverse Global Perspectives

In China, 72% of individuals trust AI, contrasting sharply with 32% in the United States. In Europe, 34% of individuals under 35 would trust AI to vote on their behalf.

### Calls for Regulation

In the UK, 87% of citizens support laws requiring AI systems to be proven safe before release, and 60% favor banning the development of AI models smarter than humans.

### Positive Outlooks

88% of the public sees AI as beneficial for assessing cancer risks, 76% appreciate its role in education, and 74% acknowledge its contributions to climate research.

### Conclusion

Public perception of AI is complex and multifaceted. As AI continues to evolve, addressing ethical considerations, ensuring transparency, and implementing robust regulations will be crucial.`,
  },
];
