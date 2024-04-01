type xentralPrice = {
  currency: string;
  amount: string;
};

// TODO: complete the xentral product data type if needed
export interface XentralProductData {
  id: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  freeFields: { id: string; name: string; value: string }[];
  name: string;
  number: string;
  project: { id: string; name: string };
  purchasePriceGross: xentralPrice;
  purchasePriceNet: xentralPrice;
  salesPriceGross: xentralPrice;
  salesPriceNet: xentralPrice;
  thumbnailUrl: string;
  stockCount: number;
  uuid: string;
  variants: VariantPropertyOfXentralProductData[];
}

export interface VariantPropertyOfXentralProductData {
  id: string;
  options: {
    id: string;
  }[];
}

export interface XentralExtra {
  page: { number: number; size: number };
  totalCount: number;
}

export interface XentralProductExternalReference {
  id: string;
  name: string;
  number: string;
  isActive: boolean;
  isScannable: boolean;
  target: {
    id: string;
    name: string;
  };
}

export type xentralProductId = string;

export type IndustryType = 'clothing-industry' | 'paint' | 'sticker' | 'other';

export type XentralProjectId = string;

export type XentralProjectData = {
  id: string;
  name: string;
  keyName: string;
  description: string;
  currency: string;
  normalTaxRate: number;
  reducedTaxRate: number;
  storageProcess: string;
  pickingProcess: string;
};
