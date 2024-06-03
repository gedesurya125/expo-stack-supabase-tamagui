import { FlatList } from 'react-native-gesture-handler';
import { Card, H5, Image, Separator, Text, XStack, YStack } from 'tamagui';
import { ProductInCartType, useCartContext } from '~/context/CartContext';
import { imagePlaceholder } from '~/images/placeholder';
import { StyledButton } from './StyledButton';
import { Ionicons } from '@expo/vector-icons';

export const ProductCartList = () => {
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

export const ProductItem = ({
  data,
  hideActionButton
}: {
  data: ProductInCartType;
  hideActionButton?: boolean;
}) => {
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
      <YStack flex={1} marginLeft="$4">
        <H5>{data?.item.displayName}</H5>
        <Text>Ammount: {getProductQuantity(data.item.id)}</Text>
        <Text>
          Price: €{data?.item?.unitPrice}{' '}
          {data?.item?.priceIncludesTax ? '(include tax)' : '(not include tax)'}
        </Text>
        <Text>Variant: default</Text>
      </YStack>
      {!hideActionButton && (
        <XStack ml="auto" gap="$2">
          <StyledButton
            colorStyle="secondary"
            paddingVertical="$1"
            paddingHorizontal="$2"
            onPress={() => {
              increaseSingleProductInCart(data.item.id);
            }}>
            <Ionicons name="add-outline" size={30} color="white" />
          </StyledButton>
          <StyledButton
            colorStyle="primary"
            paddingVertical="$1"
            paddingHorizontal="$2"
            onPress={() => {
              decreaseSingleProductInCart(data.item.id);
            }}>
            <Ionicons name="remove-outline" size={30} color="white" />
          </StyledButton>
          <StyledButton
            colorStyle="danger"
            paddingVertical="$1"
            paddingHorizontal="$3"
            onPress={() => {
              removeSingleProductFromCart(data.item.id);
            }}>
            <Ionicons name="trash-outline" size={23} color="white" />
          </StyledButton>
        </XStack>
      )}
    </Card>
  );
};
