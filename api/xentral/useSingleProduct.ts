import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { XentralProductData } from './types';

export const useSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getSingleProduct(id)
  });
};

const getSingleProduct = async (id: string) => {
  const singleProduct = await fetchXentral<GetProductListResponse>(`/products/${id}`);
  return singleProduct;
};

interface GetProductListResponse {
  data: XentralProductData;
}
