import React from 'react';
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

export default function TabTwoScreen() {
  const [customers, setCustomer] = React.useState<XentralCustomer[]>([]);

  React.useEffect(() => {
    const fetchCustomer = async () => {
      const newCustomer = await getCustomers({ pageNumber: 1, pageSize: 20 });
      setCustomer(newCustomer?.data);
    };

    fetchCustomer();
  }, []);

  return (
    <Theme>
      <YStack flex={1} backgroundColor="$background">
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
          ListHeaderComponent={SearchBar}
          stickyHeaderIndices={[0]}
          style={{}}
        />
      </YStack>
    </Theme>
  );
}

const SearchBar = () => {
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
            left: getTokenValue('$3', 'space'),
          }}
        />
        <Input placeholder="search..." paddingLeft="$8" />
      </View>
    </View>
  );
};
