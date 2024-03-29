import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { XentralProjectId, XentralExtra, XentralProductData } from './types';

export const useProductsByProject = (projectId: XentralProjectId) => {
  return useQuery({
    queryKey: ['products', projectId],
    queryFn: async () => await getProducts({ projectId })
  });
};

const getProducts = async ({ projectId }: { projectId: XentralProjectId }) => {
  const products = await fetchXentral<GetProductListResponse>(
    `/products?filter[0][key]=project&filter[0][op]=equals&filter[0][value]=${projectId}`
  );
  return products;
};

interface GetProductListResponse {
  data: XentralProductData[];
  extra: XentralExtra;
}
