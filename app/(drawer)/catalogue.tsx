import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  YStack,
  H2,
  Theme,
  Text,
  XStack,
  View,
  H4,
  ScrollView,
  Image,
  Card,
  H3,
  Paragraph
} from 'tamagui';
import { useProductCategories } from '~/api/xentral/useProductCategory';
import { useProducts } from '~/api/xentral/useProducts';
import {
  XENTRAL_EXTERNAL_REFERENCE_NAME,
  type XentralProductData,
  type XentralProductExternalReference
} from '~/api/xentral/types';
import { ProductCard } from '~/components/ProductCard';
import { useShopifyContext } from '~/context/ShopifyContext';
import { dashboardData } from '~/data/dashboardData';
import { imagePlaceholder } from '~/images/placeholder';
import { Image as ExpoImage } from 'expo-image';
import { StyledButton } from '~/components/StyledButton';
import { useXentralProductExternalReference } from '~/api/xentral';
import { ShopifyProductNumber } from '~/api/shopify/types';
import { useShopifyProduct } from '~/api/shopify';

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
          <XentralProducts />
          <ProductCategories />
        </ScrollView>
      </YStack>
    </Theme>
  );
};

export default Page;

const ProductDisplay = () => {
  const { products, refetch } = useShopifyContext();
  return (
    <View alignItems="center" mt="$14">
      <H2>Our Products</H2>
      <View display="flex" flexDirection="row" flexWrap="wrap" mt="$5">
        {products?.map((data, index) => {
          return (
            <View
              className="grid-item-container"
              width={`${100 / 2}%`}
              $gtMd={{
                width: `${100 / 4}%`
              }}
              key={index}
              padding="$2">
              <ProductCard productData={data} />
            </View>
          );
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
    <View alignItems="center" mt="$14">
      <H2>Product Categories:</H2>
      <View display="flex" flexDirection="row" flexWrap="wrap" mt="$5">
        {/* @ts-ignore */}
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
      width={`${100}%`}
      $gtSm={{
        width: `${100 / 2}%`
      }}
      $gtMd={{
        width: `${100 / 3}%`
      }}
      padding="$3"
      backgroundColor="transparent"
      display="flex"
      flexDirection="row"
      alignItems="center">
      <View borderColor="$primary" borderWidth="$0.5" borderRadius="$10" overflow="hidden">
        <Image
          height={40}
          width={40}
          $gtSm={{
            height: 50,
            width: 50
          }}
          source={{
            uri: imagePlaceholder
          }}
        />
      </View>
      <Paragraph
        ml="$5"
        fontSize="$5"
        $gtSm={{
          fontSize: '$8'
        }}>
        {data.name}
      </Paragraph>
    </Card>
  );
};

const XentralProducts = () => {
  const { data } = useProducts();

  return (
    <View mt="$16">
      <H3>All Products: </H3>
      <ScrollView horizontal mt="$5">
        {data?.data.map((productData, index) => {
          return <XentralProductCard key={index} data={productData} ml={index !== 0 ? '$3' : 0} />;
        })}
      </ScrollView>
    </View>
  );
};

interface XentralProductCardProps extends React.ComponentProps<typeof Card> {
  data: XentralProductData;
}

export const XentralProductCard = ({ data, ...props }: XentralProductCardProps) => {
  const { data: xentralExternalReferenceData } = useXentralProductExternalReference(data.id);

  const getShopifyProductId = (externalDataList: XentralProductExternalReference[]) => {
    return externalDataList.find(
      (data) => data.name === XENTRAL_EXTERNAL_REFERENCE_NAME.shopifyproductid
    )?.number;
  };

  const shopifyProductNumber = getShopifyProductId(xentralExternalReferenceData?.data || []);

  return (
    <Card {...props} width={300} padded>
      <View>
        {shopifyProductNumber ? (
          <XentralCardImage shopifyProductNumber={shopifyProductNumber} />
        ) : (
          <CardImage />
        )}
      </View>
      <H3 mt="$5">{data?.name}</H3>
      <View className="__card-description" mt="$5">
        <Text>{data?.description?.replace(/<br\s\/>/gi, '\n')}</Text>
        <Text>{data?.stockCount} items available</Text>
      </View>
    </Card>
  );
};

const XentralCardImage = ({
  shopifyProductNumber
}: {
  shopifyProductNumber: ShopifyProductNumber;
}) => {
  const { data: shopifyProductData } = useShopifyProduct(shopifyProductNumber);

  console.log('this is the product featured image', shopifyProductData);

  return <CardImage imageUri={shopifyProductData?.data?.product?.featuredImage.url} />;
};

const CardImage = ({ imageUri }: { imageUri?: string }) => {
  return (
    <Image
      width="100%"
      source={{
        uri: imageUri || imagePlaceholder,
        width: 300,
        height: 200
      }}
    />
  );
};
