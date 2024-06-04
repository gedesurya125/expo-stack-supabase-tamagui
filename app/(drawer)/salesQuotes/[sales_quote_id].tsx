import { useLocalSearchParams } from 'expo-router';
import { Card, Heading, ScrollView, Spinner, Text, View, YStack } from 'tamagui';
import { BcSalesQuoteLine } from '~/api/businessCentral/types/salesQuoteLine';
import { useBcSingleSalesQuote } from '~/api/businessCentral/useBcSingleSalesQuote';
import { useBcSingleSalesQuoteLine } from '~/api/businessCentral/useBcSingleSalesQuoteLines';
import { SelectedJsonDisplay } from '~/components/SelectedJsonDisplay';

export default function SalesQuoteDetailPage() {
  const params = useLocalSearchParams();
  const salesQuoteId = params?.sales_quote_id as string;
  const { data, isLoading, error } = useBcSingleSalesQuote(salesQuoteId);
  const { data: salesQuoteLines, isLoading: isSalesQuoteLinesLoading } =
    useBcSingleSalesQuoteLine(salesQuoteId);

  console.log('this is the single sales quote', { salesQuoteLines });

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
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const SalesQuoteLineList = ({ dataList }: { dataList?: BcSalesQuoteLine[] }) => {
  console.log('this is the data list', dataList);
  const hasList = dataList && dataList?.length > 0;
  return (
    <View gap="$5">
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
