export interface Product {
  id: string;
  titleKey: string;
  image: string;
  url: string;
  /** In-site path: rendered as a locale-aware link instead of an external one. */
  internal?: boolean;
  /** schema.org applicationCategory for the products ItemList. Defaults to DesignApplication. */
  category?: string;
}

export const products: Product[] = [
  {
    id: "startup-suite",
    titleKey: "products.startupSuite.title",
    image: "/images/products/startup-suite.svg",
    url: "/products/startup-suite",
    internal: true,
    category: "BusinessApplication",
  },
  {
    id: "product-kpis",
    titleKey: "products.kpis.title",
    image: "/images/products/product-kpis.png",
    url: "https://www.figma.com/community/plugin/1557583641770417133/product-kpis",
  },
  {
    id: "diversifyr",
    titleKey: "products.diversifyr.title",
    image: "/images/products/diversifyr.png",
    url: "https://arsonistai.gumroad.com/l/newbusinesstoolkit",
  },
  {
    id: "figma-toolkit",
    titleKey: "products.figmaToolkit.title",
    image: "/images/products/figma-toolkit.png",
    url: "https://arsonistai.gumroad.com/l/newbusinesstoolkit",
  },
];
