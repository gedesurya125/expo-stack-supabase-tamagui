import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { weClappAPI } from './fetchWeClapp';
import { WeClappCustomer } from './types/customer';

export const useWeClapCustomers = (operation?: string) => {
  // return useQuery({
  //   queryKey: ['weClapp', 'customers', operation],
  //   queryFn: () => getWeClappCustomers(operation)
  // });
  const initialPageParam = 1;
  const pageSize = 10;

  return useInfiniteQuery({
    queryKey: ['weClapp', 'customer', operation || ''],
    queryFn: ({ pageParam = initialPageParam }) =>
      getWeClappCustomers(`&page=${pageParam}&pageSize=${pageSize}${operation || ''}`),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.result?.length < pageSize) return;
      return (pages.length + 1).toString();
    },
    initialPageParam: initialPageParam.toString()
  });
};

const getWeClappCustomers = async (operation?: string) => {
  const data = await weClappAPI.GET<GetWeClappCustomersResponse>(
    `/customer?serializeNulls${operation || ''}`
  );
  return data;
};

type GetWeClappCustomersResponse = {
  result: WeClappCustomer[];
};

// ? infinite scroll with useQuery https://tanstack.com/query/v4/docs/framework/react/examples/load-more-infinite-scroll
