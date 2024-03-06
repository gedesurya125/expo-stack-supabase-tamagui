import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';

export const getCustomerById = async (id: string | number) => {
  const data = await fetchXentral(`/customers/${id}`);
  return data;
};

export const useCustomer = (id: string | number) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomerById(id),
    enabled: !!id
  });
};
