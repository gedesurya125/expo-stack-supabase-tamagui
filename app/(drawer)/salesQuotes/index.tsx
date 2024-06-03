import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { YStack, Text, ListItem, useTheme, Spinner, Separator } from 'tamagui';
import { BcSalesQuote } from '~/api/businessCentral/types/salesQuote';
import { useBcSalesQuotes } from '~/api/businessCentral/useBcSalesQuotes';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

export default function TabOneScreen() {
  const { data: salesQuotes, isLoading, error } = useBcSalesQuotes();

  console.log('this i the sales quotes', salesQuotes);

  return (
    <YStack flex={1} backgroundColor="$background">
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={salesQuotes?.value}
          renderItem={({ item }) => <CustomerItem item={item} />}
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

export const CustomerItem = ({ item }: { item: BcSalesQuote }) => {
  const navigation = useNavigation();
  const { handleSetCustomerInfo } = useSelectedCustomerContext();

  const itemToDisplay = ['id', 'dueDate', 'status', 'totalAmountIncludingTax'];

  return (
    <ListItem
      color="$color"
      backgroundColor="$background"
      flexDirection="row"
      alignItems="flex-start">
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          handleSetCustomerInfo(item);
          navigation.navigate('catalogue' as never);
        }}>
        <YStack flex={1}>
          {itemToDisplay.map((data, index) => {
            return (
              <Text color="$color" key={index}>
                {data}: {item[data as keyof BcSalesQuote]}
              </Text>
            );
          })}
        </YStack>
      </Pressable>
    </ListItem>
  );
};
