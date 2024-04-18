import React from 'react';
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
  Spinner
} from 'tamagui';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';
import { useWeClapCustomers } from '~/api/weClapp';
import { WeClappCustomer } from '~/api/weClapp/types/customer';

// =========== Main COmponent ===========

export default function ExistingCustomer() {
  return (
    <Theme>
      <YStack flex={1} backgroundColor="$background">
        <CustomerList />
      </YStack>
    </Theme>
  );
}

const CustomerList = () => {
  const [searchInput, setSearchInput] = React.useState('');

  const searchQuery = searchInput ? `&company-ilike=%${searchInput}%` : '';

  const {
    data,
    fetchNextPage: fetchNextWeClappCustomers,
    isLoading
  } = useWeClapCustomers(searchQuery);

  // ? callback prevent re render the header
  // const renderHeader = React.useCallback(() => <SearchBar setSearch={setSearchInput} />, []);

  const dataToDisplay = data?.pages?.reduce<WeClappCustomer[]>((acc, cur) => {
    return [...acc, ...cur?.result];
  }, []);

  return (
    <>
      <SearchBar setSearch={setSearchInput} />
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={dataToDisplay}
          renderItem={({ item }) => <CustomerItem item={item} />}
          keyExtractor={(item, index) => `${index}`}
          ItemSeparatorComponent={Separator}
          // ? how to make the search bar sticky, source: https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
          // ListHeaderComponent={renderHeader}
          // stickyHeaderIndices={[0]}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            fetchNextWeClappCustomers();
          }}
          style={{
            flex: 1
          }}
        />
      )}
    </>
  );
};

export const CustomerItem = ({ item }: { item: WeClappCustomer }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { handleSetCustomerInfo } = useSelectedCustomerContext();

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
          <Text color="$color">{item.company}</Text>
          <Text color="$color" mt="$2">
            {item.email}
          </Text>
        </YStack>
      </Pressable>
      <Link
        href={{
          pathname: '/customer-detail-modal',
          params: {
            id: item.id
          }
        }}
        asChild>
        <Pressable>
          <Ionicons name="information-circle-outline" size={25} color={theme.blue10.val} />
        </Pressable>
      </Link>
    </ListItem>
  );
};

const SearchBar = ({ setSearch }: { setSearch: any }) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(value);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return <ListSearchBar currentValue={value} setValue={setValue} />;
};

export const ListSearchBar = ({
  currentValue,
  setValue
}: {
  currentValue: any;
  setValue: (value: any) => any;
}) => {
  const theme = useTheme();

  return (
    <View paddingTop="$4" backgroundColor="$background" paddingHorizontal="$4" paddingBottom="$4">
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
          value={currentValue}
          onChangeText={(value) => {
            setValue(value);
          }}
        />
      </View>
    </View>
  );
};
