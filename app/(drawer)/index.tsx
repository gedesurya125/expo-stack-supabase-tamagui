import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { YStack, H2, Theme, Text, XStack, View, H4, ScrollView, Image, Card, H3 } from 'tamagui';
import { useProductCategories } from '~/api/xentral/useProductCategory';
import { ProductCard } from '~/components/ProductCard';
import { useShopifyContext } from '~/context/ShopifyContext';
import { dashboardData } from '~/data/dashboardData';
import { imagePlaceholder } from '~/images/placeholder';

const Page = () => {
  return (
    <Theme>
      <YStack flex={1} backgroundColor="$background" padding="$4">
        <ScrollView>
          <SpecialDeals />
          <H2>Dashboard</H2>
          <Text color="$color" fontSize="$5" marginTop="$4">
            Here will contain, announcement, rewards, target, notification etc
          </Text>
          <ProductDisplay />
          <ProductCategories />
        </ScrollView>
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

const SpecialDeals = () => {
  const { specialDeals, achievements } = dashboardData;

  return (
    <YStack width="100%">
      <H4>{specialDeals.title}</H4>
      <XStack>
        <ScrollView horizontal columnGap="$5">
          {specialDeals.list.map((item, index) => {
            return (
              <Card
                key={index}
                height={165}
                width={400}
                borderColor="$primary"
                borderWidth="$1"
                ml={index !== 0 ? '$4' : 0}>
                <Card.Background justifyContent="center" alignItems="center">
                  <Image
                    resizeMode="contain"
                    source={{
                      width: 400,
                      height: 400,
                      uri: item.imageUri
                    }}
                  />
                </Card.Background>
              </Card>
            );
          })}
        </ScrollView>
      </XStack>
      <Card>
        <Card.Header>
          <Ionicons />
        </Card.Header>
      </Card>
    </YStack>
  );
};

const ProductCategories = () => {
  const { data } = useProductCategories();

  return (
    <View alignItems="center" mt="$12">
      <H2>Product Categories:</H2>
      <View display="flex" flexDirection="row" flexWrap="wrap" mt="$5">
        {data?.data?.map((productCategory: any, index: number) => {
          return <ProductCategoryCard key={index} data={productCategory} />;
        })}
      </View>
    </View>
  );
};

const ProductCategoryCard = ({ data }: { data: any }) => {
  return (
    <Card
      width={`${100 / 3}%`}
      padding="$3"
      backgroundColor="transparent"
      display="flex"
      flexDirection="row"
      alignItems="center">
      <View borderColor="$primary" borderWidth="$0.5" borderRadius="$10" overflow="hidden">
        <Image
          source={{
            height: 50,
            width: 50,
            uri: imagePlaceholder
          }}
        />
      </View>
      <H3 ml="$5">{data.name}</H3>
    </Card>
  );
};
