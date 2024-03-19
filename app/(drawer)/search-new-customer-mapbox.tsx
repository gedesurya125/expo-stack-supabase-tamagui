import React, { useRef } from 'react';
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
  ListItem,
  ButtonIcon,
  Button
} from 'tamagui';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StyledButton } from '~/components/StyledButton';

import Mapbox, { Camera, UserTrackingMode } from '@rnmapbox/maps';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { Building2, LocateFixed, MapPin, Pointer } from '@tamagui/lucide-icons';
import { getForwardSearchPlaces, getGeoCodingPlaces, getSuggestionPlaces } from '~/api/mapbox';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN as string);

export default function SearchNewCustomer() {
  // const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [searchText, setSearchText] = React.useState('');
  const [searchPlaces, setSearchPlaces] = React.useState<any[]>([]);
  const camera = useRef<Camera>(null);
  const [followUserLocation, setFollowUserLocation] = React.useState(false);

  const [location, setLocation] = React.useState<any>();

  const handleSearchPlaces = async () => {
    const searchTextInput = searchText.trim().length;
    if (!searchTextInput) return null;

    const places = await getGeoCodingPlaces({ searchText, currentLocation: location.coords });

    // const suggestionPlace = await getSuggestionPlaces({
    //   searchText,
    //   currentLocation: location.coords
    // });

    // console.log('this is the suggested place', suggestionPlace);

    if (places?.features) {
      setSearchPlaces(places?.features);
    }
  };

  const focusToUserLocation = () => {
    if (camera?.current) {
      camera?.current?.setCamera({
        centerCoordinate: [location.coords.longitude, location.coords.latitude],
        zoomLevel: 11
      });
    }
  };

  React.useEffect(() => {
    console.log('hi i map initial setup called');

    focusToUserLocation();
  }, [camera?.current]);

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
          <ListSearchBar currentValue={searchText} setValue={setSearchText} />
          <StyledButton colorStyle="primary" onPress={handleSearchPlaces}>
            Search
          </StyledButton>
          <PlaceList searchPlaces={searchPlaces} camera={camera?.current} />
        </Stack>
        <StyledMapView width="50%">
          <Camera
            ref={camera}
            defaultSettings={{
              centerCoordinate: [-77.036086, 38.910233],
              zoomLevel: 12
            }}
            followUserLocation={followUserLocation}
            followUserMode={UserTrackingMode.Follow}
            followZoomLevel={12}
          />
          <Camera />
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
          <ButtonIcon>
            <LocateFixed
              size="$4"
              color={'$background'}
              position="absolute"
              top="$1"
              right="$1"
              onPress={focusToUserLocation}
            />
          </ButtonIcon>
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

  return <StyledMapMarker coordinate={coordinate} {...props} />;
};

const StyledMapView = styled(Mapbox.MapView, {
  name: 'StyledMapView'
});

const PlaceList = ({ searchPlaces, camera }: { searchPlaces: any; camera: Camera | null }) => {
  // ? callback prevent re render the header
  // const renderHeader = React.useCallback(() => <SearchInput />, []);

  return (
    <FlatList
      data={searchPlaces || []}
      renderItem={({ item, index }) => (
        <PlaceItem item={item} camera={camera} isOdd={index % 2 !== 0} />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
      style={{
        flex: 1,
        marginTop: 20
      }}
    />
  );
};

export const PlaceItem = ({
  item,
  camera,
  isOdd
}: {
  item: any;
  camera?: Camera | null;
  isOdd: boolean;
}) => {
  const theme = useTheme();

  console.log('this is the item', item);

  return (
    <ListItem
      color="$color"
      backgroundColor={isOdd ? '$backgroundStrong' : '$background'}
      py="$5"
      borderRadius="$4"
      flexDirection="row"
      alignItems="center"
      onPress={() => {
        console.log('hello i am pressed');
        if (camera) {
          camera?.setCamera({
            centerCoordinate: item?.geometry?.coordinates
          });
        }
      }}>
      <YStack flex={1}>
        <Text color="$color">{item.text}</Text>
        <Text color="$color" mt="$2">
          {item.place_name}
        </Text>
      </YStack>

      <Link
        asChild
        href={{
          pathname: '/new-customer',
          params: {
            name: item.text,
            address: item.place_name,
            id: item?.id
          }
        }}>
        <Pressable>
          <Ionicons name="add-outline" size={30} color={theme.blue10.val} />
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
