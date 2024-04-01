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
  XentralProjectId,
  type XentralProductData,
  type XentralProductExternalReference
} from '~/api/xentral/types';
import { ProductCard } from '~/components/ProductCard';
import { useShopifyContext } from '~/context/ShopifyContext';
import { dashboardData } from '~/data/dashboardData';
import { imagePlaceholder } from '~/images/placeholder';
import { Image as ExpoImage } from 'expo-image';
import { StyledButton } from '~/components/StyledButton';
import { useProductsByProject, useXentralProductExternalReference } from '~/api/xentral';
import { ShopifyProductNumber } from '~/api/shopify/types';
import { useShopifyProduct } from '~/api/shopify';
import { useProductsByIndustry } from '~/api/xentral/useProductsByIndustry';
import { XENTRAL_EXTERNAL_REFERENCE_NAME } from '~/api/xentral/constants';
import { Link, useLocalSearchParams } from 'expo-router';
import { ImageContainer } from '~/components/ImageContainer';

const Page = () => {
  const params = useLocalSearchParams();

  const projectId = params?.projectId;
  const projectName = params?.projectName;

  return (
    <Theme>
      <YStack flex={1} backgroundColor="$background" padding="$4">
        <ScrollView>
          <SpecialDeals />
          <H2>Dashboard</H2>
          <Text color="$color" fontSize="$5" marginTop="$4">
            Here will contain, announcement, rewards, target, notification etc
          </Text>
          {typeof projectId === 'string' && typeof projectName === 'string' ? (
            <XentralProductsByProject projectId={projectId} projectName={projectName} />
          ) : (
            <AssignProjectToCustomer />
          )}
          {/* <ProductDisplay /> */}
          <AllXentralProducts />
          <ClothingIndustryCategoryProducs />
          <StickerIndustryCategoryProducs />
          <PaintIndustryProducts />
          <ProductCategories />
        </ScrollView>
      </YStack>
    </Theme>
  );
};

export default Page;

const AssignProjectToCustomer = () => {
  return (
    <View backgroundColor="$blue6" padding="$4" mt="$10">
      <H3 textAlign="center">{`This Customer is not registered to any Project (Company Category)`}</H3>
    </View>
  );
};

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

const AllXentralProducts = () => {
  const { data } = useProducts();
  return <XentralProductsList title="All Products" productsData={data?.data} />;
};
const XentralProductsByProject = ({
  projectId,
  projectName
}: {
  projectId: XentralProjectId;
  projectName: string;
}) => {
  const { data } = useProductsByProject(projectId);
  return <XentralProductsList title={`${projectName} Products:`} productsData={data?.data} />;
};
const ClothingIndustryCategoryProducs = () => {
  const { data } = useProductsByIndustry('clothing-industry');
  return <XentralProductsList title="Clothing IndustryProducts" productsData={data?.data} />;
};
const StickerIndustryCategoryProducs = () => {
  const { data } = useProductsByIndustry('sticker');
  return <XentralProductsList title="Sticker IndustryProducts" productsData={data?.data} />;
};
const PaintIndustryProducts = () => {
  const { data } = useProductsByIndustry('paint');
  return <XentralProductsList title="Paint IndustryProducts" productsData={data?.data} />;
};

// Reusable Components
const XentralProductsList = ({
  title,
  productsData
}: {
  title: string;
  productsData?: XentralProductData[];
}) => {
  return (
    <View mt="$16">
      <H3>{title}</H3>
      <ScrollView horizontal mt="$5">
        {productsData?.map((productData, index) => {
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
    <Link
      asChild
      href={{
        pathname: '/(drawer)/product/[id]',
        params: {
          id: data?.id
        }
      }}>
      <Card {...props} width={300} padded>
        <View>
          {shopifyProductNumber ? (
            <XentralCardImage shopifyProductNumber={shopifyProductNumber} />
          ) : (
            <ImageContainer />
          )}
        </View>
        <H3 mt="$5">{data?.name}</H3>
        <View className="__card-description" mt="$5">
          <Text>{data?.description?.replace(/<br\s\/>/gi, '\n')}</Text>
          <Text>{data?.stockCount} items available</Text>
        </View>
      </Card>
    </Link>
  );
};

const XentralCardImage = ({
  shopifyProductNumber
}: {
  shopifyProductNumber: ShopifyProductNumber;
}) => {
  const { data: shopifyProductData } = useShopifyProduct(shopifyProductNumber);

  return <ImageContainer imageUri={shopifyProductData?.data?.product?.featuredImage.url} />;
};
