import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { weClappAPI } from './fetchWeClapp';
import { WeClappCustomer } from './types/customer';

export const useWeClapCustomers = (operation?: string) => {
  const initialPageParam = 1;
  const pageSize = 10;

  return useInfiniteQuery({
    queryKey: ['weClapp', 'customer', operation || ''],
    queryFn: ({ pageParam = initialPageParam }) =>
      getWeClappCustomers(undefined, `&page=${pageParam}&pageSize=${pageSize}${operation || ''}`),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.result?.length < pageSize) return;
      return (pages.length + 1).toString();
    },
    initialPageParam: initialPageParam.toString()
  });
};

export const useSingleCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ['weClapp', 'single-customer', customerId],
    queryFn: () => getWeClapSingleCustomer(customerId)
  });
};

const getWeClapSingleCustomer = async (customerId: string, operation?: string) => {
  const data = await weClappAPI.GET<WeClappCustomer>(
    `/customer/id/${customerId}?serializeNulls${operation || ''}`
  );
  return data;
};

const getWeClappCustomers = async (endpoint?: string, operation?: string) => {
  const data = await weClappAPI.GET<GetWeClappCustomersResponse>(
    `/customer${endpoint || ''}?serializeNulls${operation || ''}`
  );
  return data;
};

type GetWeClappCustomersResponse = {
  result: WeClappCustomer[];
};

// ? infinite scroll with useQuery https://tanstack.com/query/v4/docs/framework/react/examples/load-more-infinite-scroll
