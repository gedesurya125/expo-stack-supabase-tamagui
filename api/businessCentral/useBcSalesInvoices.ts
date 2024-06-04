import { useFetchBc } from './useFetchBc';
import { SalesInvoice } from './types/salesInvoice';

export const useBcSalesInvoices = () => {
  return useFetchBc<BcSalesInvoiceResponse>({
    queryKey: ['bc-sales-invoices'],
    fetchProps: {
      endPoint: `/salesInvoices`
    }
  });
};

type BcSalesInvoiceResponse = {
  value: SalesInvoice[];
};
