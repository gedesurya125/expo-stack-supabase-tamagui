interface GeoCodingProps {
  searchText?: string;
  currentLocation: {
    longitude: number;
    latitude: number;
  };
  id?: string;
}

const MAP_BOX_API_BASE_URL = 'https://api.mapbox.com';

export const getGeoCodingPlaces = async ({ searchText, currentLocation }: GeoCodingProps) => {
  const places = await fetch(
    `${MAP_BOX_API_BASE_URL}/geocoding/v5/mapbox.places/${searchText}.json?access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&proximity=${currentLocation.longitude},${currentLocation.latitude}&limit=10`
  ).then((res) => res.json());
  return places;
};

// ? NOTE: the other api's below not returning nearest location
export const getGeoCodingPlacesV6 = async ({ searchText, currentLocation }: GeoCodingProps) => {
  const places = await fetch(
    `${MAP_BOX_API_BASE_URL}/search/geocode/v6/forward?q=${searchText}&access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&proximity=${currentLocation.longitude},${currentLocation.latitude}&limit=10`
  ).then((res) => res.json());
  return places;
};

export const getSuggestionPlaces = async ({ searchText, currentLocation }: GeoCodingProps) => {
  const places = await fetch(
    `${MAP_BOX_API_BASE_URL}/search/searchbox/v1/suggest?q=${searchText}&access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&session_token=${process.env.EXPO_PUBLIC_MAPBOX_SESSION_TOKEN}&proximity=${currentLocation.longitude},${currentLocation.latitude}&origin=${currentLocation.longitude},${currentLocation.latitude}&limit=10`
  ).then((res) => res.json());
  return places;
};
export const getPlacesDetails = async ({ id, currentLocation }: GeoCodingProps) => {
  const placeDetails = await fetch(
    `${MAP_BOX_API_BASE_URL}/search/searchbox/v1/retrieve/${id}?access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&session_token=${process.env.EXPO_PUBLIC_MAPBOX_SESSION_TOKEN}`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('error fetching company details', err);
    });
  return placeDetails;
};
export const getForwardSearchPlaces = async ({ searchText, currentLocation }: GeoCodingProps) => {
  const url = `${MAP_BOX_API_BASE_URL}/search/searchbox/v1/forward?q=${searchText}&access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&proximity=${currentLocation.longitude},${currentLocation.latitude}&limit=10&types=place`;
  console.log('this is the URL', url);

  const places = await fetch(url).then((res) => res.json());
  return places;
};

// const places = await fetch(
//   `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchText}&&access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}&session_token=${process.env.EXPO_PUBLIC_MAPBOX_SESSION_TOKEN}&proximity=${location?.coords?.longtitude},${location?.coords?.latitude}`
// ).then((res) => res.json());
