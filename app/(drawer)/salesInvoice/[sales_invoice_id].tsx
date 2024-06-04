import { useLocalSearchParams } from 'expo-router';
import { useBcSingleSalesInvoiceLines } from '~/api/businessCentral/useBcSingleSalesInvoiceLine';
import { useBcSingleSalesInvoice } from '~/api/businessCentral/useBcSingleSalesInvoices';
import { SalesDocumentOverviewScreen } from '~/components/SalesDocumentOverviewScreen';

export default function SalesQuoteDetailPage() {
  const params = useLocalSearchParams();
  const salesInvoiceId = params?.sales_invoice_id as string;
  const { data, isLoading } = useBcSingleSalesInvoice(salesInvoiceId);
  const { data: salesInvoice, isLoading: isSalesQuoteLinesLoading } =
    useBcSingleSalesInvoiceLines(salesInvoiceId);

  return (
    <SalesDocumentOverviewScreen
      title="Sales Invoice Detail"
      salesDocumentDisplayedKeys={[
        'id',
        'number',
        'invoiceDate',
        'dueData',
        'customerName',
        'billToName',
        'shipToName',
        'email',
        'totalAmountIncludingTax'
      ]}
      salesDocumentData={data}
      salesDocumentLinesTitle="Sales Invoice Lines:"
      salesDocumentLinesData={salesInvoice?.value}
      salesDocumentLineDisplayedKeys={[
        'itemId',
        'lineType',
        'description',
        'unitPrice',
        'quantity',
        'taxPercent',
        'taxCode',
        'amountIncludingTax',
        'netAmount',
        'netTaxAmount'
      ]}
      isSalesDocumentDataLoading={isLoading}
      isSalesDocumentLinesDataLoading={isSalesQuoteLinesLoading}
      emptyDocumentLinesMessage="Invoice Lines is empty"
    />
  );
}
