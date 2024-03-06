import React, { Dispatch, SetStateAction } from 'react';
import {
  YStack,
  Separator,
  Theme,
  ListItem,
  Text,
  Input,
  getTokenValue,
  View,
  useTheme
} from 'tamagui';
import { CustomerFilter, CustomerOrder, getCustomers } from '~/api/xentral';
import { XentralCustomer } from '~/types';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ExistingCustomerContextProvider, useCustomerContext } from '~/context/CustomersContext';

// =========== Main COmponent ===========

export default function ExistingCustomer() {
  return (
    // <ExistingCustomerContextProvider>
    <Theme>
      <YStack flex={1} backgroundColor="$background">
        <CustomerList />
      </YStack>
    </Theme>
    // </ExistingCustomerContextProvider>
  );
}

const CustomerList = () => {
  const { customers, fetchNextPage, page } = useCustomerContext();

  // ? callback prevent re render the header
  const renderHeader = React.useCallback(() => <SearchBar />, []);

  return (
    <FlatList
      data={customers}
      renderItem={({ item }) => {
        return (
          <ListItem
            color="$color"
            backgroundColor="$background"
            flexDirection="column"
            alignItems="flex-start">
            <Text color="$color">{item.general.name}</Text>
            <Text color="$color">{item.general.email}</Text>
          </ListItem>
        );
      }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
      // ? how to make the search bar sticky, source: https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
      ListHeaderComponent={renderHeader}
      stickyHeaderIndices={[0]}
      onEndReachedThreshold={0.1}
      onEndReached={async () => {
        console.log('fetching...', page);
        await fetchNextPage();
      }}
      style={{
        flex: 1
      }}
    />
  );
};

const SearchBar = () => {
  const { setNameFilter } = useCustomerContext();

  const [value, setValue] = React.useState('');

  const theme = useTheme();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setNameFilter(value);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <View paddingTop="$4" backgroundColor="$background" paddingHorizontal="$4" paddingBottom="$2">
      <View position="relative" justifyContent="center">
        <Ionicons
          name="search-outline"
          size={20}
          color={theme.color.val}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: getTokenValue('$3', 'space')
          }}
        />
        <Input
          placeholder="search..."
          paddingLeft="$8"
          value={value}
          onChangeText={(value) => {
            setValue(value);
          }}
        />
      </View>
    </View>
  );
};
