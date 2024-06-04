import { useLocalSearchParams } from 'expo-router';
import { Card, Heading, ScrollView, Spinner, Text, View, XStack, YStack } from 'tamagui';
import { BcSalesQuoteLine } from '~/api/businessCentral/types/salesQuoteLine';
import { useBcSingleSalesQuote } from '~/api/businessCentral/useBcSingleSalesQuote';
import { useBcSingleSalesQuoteLine } from '~/api/businessCentral/useBcSingleSalesQuoteLines';
import { useMakeInvoiceBcSalesQuote } from '~/api/businessCentral/useMakeInvoiceBcSalesQuote';
import { useMakeOrderBcSalesQuote } from '~/api/businessCentral/useMakeOrderBcSalesQuote';
import { SelectedJsonDisplay } from '~/components/SelectedJsonDisplay';
import { StyledButton } from '~/components/StyledButton';

export default function SalesQuoteDetailPage() {
  const params = useLocalSearchParams();
  const salesQuoteId = params?.sales_quote_id as string;
  const { data, isLoading, error } = useBcSingleSalesQuote(salesQuoteId);
  const { data: salesQuoteLines, isLoading: isSalesQuoteLinesLoading } =
    useBcSingleSalesQuoteLine(salesQuoteId);

  return (
    <YStack backgroundColor="$background" flex={1}>
      <ScrollView>
        <YStack padding="$4">
          <Heading>Sales Quote detail</Heading>
          {isLoading ? (
            <Spinner size="large" />
          ) : (
            <SelectedJsonDisplay
              itemsToDisplay={data}
              displayedKeys={[
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
              marginTop="$4"
            />
          )}
          <Heading marginTop="$5">Sales Quote Lines:</Heading>
          {isSalesQuoteLinesLoading ? (
            <Spinner size="large" />
          ) : (
            <SalesQuoteLineList dataList={salesQuoteLines?.value} />
          )}
          <ActionButtonGroup salesQuoteId={data?.id} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const SalesQuoteLineList = ({ dataList }: { dataList?: BcSalesQuoteLine[] }) => {
  const hasList = dataList && dataList?.length > 0;
  return (
    <View gap="$5" flexDirection="row" flexWrap="wrap">
      {hasList ? (
        dataList?.map((data, index) => {
          return <SalesQuoteLineListItem key={index} data={data} />;
        })
      ) : (
        <Text>Quote Lines is empty</Text>
      )}
    </View>
  );
};

const SalesQuoteLineListItem = ({ data }: { data: BcSalesQuoteLine }) => {
  return (
    <Card padding="$4" maxWidth="50%">
      <SelectedJsonDisplay
        itemsToDisplay={data}
        displayedKeys={[
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
      />
    </Card>
  );
};

const ActionButtonGroup = ({ salesQuoteId }: { salesQuoteId?: string }) => {
  const makeInvoice = useMakeInvoiceBcSalesQuote();
  const makeOrder = useMakeOrderBcSalesQuote();
  return (
    <XStack marginTop="$10" justifyContent="center" gap="$5">
      <StyledButton
        colorStyle="primary"
        onPress={() => {
          if (salesQuoteId) {
            makeInvoice.mutate({
              salesQuoteId
            });
          }
        }}>
        {makeInvoice?.isPending ? <Spinner size="large" /> : 'Make Invoice'}
      </StyledButton>
      <StyledButton
        colorStyle="secondary"
        onPress={() => {
          if (salesQuoteId) {
            makeOrder.mutate({
              salesQuoteId
            });
          }
        }}>
        {makeOrder?.isPending ? <Spinner size="large" /> : 'Make Order'}
      </StyledButton>
    </XStack>
  );
};
