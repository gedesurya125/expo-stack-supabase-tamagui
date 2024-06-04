import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { YStack, Text, ListItem, useTheme, Spinner, Separator } from 'tamagui';
import { BcSalesQuote } from '~/api/businessCentral/types/salesQuote';
import { useBcSalesQuotes } from '~/api/businessCentral/useBcSalesQuotes';
import { SelectedJsonDisplay } from '~/components/SelectedJsonDisplay';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

export default function TabOneScreen() {
  const { data: salesQuotes, isLoading, error } = useBcSalesQuotes();

  return (
    <YStack flex={1} backgroundColor="$background">
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={salesQuotes?.value}
          renderItem={({ item }) => <SalesQuoteItem item={item} />}
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

export const SalesQuoteItem = ({ item }: { item: BcSalesQuote }) => {
  const displayedKeys = [
    'billToName',
    'id',
    'email',
    'dueDate',
    'status',
    'totalAmountIncludingTax',
    'documentDate'
  ];

  return (
    <ListItem
      color="$color"
      backgroundColor="$background"
      flexDirection="row"
      alignItems="flex-start">
      <Link
        href={{
          pathname: '/(drawer)/salesQuotes/[sales_quote_id]',
          params: {
            sales_quote_id: item.id
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
