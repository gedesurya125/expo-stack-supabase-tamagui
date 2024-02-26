import React, { Dispatch, SetStateAction, useCallback } from 'react';
import {
  YStack,
  H2,
  Separator,
  Theme,
  ListItem,
  Text,
  Input,
  getTokenValue,
  View,
  Button,
  useTheme,
} from 'tamagui';
import { styled } from '@tamagui/core';
import { getCustomers } from '~/api/xentral';
import { XentralCustomer } from '~/types';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

type CustomersContextValue = {
  customers: XentralCustomer[];
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  setCustomers: Dispatch<SetStateAction<XentralCustomer[]>>;
};

const CustomerContext = React.createContext<CustomersContextValue>({
  customers: [],
  nameFilter: '',
  setNameFilter: () => null,
  setCustomers: () => null,
});

const ExistingCustomerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = React.useState<XentralCustomer[]>([]);
  const [nameFilter, setNameFilter] = React.useState('');

  return (
    <CustomerContext.Provider
      value={{
        customers,
        nameFilter,
        setCustomers,
        setNameFilter,
      }}>
      {children}
    </CustomerContext.Provider>
  );
};

const useCustomerContext = () => React.useContext(CustomerContext);
// ===========

export default function ExistingCustomer() {
  return (
    <ExistingCustomerContextProvider>
      <Theme>
        <YStack flex={1} backgroundColor="$background">
          <CustomerList />
        </YStack>
      </Theme>
    </ExistingCustomerContextProvider>
  );
}

const CustomerList = () => {
  const { nameFilter, setCustomers, customers } = useCustomerContext();

  React.useEffect(() => {
    const fetchCustomer = async () => {
      const newCustomer = await getCustomers({
        pageNumber: 1,
        pageSize: 20,
        filter: {
          key: 'name',
          op: 'contains',
          value: nameFilter,
        },
      });
      setCustomers(newCustomer?.data);
    };

    fetchCustomer();
  }, [nameFilter]);

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
      style={{}}
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
            left: getTokenValue('$3', 'space'),
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
