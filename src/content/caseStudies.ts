export interface CaseStudy {
  slug: string;
  title: string;
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
    client: "Hello CIT",
    url: "https://www.hellocit.com/",
    heroImage: "/images/work/hello-cit-hero.png",
    summary:
      "A fully interactive, modern website for Hello CIT — a technology company that accelerates businesses through AI factories, digital agents, and infrastructure solutions. Built with a focus on dynamic user experience, clear service communication, and multilingual support.",
    sections: [
      {
        heading: "The Challenge",
        body: "Hello CIT needed a digital presence that matched the sophistication of their technology offerings. Their existing site lacked the interactivity and visual impact needed to communicate the breadth of their AI factory, voicebot, and infrastructure solutions to enterprise clients across Latin America.",
      },
      {
        heading: "Our Approach",
        body: "We designed and developed a fully interactive website that brings Hello CIT's complex service offerings to life. The site features smooth animations, interactive service exploration sections, team member spotlights, a dynamic FAQ accordion, client testimonials, and full bilingual support (Spanish/English). Every section was crafted to guide potential enterprise clients through Hello CIT's value proposition with clarity and impact.",
      },
      {
        heading: "Key Features",
        body: "Interactive solution explorer with categorized service cards. Animated hero sections with real-time engagement hooks. Client testimonial carousel with smooth transitions. Team section with detailed bios and leadership highlights. Responsive design optimized for all devices. Blog integration for thought leadership content. Contact form with product-specific inquiry routing.",
      },
      {
        heading: "The Result",
        body: "The new hellocit.com effectively communicates Hello CIT's position as a leading technology integrator in Latin America, with clear pathways for enterprise clients to explore AI Factory solutions, digital agents, cybersecurity, and infrastructure services. The interactive design significantly improved engagement and time-on-site metrics.",
      },
    ],
  },
];
