import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { YStack, Text, ListItem, useTheme, Spinner, Separator } from 'tamagui';
import { SalesInvoice } from '~/api/businessCentral/types/salesInvoice';
import { useBcSalesInvoices } from '~/api/businessCentral/useBcSalesInvoices';
import { SelectedJsonDisplay } from '~/components/SelectedJsonDisplay';

export default function SalesInvoiceOverview() {
  const { data: salesInvoices, isLoading, error } = useBcSalesInvoices(`$filter=status eq 'Draft'`);
  // ? we also have different status of the invoice eg: Paid

  return (
    <YStack flex={1} backgroundColor="$background">
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={salesInvoices?.value}
          renderItem={({ item }) => <SalesInvoiceItem item={item} />}
          keyExtractor={(item, index) => `${item.id}`}
          ItemSeparatorComponent={Separator}
          // ? how to make the search bar sticky, source: https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
          // onEndReachedThreshold={0.1}
          // style={{
          //   flex: 1
          // }}
        />
      )}
    </YStack>
  );
}

export const SalesInvoiceItem = ({ item }: { item: SalesInvoice }) => {
  const displayedKeys = [
    'billToName',
    'id',
    'email',
    'invoiceDate',
    'status',
    'totalAmountIncludingTax',
    'customerPurchaseOrderReference',
    'customerName',
    'shopToContactName',
    'salesperson',
    'phoneNumber',
    'promisedPayDate'
  ];

  return (
    <ListItem
      color="$color"
      backgroundColor="$background"
      flexDirection="row"
      alignItems="flex-start">
      <Link
        href={{
          pathname: '/(drawer)/salesInvoice/[sales_invoice_id]',
          params: {
            sales_invoice_id: item.id
          }
        }}
        asChild>
        <Pressable style={{ flex: 1 }}>
          <SelectedJsonDisplay itemsToDisplay={item} displayedKeys={displayedKeys} />
        </Pressable>
      </Link>
    </ListItem>
  );
};
