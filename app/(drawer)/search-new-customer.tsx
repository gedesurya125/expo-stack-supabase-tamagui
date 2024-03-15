import React from 'react';
import {
  H1,
  H2,
  Input,
  Separator,
  Stack,
  Text,
  YStack,
  styled,
  useTheme,
  View,
  getTokenValue
} from 'tamagui';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomerItem } from './existing-customer';
import { Ionicons } from '@expo/vector-icons';

export default function SearchNewCustomer() {
  const MAP_WIDTH = 600;
  const MAP_HEIGHT = 650;

  const ASPECT_RATIO = MAP_WIDTH / MAP_HEIGHT;

  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const INITIAL_LAT = 28.46254;
  const INITIAL_LNG = -81.397272;

  const INITIAL_POSITION = {
    latitude: INITIAL_LAT,
    longitude: INITIAL_LNG,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };

  return (
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$6" paddingVertical="$6">
      <Stack
        flex={1}
        $lg={{
          display: 'flex',
          flexDirection: 'row'
        }}>
        <Stack flex={1} paddingRight="$5">
          <H2>Select customer near you</H2>
          <SearchInput />
          <CustomerList />
        </Stack>
        <StyledMapView
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_POSITION}
        />
      </Stack>
    </YStack>
  );
}

const StyledMapView = styled(MapView, {
  name: 'StyledMapView'
});

const CustomerList = () => {
  // ? callback prevent re render the header
  // const renderHeader = React.useCallback(() => <SearchInput />, []);

  return (
    <FlatList
      data={[
        {
          id: '100',
          general: {
            name: 'Test'
          }
        },
        {
          id: '101',
          general: {
            name: 'Test'
          }
        },
        {
          id: '102',
          general: {
            name: 'Test'
          }
        },
        {
          id: '103',
          general: {
            name: 'Test'
          }
        }
      ]}
      renderItem={({ item }) => <CustomerItem item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
      // ? how to make the search bar sticky, source: https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
      // ListHeaderComponent={renderHeader}
      // stickyHeaderIndices={[0]}
      // onEndReachedThreshold={0.1}
      // onEndReached={async () => {
      //   console.log('fetching...', page);
      //   await fetchNextPage();
      // }}
      style={{
        flex: 1,
        marginTop: 20
      }}
    />
  );
};

const SearchInput = () => {
  const [value, setValue] = React.useState('');

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
    <View paddingTop="$4" backgroundColor="$background" paddingBottom="$2">
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
