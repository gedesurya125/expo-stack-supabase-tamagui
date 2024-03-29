import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { XentralProductExternalReference, xentralProductId } from './types';

///products/{id}/externalReferences
export const useXentralProductExternalReference = (productId: xentralProductId) => {
  return useQuery({
    queryKey: ['xentral-product-external-reference', productId],
    queryFn: async () => await getXentralExternalProductReference(productId)
  });
};

const getXentralExternalProductReference = async (productId: xentralProductId) => {
  const products = await fetchXentral<GetXentralProductExternalReference>(
    `/products/${productId}/externalReferences`,
    true
  );
  return products || null;
};

interface GetXentralProductExternalReference {
  data: XentralProductExternalReference[];
}
