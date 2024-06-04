import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { YStack, Text, ListItem, useTheme, Spinner, Separator } from 'tamagui';
import { BcSalesOrder } from '~/api/businessCentral/types/bcSalesOrder';
import { useBcSalesOrders } from '~/api/businessCentral/useBcSalesOrders';
import { SelectedJsonDisplay } from '~/components/SelectedJsonDisplay';

export default function SalesOrdersOverview() {
  const { data: salesOrders, isLoading, error } = useBcSalesOrders();

  return (
    <YStack flex={1} backgroundColor="$background">
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={salesOrders?.value}
          renderItem={({ item }) => <SalesOrderItem item={item} />}
          keyExtractor={(item, index) => `${index}`}
          ItemSeparatorComponent={Separator}
          // ? how to make the search bar sticky, source: https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
          onEndReachedThreshold={0.1}
          style={{
            flex: 1
          }}
        />
      )}
    </YStack>
  );
}

export const SalesOrderItem = ({ item }: { item: BcSalesOrder }) => {
  const displayedKeys = [
    'billToName',
    'id',
    'email',
    'orderDate',
    'status',
    'totalAmountIncludingTax',
    'customerName',
    'shipToContactName',
    'salesperson',
    'phoneNumber',
    'requestDeliveryDate'
  ];

  return (
    <ListItem
      color="$color"
      backgroundColor="$background"
      flexDirection="row"
      alignItems="flex-start">
      {/* <Link
        href={{
          pathname: '/(drawer)/salesQuotes/[sales_invoice_id]',
          params: {
            sales_invoice_id: item.id
          }
        }}
        asChild> */}
      <Pressable style={{ flex: 1 }}>
        <SelectedJsonDisplay itemsToDisplay={item} displayedKeys={displayedKeys} />
      </Pressable>
      {/* </Link> */}
    </ListItem>
  );
};
