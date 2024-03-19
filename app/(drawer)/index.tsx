import React from 'react';
import { YStack, H2, Separator, Theme, Text, XStack, View } from 'tamagui';
import { ProductCard } from '~/components/ProductCard';
import { useShopifyContext } from '~/context/ShopifyContext';

const Page = () => {
  const { products } = useShopifyContext();

  return (
    <Theme>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
        padding="$4">
        <H2>Dashboard</H2>
        <Separator />
        <Text color="$color" fontSize="$5" marginTop="$4">
          Here will contain, announcement, rewards, target, notification etc
        </Text>
        <ProductDisplay />
      </YStack>
    </Theme>
  );
};

export default Page;

const ProductDisplay = () => {
  const { products } = useShopifyContext();
  return (
    <View alignItems="center" mt="$10">
      <H2>Our Products</H2>
      <View display="flex" flexDirection="row" gap="$3" flexWrap="wrap" mt="$5">
        {products?.map((data, index) => {
          return <ProductCard key={index} width="30%" productData={data} />;
        })}
      </View>
    </View>
  );
};
