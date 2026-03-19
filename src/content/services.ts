export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  longDescriptionKey: string;
  icon: string;
  image: string;
  /** Optional section key for grouping (e.g. "applicationServices"). Services with the same key are grouped under one subsection heading. */
  sectionKey?: string;
}

export const services: Service[] = [
  {
    id: "content-generation",
    titleKey: "services.contentGeneration.title",
    descriptionKey: "services.contentGeneration.short",
    longDescriptionKey: "services.contentGeneration.long",
    icon: "sparkles",
    image: "/images/services/content_service.png",
  },
  {
    id: "concept-visualization",
    titleKey: "services.conceptVisualization.title",
    descriptionKey: "services.conceptVisualization.short",
    longDescriptionKey: "services.conceptVisualization.long",
    icon: "eye",
    image: "/images/services/car_service.png",
  },
  {
    id: "exploration-scaling",
    titleKey: "services.explorationScaling.title",
    descriptionKey: "services.explorationScaling.short",
    longDescriptionKey: "services.explorationScaling.long",
    icon: "layers",
    image: "/images/services/fisheye.png",
  },
  {
    id: "experience-optimization",
    titleKey: "services.experienceOptimization.title",
    descriptionKey: "services.experienceOptimization.short",
    longDescriptionKey: "services.experienceOptimization.long",
    icon: "gauge",
    image: "/images/services/phone.png",
  },
  {
    id: "product-design",
    titleKey: "services.productDesign.title",
    descriptionKey: "services.productDesign.short",
    longDescriptionKey: "services.productDesign.long",
    icon: "pen-tool",
    image: "/images/services/product.png",
  },
  {
    id: "operations-consulting",
    titleKey: "services.operationsConsulting.title",
    descriptionKey: "services.operationsConsulting.short",
    longDescriptionKey: "services.operationsConsulting.long",
    icon: "settings",
    image: "/images/services/factory.png",
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
];
