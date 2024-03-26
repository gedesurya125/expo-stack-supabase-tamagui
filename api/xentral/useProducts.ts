import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
};

const getProducts = async () => {
  const products = await fetchXentral<GetProductListResponse>('/products');
  return products;
};

type xentralPrice = {
  currency: string;
  amount: string;
};

export interface XentralProductData {
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
}

interface XentralExtra {
  page: { number: number; size: number };
  totalCount: number;
}

interface GetProductListResponse {
  data: XentralProductData[];
  extra: XentralExtra;
}
