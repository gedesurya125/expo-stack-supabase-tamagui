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
  useTheme,
} from 'tamagui';
import { CustomerFilter, CustomerOrder, getCustomers } from '~/api/xentral';
import { XentralCustomer } from '~/types';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

type CustomersContextValue = {
  customers: XentralCustomer[];
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  setCustomers: Dispatch<SetStateAction<XentralCustomer[]>>;
  fetchNextPage: () => Promise<void>;
  page: number;
};

const CustomerContext = React.createContext<CustomersContextValue>({
  customers: [],
  nameFilter: '',
  setNameFilter: () => null,
  setCustomers: () => null,
  fetchNextPage: async () => {},
  page: 0,
});

const PAGE_SIZE = 14;

const ExistingCustomerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = React.useState<XentralCustomer[]>([]);
  const [nameFilter, setNameFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [isLast, setIsLast] = React.useState(false);

  const filterValue: CustomerFilter = {
    key: 'name',
    op: 'contains',
    value: nameFilter,
  };

  const orderValue: CustomerOrder = {
    field: 'name',
    direction: 'asc',
  };

  // ? reset the page to 1 when name filter change
  React.useEffect(() => {
    if (!isLast) {
      const fetchCustomer = async () => {
        const newCustomer = await getCustomers({
          pageNumber: 1,
          pageSize: PAGE_SIZE,
          filter: filterValue,
          order: orderValue,
        });
        setCustomers(newCustomer?.data);

        if (newCustomer?.data?.length && newCustomer?.data?.length < PAGE_SIZE) {
          console.log('from effect true');
          setIsLast(true);
        } else {
          console.log('from effect false');
          setIsLast(false);
        }
        setPage(1);
      };

      fetchCustomer();
    }
  }, [nameFilter]);

  const fetchNextPage = async () => {
    if (isLast || page === 0) return;
    const nextPageCustomers = await getCustomers({
      pageNumber: page + 1,
      pageSize: PAGE_SIZE,
      filter: filterValue,
      order: orderValue,
    });
    // if (nextPageCustomers?.data?.length > 0) {
    setCustomers((state) => [...state, ...nextPageCustomers?.data]);
    setPage((state) => state + 1);
    // }
    if (nextPageCustomers?.data?.length && nextPageCustomers?.data?.length < PAGE_SIZE) {
      console.log('from trigger true');

      setIsLast(true);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        nameFilter,
        setCustomers,
        setNameFilter,
        fetchNextPage,
        page,
      }}>
      {children}
    </CustomerContext.Provider>
  );
};

const useCustomerContext = () => React.useContext(CustomerContext);

// =========== Main COmponent ===========

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
        flex: 1,
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
