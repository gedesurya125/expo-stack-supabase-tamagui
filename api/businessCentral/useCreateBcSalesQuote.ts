import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { BcSalesQuote, CreateBcSalesOrderRequest } from './types/salesQuote';
import { QUERY_KEYS } from './context/queryKeys';
import { BcSalesQuoteResponse } from './useBcSalesQuotes';

export const useCreateBcSalesQuote = () => {
  const { token } = useBusinessCentralContext();
  const queryClient = useQueryClient();

  const createBcSalesQuote = async (newSalesOrder: CreateBcSalesOrderRequest) => {
    const data = await fetchBc<BcSalesQuote>({
      token,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSalesOrder)
      },
      endPoint: '/salesQuotes'
    });
    return data;
  };

  return useMutation({
    mutationFn: (newSalesOrder: CreateBcSalesOrderRequest) => {
      return createBcSalesQuote(newSalesOrder);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.bcSalesQuote], (oldData: BcSalesQuoteResponse) => {
        if (oldData) {
          return {
            value: [...oldData.value, data]
          };
        }
        return oldData;
      });
    }
  });
};
