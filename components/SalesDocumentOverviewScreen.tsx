import React from 'react';
import { Card, Heading, ScrollView, Spinner, Text, View, XStack, YStack } from 'tamagui';
import { useMakeInvoiceBcSalesQuote } from '~/api/businessCentral/useMakeInvoiceBcSalesQuote';
import { useMakeOrderBcSalesQuote } from '~/api/businessCentral/useMakeOrderBcSalesQuote';
import { SelectedJsonDisplay } from '~/components/SelectedJsonDisplay';
import { StyledButton } from '~/components/StyledButton';

interface SalesDocumentOverviewScreenProps {
  title: string;
  salesDocumentDisplayedKeys: string[];
  salesDocumentData: any;
  salesDocumentLinesTitle: string;
  salesDocumentLinesData?: any[];
  salesDocumentLineDisplayedKeys: string[];
  isSalesDocumentDataLoading: boolean;
  isSalesDocumentLinesDataLoading: boolean;
  emptyDocumentLinesMessage: string;
  onClickMakeInvoice?: () => void;
  onClickMakeOrder?: () => void;
  hasActionButtons?: boolean;
  actionButtons?: ActionButtonProps[];
}

export function SalesDocumentOverviewScreen({
  title,
  salesDocumentDisplayedKeys,
  salesDocumentData,
  salesDocumentLinesTitle,
  salesDocumentLinesData,
  salesDocumentLineDisplayedKeys,
  isSalesDocumentDataLoading,
  isSalesDocumentLinesDataLoading,
  emptyDocumentLinesMessage,
  onClickMakeInvoice,
  onClickMakeOrder,
  hasActionButtons,
  actionButtons
}: SalesDocumentOverviewScreenProps) {
  return (
    <YStack backgroundColor="$background" flex={1}>
      <ScrollView>
        <YStack padding="$4">
          <Heading>{title}</Heading>
          {isSalesDocumentDataLoading ? (
            <Spinner size="large" />
          ) : (
            <SelectedJsonDisplay
              itemsToDisplay={salesDocumentData}
              displayedKeys={salesDocumentDisplayedKeys}
              marginTop="$4"
            />
          )}
          <Heading marginTop="$5">{salesDocumentLinesTitle}</Heading>
          {isSalesDocumentLinesDataLoading ? (
            <Spinner size="large" />
          ) : (
            <SalesDocumentLinesList
              dataList={salesDocumentLinesData}
              salesDocumentLineDisplayedKeys={salesDocumentLineDisplayedKeys}
              emptyDocumentLinesMessage={emptyDocumentLinesMessage}
            />
          )}
          {actionButtons && actionButtons?.length > 0 && (
            <ActionButtonGroup
              salesDocumentId={salesDocumentData?.id}
              onClickMakeInvoice={onClickMakeInvoice}
              onClickMakeOrder={onClickMakeOrder}
              actionButtons={actionButtons}
            />
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const SalesDocumentLinesList = ({
  dataList,
  salesDocumentLineDisplayedKeys,
  emptyDocumentLinesMessage
}: {
  dataList?: any[];
  salesDocumentLineDisplayedKeys: string[];
  emptyDocumentLinesMessage: string;
}) => {
  const hasList = dataList && dataList?.length > 0;
  return (
    <View gap="$5" flexDirection="row" flexWrap="wrap">
      {hasList ? (
        dataList?.map((data, index) => {
          return (
            <SalesDocumentLinesListItem
              key={index}
              data={data}
              salesDocumentLineDisplayedKeys={salesDocumentLineDisplayedKeys}
            />
          );
        })
      ) : (
        <Text>{emptyDocumentLinesMessage}</Text>
      )}
    </View>
  );
};

const SalesDocumentLinesListItem = ({
  data,
  salesDocumentLineDisplayedKeys
}: {
  data: any;
  salesDocumentLineDisplayedKeys: string[];
}) => {
  return (
    <Card padding="$4" maxWidth="50%">
      <SelectedJsonDisplay itemsToDisplay={data} displayedKeys={salesDocumentLineDisplayedKeys} />
    </Card>
  );
};

// TODO: continue add more functionality make the Action button dynamic
const ActionButtonGroup = ({
  salesDocumentId,
  onClickMakeInvoice,
  onClickMakeOrder,
  actionButtons
}: {
  salesDocumentId?: string;
  onClickMakeInvoice?: () => void;
  onClickMakeOrder?: () => void;
  actionButtons?: ActionButtonProps[];
}) => {
  const makeInvoice = useMakeInvoiceBcSalesQuote();
  const makeOrder = useMakeOrderBcSalesQuote();
  return (
    <XStack marginTop="$10" justifyContent="center" gap="$5">
      {actionButtons?.map((props, index) => {
        return <ActionButton key={index} salesDocumentId={salesDocumentId} {...props} />;
      })}
      {/* <StyledButton
        colorStyle="primary"
        onPress={() => {
          if (salesDocumentId) {
            onClickMakeInvoice && onClickMakeInvoice();
          }
        }}>
        {makeInvoice?.isPending ? <Spinner size="large" /> : 'Make Invoice'}
      </StyledButton>
      <StyledButton
        colorStyle="secondary"
        onPress={() => {
          if (salesDocumentId) {
            onClickMakeOrder && onClickMakeOrder();
          }
        }}>
        {makeOrder?.isPending ? <Spinner size="large" /> : 'Make Order'}
      </StyledButton> */}
    </XStack>
  );
};

const ActionButton = ({ onPress, salesDocumentId, isPending }: ActionButtonProps) => {
  return (
    <StyledButton
      colorStyle="secondary"
      onPress={(e) => {
        if (salesDocumentId) {
          onPress && onPress(e);
        }
      }}>
      {isPending ? <Spinner size="large" /> : 'Make Order'}
    </StyledButton>
  );
};

interface ActionButtonProps extends React.ComponentProps<typeof StyledButton> {
  salesDocumentId?: string;
  isPending?: boolean;
}
