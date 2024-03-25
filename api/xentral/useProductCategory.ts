import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';

export const useProductCategories = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductsCategory
  });
};

const getProductsCategory = async () => {
  const productCategories = await fetchXentral('/productsCategories');
  return productCategories;
};
