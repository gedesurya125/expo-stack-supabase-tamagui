import React from 'react';
import {
  YStack,
  Theme,
  Heading,
  Card,
  Text,
  Separator,
  Image,
  H2,
  H3,
  H5,
  XStack,
  useTheme
} from 'tamagui';

import { useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { imagePlaceholder } from '~/images/placeholder';
import { StyledButton } from '~/components/StyledButton';
import { Ionicons } from '@expo/vector-icons';

export default function ModalScreen() {
  const params = useLocalSearchParams();

  const status = null;

  return <Theme>{status === 'pending' ? <LoadingView /> : <CartInfo />}</Theme>;
}

const LoadingView = () => {
  return (
    <YStack backgroundColor="$background" flex={1} justifyContent="center" alignItems="center">
      <Heading>Loading...</Heading>
    </YStack>
  );
};

const CartInfo = () => {
  return (
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$4" paddingVertical="$4">
      <Heading>Customer Cart: </Heading>
      <ProductList />
    </YStack>
  );
};

const ProductList = () => {
  const fakeListData = [
    { imageUri: imagePlaceholder, amount: 3, name: 'Exmaple Product 1' },
    { imageUri: imagePlaceholder, amount: 3, name: 'Exmaple Product 1' },
    { imageUri: imagePlaceholder, amount: 3, name: 'Exmaple Product 1' },
    { imageUri: imagePlaceholder, amount: 3, name: 'Exmaple Product 1' },
    { imageUri: imagePlaceholder, amount: 3, name: 'Exmaple Product 1' }
  ];

  return (
    <FlatList
      data={fakeListData}
      renderItem={({ item, index }) => {
        return <ProductItem key={index} data={item} />;
      }}
      keyExtractor={(item, index) => `${index}`}
      ItemSeparatorComponent={Separator}
      style={{
        flex: 1
      }}
    />
  );
};

const ProductItem = ({ data }: { data: any }) => {
  const theme = useTheme();
  return (
    <Card
      width="100%"
      height="$10"
      borderRadius="$5"
      mt="$2"
      mb="$2"
      display="flex"
      flexDirection="row"
      alignItems="center"
      padded>
      <Image
        source={{
          width: 100,
          height: 100,
          uri: data?.imageUri
        }}
      />
      <YStack>
        <H5>{data?.name}</H5>
        <Text>Ammount: {data.amount}</Text>
      </YStack>
      <XStack ml="auto" gap="$2">
        <StyledButton colorStyle="secondary" paddingVertical="$1" paddingHorizontal="$2">
          <Ionicons name="add-outline" size={30} color="white" />
        </StyledButton>
        <StyledButton colorStyle="primary" paddingVertical="$1" paddingHorizontal="$2">
          <Ionicons name="remove-outline" size={30} color="white" />
        </StyledButton>
        <StyledButton colorStyle="danger" paddingVertical="$1" paddingHorizontal="$3">
          <Ionicons name="trash-outline" size={23} color="white" />
        </StyledButton>
      </XStack>
    </Card>
  );
};
