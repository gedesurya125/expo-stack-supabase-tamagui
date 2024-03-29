import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { XentralExtra, XentralProductData } from './types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
};

const getProducts = async () => {
  const products = await fetchXentral<GetProductListResponse>(
    '/products?page[number]=1&page[size]=50'
  );
  return products;
};

interface GetProductListResponse {
  data: XentralProductData[];
  extra: XentralExtra;
}
