import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { XentralExtra, XentralProductSalesPrice, xentralProductId } from './types';

export const useSingleProductSalesPrice = ({ productId }: { productId: xentralProductId }) => {
  return useQuery({
    queryKey: ['products', 'sales-price', productId],
    queryFn: () => getSingleProductSalesPrice({ productId })
  });
};

const getSingleProductSalesPrice = async ({ productId }: { productId: xentralProductId }) => {
  const productSalesPrice = await fetchXentral<GetProductListResponse>(
    `/products/${productId}/salesPrices`
  );
  return productSalesPrice;
};

interface GetProductListResponse {
  data: XentralProductSalesPrice[];
  extra: XentralExtra;
}
