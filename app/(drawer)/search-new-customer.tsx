import React from 'react';
import {
  H2,
  Input,
  Separator,
  Stack,
  YStack,
  styled,
  useTheme,
  View,
  getTokenValue,
  Text,
  Button
} from 'tamagui';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { FlatList } from 'react-native-gesture-handler';
import { CustomerItem } from './existing-customer';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { StyledButton } from '~/components/StyledButton';

const MAP_WIDTH = 600;
const MAP_HEIGHT = 650;

const ASPECT_RATIO = MAP_WIDTH / MAP_HEIGHT;

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_LAT = 28.46252;
const INITIAL_LNG = -81.397272;

export default function SearchNewCustomer() {
  // const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [searchText, setSearchText] = React.useState('');

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [location, setLocation] = React.useState<Region | undefined>();
  const INITIAL_LOCATION = {
    latitude: INITIAL_LAT || 0,
    longitude: INITIAL_LNG || 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
    })();
  }, []);

  let regionSetDelay: ReturnType<typeof setTimeout>;

  const handleOnLocationChange = (region: Region) => {
    if (regionSetDelay) {
      clearTimeout(regionSetDelay);
    }
    regionSetDelay = setTimeout(() => {
      setLocation(region);
    }, 500);
  };

  const searchPlaces = async () => {
    const searchTextInput = searchText.trim().length;

    if (!searchTextInput) return null;
    const googleApisUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const input = searchText.trim();
    const currentLocation = `${location?.latitude},${location?.longitude}&radius=2000`;
    const url = `${googleApisUrl}?query=${input}&location=${currentLocation}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      console.log('place', json);
      console.log('searchText', searchText);
    } catch (error) {
      console.log('error search place', error);
    }
  };

  console.log('this is the search text', searchText);

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
          {errorMsg && <Text>error: {errorMsg}</Text>}
          {/* <SearchInput /> */}
          <ListSearchBar currentValue={searchText} setValue={setSearchText} />
          <Button onPress={searchPlaces}>Search</Button>
          <CustomerList />
        </Stack>
        <StyledMapView
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_LOCATION}
          region={location}
          onRegionChange={handleOnLocationChange}>
          {/* //TODO region change should not display the marker */}
          {/* //TODO the user marker should detected by different way */}
          <Marker
            coordinate={{
              latitude: location?.latitude || 0,
              longitude: location?.longitude || 0
            }}
            title={'your location'}
            description={'your location detail'}
          />
        </StyledMapView>
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
