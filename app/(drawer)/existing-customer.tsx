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
  XStack,
  Button
} from 'tamagui';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useCustomerContext } from '~/context/CustomersContext';
import { StyledButton } from '~/components/StyledButton';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';

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
  const { customers, fetchNextPage, page } = useCustomerContext();

  // ? callback prevent re render the header
  const renderHeader = React.useCallback(() => <SearchBar />, []);

  return (
    <FlatList
      data={customers}
      renderItem={({ item }) => <CustomerItem item={item} />}
      keyExtractor={(item, index) => `${index}`}
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

export const CustomerItem = ({ item }: { item: any }) => {
  const theme = useTheme();

  return (
    <ListItem
      color="$color"
      backgroundColor="$background"
      flexDirection="row"
      alignItems="flex-start">
      <YStack flex={1}>
        <Text color="$color">{item.general.name}</Text>
        <Text color="$color" mt="$2">
          {item.general.email}
        </Text>
      </YStack>
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

const SearchBar = () => {
  const { setNameFilter } = useCustomerContext();

  const [value, setValue] = React.useState('');

  // const theme = useTheme();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setNameFilter(value);
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
          value={currentValue}
          onChangeText={(value) => {
            setValue(value);
          }}
        />
      </View>
    </View>
  );
};
