export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  longDescriptionKey: string;
  icon: string;
  image: string;
  /** Optional section key for grouping (e.g. "applicationServices"). Services with the same key are grouped under one subsection heading. */
  sectionKey?: string;
  /** Last substantive copy change (YYYY-MM-DD), used by the sitemap. Defaults to the date the service pages launched. */
  lastModified?: string;
}

export const services: Service[] = [
  {
    id: "experience-optimization",
    titleKey: "services.experienceOptimization.title",
    descriptionKey: "services.experienceOptimization.short",
    longDescriptionKey: "services.experienceOptimization.long",
    icon: "gauge",
    image: "/images/services/phone.png",
  },
  {
    id: "operations-consulting",
    titleKey: "services.operationsConsulting.title",
    descriptionKey: "services.operationsConsulting.short",
    longDescriptionKey: "services.operationsConsulting.long",
    icon: "settings",
    image: "/images/services/factory.png",
  },
  {
    id: "custom-mcp-servers",
    titleKey: "services.customMcpServers.title",
    descriptionKey: "services.customMcpServers.short",
    longDescriptionKey: "services.customMcpServers.long",
    icon: "plug",
    image: "/images/services/fisheye.png",
    lastModified: "2026-10-14",
  },
  // Application services subsection
  {
    id: "openclaw-installation",
    titleKey: "services.openclawInstallation.title",
    descriptionKey: "services.openclawInstallation.short",
    longDescriptionKey: "services.openclawInstallation.long",
    icon: "wrench",
    image: "/images/services/product.png",
    sectionKey: "applicationServices",
  },
  {
    id: "claude-cursor-training",
    titleKey: "services.claudeCursorTraining.title",
    descriptionKey: "services.claudeCursorTraining.short",
    longDescriptionKey: "services.claudeCursorTraining.long",
    icon: "code",
    image: "/images/services/factory.png",
    sectionKey: "applicationServices",
  },
  {
    id: "chatbot-audit",
    titleKey: "services.chatbotAudit.title",
    descriptionKey: "services.chatbotAudit.short",
    longDescriptionKey: "services.chatbotAudit.long",
    icon: "chat",
    image: "/images/services/phone.png",
    sectionKey: "applicationServices",
  },
  {
    id: "voice-agent-design",
    titleKey: "services.voiceAgentDesign.title",
    descriptionKey: "services.voiceAgentDesign.short",
    longDescriptionKey: "services.voiceAgentDesign.long",
    icon: "chat",
    image: "/images/services/phone.png",
    sectionKey: "applicationServices",
  },  {
    id: "ai-workflow-automation",
    titleKey: "services.aiWorkflowAutomation.title",
    descriptionKey: "services.aiWorkflowAutomation.short",
    longDescriptionKey: "services.aiWorkflowAutomation.long",
    icon: "settings",
    image: "/images/services/factory.png",
    sectionKey: "applicationServices",
  },
  {
    id: "llm-cost-optimization",
    titleKey: "services.llmCostOptimization.title",
    descriptionKey: "services.llmCostOptimization.short",
    longDescriptionKey: "services.llmCostOptimization.long",
    icon: "gauge",
    image: "/images/services/content_service.png",
    sectionKey: "applicationServices",
  },
];

/**
 * Message namespace for a service, derived from its titleKey.
 * "services.chatbotAudit.title" -> "services.chatbotAudit"
 */
export function serviceMessageKey(service: Service): string {
  return service.titleKey.split(".").slice(0, 2).join(".");
}
