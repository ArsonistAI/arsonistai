export interface Product {
  id: string;
  titleKey: string;
  image: string;
  url: string;
}

export const products: Product[] = [
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
