import { BcSalesQuote } from './types/salesQuote';
import { useFetchBc } from './useFetchBc';

export const useBcSalesQuotes = () => {
  return useFetchBc<BcItemHookResponse>({
    queryKey: ['bc-sales-quotes'],
    fetchProps: {
      endPoint: `/salesQuotes`
    }
  });
};

type BcItemHookResponse = {
  value: BcSalesQuote[];
};
