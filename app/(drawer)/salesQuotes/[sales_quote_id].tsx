import { useLocalSearchParams } from 'expo-router';
import { useBcSingleSalesQuote } from '~/api/businessCentral/useBcSingleSalesQuote';
import { useBcSingleSalesQuoteLine } from '~/api/businessCentral/useBcSingleSalesQuoteLines';
import { useMakeInvoiceBcSalesQuote } from '~/api/businessCentral/useMakeInvoiceBcSalesQuote';
import { useMakeOrderBcSalesQuote } from '~/api/businessCentral/useMakeOrderBcSalesQuote';
import { SalesDocumentOverviewScreen } from '~/components/SalesDocumentOverviewScreen';

export default function SalesQuoteDetailPage() {
  const params = useLocalSearchParams();
  const salesQuoteId = params?.sales_quote_id as string;
  const { data, isLoading } = useBcSingleSalesQuote(salesQuoteId);
  const { data: salesQuoteLines, isLoading: isSalesQuoteLinesLoading } =
    useBcSingleSalesQuoteLine(salesQuoteId);

  const makeInvoice = useMakeInvoiceBcSalesQuote();
  const makeOrder = useMakeOrderBcSalesQuote();

  return (
    <SalesDocumentOverviewScreen
      title="Sales Quote Detail"
      salesDocumentDisplayedKeys={[
        'id',
        'number',
        'documentDate',
        'dueData',
        'customerName',
        'billToName',
        'shipToName',
        'email',
        'totalAmountIncludingTax'
      ]}
      salesDocumentData={data}
      salesDocumentLinesTitle="Sales Quote Lines:"
      salesDocumentLinesData={salesQuoteLines?.value}
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
        'netTaxAmount',
        'nextIncludingTax'
      ]}
      isSalesDocumentDataLoading={isLoading}
      isSalesDocumentLinesDataLoading={isSalesQuoteLinesLoading}
      emptyDocumentLinesMessage="Quote Lines is empty"
      onClickMakeInvoice={() => {
        makeInvoice.mutate({
          salesQuoteId
        });
      }}
      onClickMakeOrder={() => {
        makeOrder.mutate({
          salesQuoteId
        });
      }}
      hasActionButtons
    />
  );
}
