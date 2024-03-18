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
  Button,
  ListItem
} from 'tamagui';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { StyledButton } from '~/components/StyledButton';

import Mapbox, { Camera, LocationPuck, UserTrackingMode } from '@rnmapbox/maps';
import { MapboxExample } from '~/components/MapboxExample';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { Box, Building2 } from '@tamagui/lucide-icons';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN as string);

export default function SearchNewCustomer() {
  // const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [searchText, setSearchText] = React.useState('');
  const [searchPlaces, setSearchPlaces] = React.useState<any[]>([]);

  const [location, setLocation] = React.useState<any>();

  const handleSearchPlaces = async () => {
    const searchTextInput = searchText.trim().length;
    console.log('this is the input', searchTextInput);
    // source: https://docs.mapbox.com/api/search/geocoding
    const places = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&proximity=${location.coords.longitude},${location?.coords?.latitude}&limit=10`
    ).then((res) => res.json());

    console.log('this is the original place', places);

    if (places?.features) {
      setSearchPlaces(places?.features);
    }
  };

  console.log('this is the search text', searchText);
  console.log('this is the location', location);
  console.log('this is the search place result', searchPlaces);

  return (
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$6" paddingVertical="$6">
      <Stack
        flex={1}
        $lg={{
          display: 'flex',
          flexDirection: 'row'
        }}>
        <Stack flex={1} paddingRight="$5">
          <H2>Select customer near you HEllo</H2>
          <ListSearchBar currentValue={searchText} setValue={setSearchText} />
          <StyledButton colorStyle="primary" onPress={handleSearchPlaces}>
            Search
          </StyledButton>
          <PlaceList searchPlaces={searchPlaces} />
        </Stack>
        <StyledMapView width="50%">
          <Camera
            defaultSettings={{
              centerCoordinate: [-77.036086, 38.910233],
              zoomLevel: 10
            }}
            followUserLocation={true}
            followUserMode={UserTrackingMode.Follow}
            followZoomLevel={10}
          />
          {searchPlaces.map((data, index) => {
            return (
              <StyledMarker
                id={`map-marker-${index}`}
                key={index}
                // @ts-ignore
                coordinate={data.geometry?.coordinates}
                allowOverlapWithPuck={false}
                anchor={{
                  x: 0.5,
                  y: 0.5
                }}
                allowOverlap={false}
                isSelected={false}>
                <AnnotationContent text={data.text} />
              </StyledMarker>
            );
          })}
          {/* <LocationPuck
            topImage="topImage"
            visible={true}
            scale={['interpolate', ['linear'], ['zoom'], 10, 1.0, 20, 4.0]}
            pulsing={{
              isEnabled: true,
              color: 'teal',
              radius: 50.0
            }}
          /> */}
          <Mapbox.UserLocation
            onUpdate={(newLocation) => {
              setLocation(newLocation as any);
            }}
          />
        </StyledMapView>
      </Stack>
    </YStack>
  );
}

const AnnotationContent = ({ text }: { text: string }) => (
  <Stack alignItems="center" position="relative">
    <Building2 color="$secondary" size="$2" />
    <Text
      color="$secondary"
      textAlign="center"
      mt="$2"
      fontSize="$5"
      width="$10"
      position="absolute"
      top="100%">
      {text}
    </Text>
  </Stack>
);

const StyledMarker = ({ coordinate, ...props }: React.ComponentProps<typeof Mapbox.MarkerView>) => {
  const StyledMapMarker = styled(Mapbox.MarkerView, {
    name: 'StyledMapMarker'
  });

  console.log('this is the coordinate', coordinate);

  return <StyledMapMarker coordinate={coordinate} {...props} />;
};

const StyledMapView = styled(Mapbox.MapView, {
  name: 'StyledMapView'
});

const PlaceList = ({ searchPlaces }: { searchPlaces: any }) => {
  // ? callback prevent re render the header
  // const renderHeader = React.useCallback(() => <SearchInput />, []);

  return (
    <FlatList
      data={searchPlaces || []}
      renderItem={({ item }) => <PlaceItem item={item} />}
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

export const PlaceItem = ({ item }: { item: any }) => {
  const theme = useTheme();

  return (
    <ListItem
      color="$color"
      backgroundColor="$background"
      flexDirection="row"
      alignItems="flex-start">
      <YStack flex={1}>
        <Text color="$color">{item.text}</Text>
        <Text color="$color" mt="$2">
          {item.place_name}
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
