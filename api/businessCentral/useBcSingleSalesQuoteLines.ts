import { BcSalesQuoteLine } from './types/salesQuoteLine';
import { useFetchBc } from './useFetchBc';

export const useBcSingleSalesQuoteLine = (salesQuoteId: string) => {
  return useFetchBc<BcSingleSalesQuoteLinesResponse>({
    queryKey: ['bc-sales-quote-detail-lines', salesQuoteId],
    fetchProps: {
      endPoint: `/salesQuotes(${salesQuoteId})/salesQuoteLines`
    }
  });
};

export type BcSingleSalesQuoteLinesResponse = {
  value: BcSalesQuoteLine[];
};
