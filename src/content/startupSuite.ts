/**
 * The parts of Startup Suite a buyer can pick from. Ordered by what a company
 * reaches for first (people, documentation, website, then the rest).
 * Copy lives in messages/*.json under products.startupSuite.items.<messageKey>.
 */
export interface SuitePart {
  id: string;
  messageKey: string;
}

export const suiteParts: SuitePart[] = [
  { id: "ats", messageKey: "ats" },
  { id: "docs-site", messageKey: "docsSite" },
  { id: "marketing-site", messageKey: "marketingSite" },
  { id: "booking-site", messageKey: "bookingSite" },
  { id: "training", messageKey: "training" },
  { id: "brand-portal", messageKey: "brandPortal" },
  { id: "chatbot-grader", messageKey: "chatbotGrader" },
];

export const STARTUP_SUITE_PATH = "/products/startup-suite";
