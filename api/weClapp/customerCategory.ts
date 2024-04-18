import { useQuery } from '@tanstack/react-query';
import { weClappAPI } from './fetchWeClapp';
import { CustomerCategoryType } from './types/customerCategory';

export const useCustomerCategory = () => {
  return useQuery({
    queryKey: ['weClap', 'customer-categories'],
    queryFn: () => getCustomerCategory()
  });
};

const getCustomerCategory = async (props?: { endpoint?: string; operation?: string }) => {
  const data = await weClappAPI.GET<GetCustomerCategoriesResponse>(
    `/customerCategory${props?.endpoint || ''}?serializeNulls${props?.operation || ''}`
  );
  return data;
};

type GetCustomerCategoriesResponse = {
  result: CustomerCategoryType[];
};
