export type ShopifyProductNumber = string;

export interface ShopifyProduct {
  availableForSale: boolean;
  collections: { nodes: any[] };
  createdAt: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImageData;
  handle: string;
  id: string;
  images: { nodes: ShopifyImageData[] };
  isGiftCard: boolean;
  options: {
    name: string;
    values: string[];
  }[];
  priceRange: { maxVariantPrice: ShopifyPrice; minVariantPrice: ShopifyPrice };
  productType: string;
  publishedAt: string;
  requiresSellingPlan: boolean;
  seo: { title: string; description: string };
  tags: string[];
  title: string;
  updatedAt: string;
  variants: { nodes: ShopifyProductVariant[] };
  // vendor: "gedesurya125"
}

export type ShopifyImageData = {
  altText: string;
  height: number;
  width: number;
  url: string;
};

export type ShopifyPrice = {
  amount: string;
  currency: string;
};

export type ShopifyProductVariant = {
  availableForSale: boolean;
  id: string;
  image: ShopifyImageData;
  price: ShopifyPrice;
  quantityAvailable: number;
  selectedOptions: { name: string; value: string }[];
  sku: string;
  title: string;
  unitPrice: null | string;
  unitPriceMeasurement: { referenceUnit: null | string; referenceValue: number };
  weight: number;
  weightUnit: string;
};
