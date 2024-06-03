import { useFetchBc } from './useFetchBc';
import { BcItem } from './types/item';

export const useBcSalesInvoices = () => {
  return useFetchBc({
    queryKey: ['bc-sales-invoices'],
    fetchProps: {
      endPoint: `/salesInvoices`
    }
  });
};

// type BcItemHookResponse = {
//   value: BcItem[];
// };
