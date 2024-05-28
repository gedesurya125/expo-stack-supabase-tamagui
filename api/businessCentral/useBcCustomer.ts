import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBc, useFetchBc } from './fetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';

export const useBcCustomers = () => {
  return useFetchBc<CustomerFetchResponse>({
    queryKey: ['bc-customers'],
    fetchProps: {
      endPoint: `/companies(${process.env.EXPO_PUBLIC_BC_COMPANY_ID})/customers`
    }
  });
};

export const usePaginatedBcCustomers = (operation?: string) => {
  const { token } = useBusinessCentralContext();

  const initialPage = 1;
  const pageSize = 10;

  return useInfiniteQuery({
    queryKey: ['bc', 'customers', operation || ''],
    queryFn: ({ pageParam = initialPage }) =>
      fetchBc<CustomerFetchResponse>({
        token,
        endPoint: `/companies(${process.env.EXPO_PUBLIC_BC_COMPANY_ID})/customers?$top=${pageSize}&$skip=${(Number(pageParam) - 1) * pageSize}${operation || ''}`
      }),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage?.value?.length < pageSize) return;
      return (pages.length + 1).toString();
    },
    initialPageParam: initialPage.toString()
  });
};

interface CustomerFetchResponse {
  value: BcCustomer[];
}

export type BcCustomer = {
  addressLine1: string;
  addressLine2: string;
  balanceDue: number;
  blocked: string;
  city: string;
  country: string;
  creditLimit: number;
  currencyCode: string;
  currencyId: string;
  displayName: string;
  email: string;
  id: string;
  lastModifiedDateTime: string;
  number: string;
  paymentMethodId: string;
  paymentTermsId: string;
  phoneNumber: string;
  postalCode: string;
  salespersonCode: string;
  shipmentMethodId: string;
  state: string;
  taxAreaDisplayName: string;
  taxAreaId: string;
  taxLiable: boolean;
  taxRegistrationNumber: string;
  type: string;
  website: string;
};
