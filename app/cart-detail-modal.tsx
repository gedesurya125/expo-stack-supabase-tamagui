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

import { FlatList } from 'react-native-gesture-handler';
import { imagePlaceholder } from '~/images/placeholder';
import { StyledButton } from '~/components/StyledButton';
import { Ionicons } from '@expo/vector-icons';
import { ProductInCartType, useCartContext } from '~/context/CartContext';

export default function ModalScreen() {
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
  const { products } = useCartContext();

  return (
    <FlatList
      data={products}
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

const ProductItem = ({ data }: { data: ProductInCartType }) => {
  const {
    increaseSingleProductInCart,
    decreaseSingleProductInCart,
    removeSingleProductFromCart,
    getProductQuantity
  } = useCartContext();

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
          uri: data?.image?.url || imagePlaceholder
        }}
      />
      <YStack>
        <H5>{data?.xentralProductData.name}</H5>
        <Text>Ammount: {getProductQuantity(data.xentralProductData.id)}</Text>
      </YStack>
      <XStack ml="auto" gap="$2">
        <StyledButton
          colorStyle="secondary"
          paddingVertical="$1"
          paddingHorizontal="$2"
          onPress={() => {
            increaseSingleProductInCart(data.xentralProductData.id);
          }}>
          <Ionicons name="add-outline" size={30} color="white" />
        </StyledButton>
        <StyledButton
          colorStyle="primary"
          paddingVertical="$1"
          paddingHorizontal="$2"
          onPress={() => {
            decreaseSingleProductInCart(data.xentralProductData.id);
          }}>
          <Ionicons name="remove-outline" size={30} color="white" />
        </StyledButton>
        <StyledButton
          colorStyle="danger"
          paddingVertical="$1"
          paddingHorizontal="$3"
          onPress={() => {
            removeSingleProductFromCart(data.xentralProductData.id);
          }}>
          <Ionicons name="trash-outline" size={23} color="white" />
        </StyledButton>
      </XStack>
    </Card>
  );
};
