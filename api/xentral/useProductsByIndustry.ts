import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { IndustryType, XentralExtra, XentralProductData } from './types';

export const useProductsByIndustry = (industryType: IndustryType) => {
  return useQuery({
    queryKey: ['products', industryType],
    queryFn: async () => await getProducts({ industryType })
  });
};

const getProducts = async ({ industryType }: { industryType: IndustryType }) => {
  const products = await fetchXentral<GetProductListResponse>(
    `/products?page[number]=1&page[size]=50&filter[0][key]=freeField15&filter[0][op]=equals&filter[0][value]=${industryType}`
  );
  return products;
};

interface GetProductListResponse {
  data: XentralProductData[];
  extra: XentralExtra;
}
