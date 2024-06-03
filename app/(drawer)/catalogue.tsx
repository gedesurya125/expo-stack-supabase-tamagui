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
  Image as TamaguiImage,
  Card,
  H3,
  Paragraph,
  Button,
  Spinner
} from 'tamagui';
import { useProductCategories } from '~/api/xentral/useProductCategory';
import { XentralProjectId } from '~/api/xentral/types';
import { dashboardData } from '~/data/dashboardData';
import { imagePlaceholder } from '~/images/placeholder';
import { ShopifyProductNumber } from '~/api/shopify/types';
import { useShopifyProduct } from '~/api/shopify';
import { Link, useLocalSearchParams } from 'expo-router';
import { ImageContainer } from '~/components/ImageContainer';
import { convertHTMLText } from '~/api/shopify/helpers/convertHTMLText';
import { useWeClappArticles } from '~/api/weClapp/articles';
import { ArticleType } from '~/api/weClapp/types/articles';
import { StyledButton } from '~/components/StyledButton';
import { supabase } from '~/utils/supabase';
import { useBcItems } from '~/api/businessCentral/useBcItems';
import { BcItem } from '~/api/businessCentral/types/item';
import { useBcShopifyProductByItemNumber } from '~/api/businessCentral/useBcShopifyProductByItemNumber';

const Page = () => {
  const params = useLocalSearchParams();

  const categoryId = params?.categoryId;
  const categoryName = params?.categoryName;

  return (
    <Theme>
      <YStack flex={1} backgroundColor="$background" padding="$4">
        <ScrollView>
          <SpecialDeals />
          <H2>Dashboard</H2>
          <Text color="$color" fontSize="$5" marginTop="$4">
            Here will contain, announcement, rewards, target, notification etc
          </Text>
          {typeof categoryId === 'string' && typeof categoryName === 'string' ? (
            <ProductsByCategory categoryId={categoryId} categoryName={categoryName} />
          ) : (
            <AssignProjectToCustomer />
          )}
          <AllProducts />
          {/* <TestArea /> */}
          {/* <ClothingIndustryCategoryProducs />
          <StickerIndustryCategoryProducs />
          <PaintIndustryProducts />
          <ProductCategories /> */}
        </ScrollView>
      </YStack>
    </Theme>
  );
};

export default Page;

const AssignProjectToCustomer = () => {
  return (
    <View backgroundColor="$blue6" padding="$4" mt="$10">
      <H3 textAlign="center">{`This Customer is not registered to any Industry Category`}</H3>
    </View>
  );
};

// const TestArea = () => {
//   const handleButtonClick = async () => {
//     const { data, error } = await supabase.rpc('purchase_reward', {
//       customer_id: 1,
//       erp_item_id: 32423,
//       reward_amount: 1,
//       reward_cost: 10
//     });
//     if (error) console.error('purchase reward is error', error);
//     else console.log('purchase reward is success', data);
//   };

//   return (
//     <View mt="$9">
//       <StyledButton onPress={handleButtonClick} colorStyle="danger">
//         Try to send the Supabase function
//       </StyledButton>
//     </View>
//   );
// };

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
                  <TamaguiImage
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

// const ProductCategories = () => {
//   const { data } = useProductCategories();

//   return (
//     <View alignItems="center" mt="$14">
//       <H2>Product Categories:</H2>
//       <View display="flex" flexDirection="row" flexWrap="wrap" mt="$5">
//         {/* @ts-ignore */}
//         {data?.data?.map((productCategory: any, index: number) => {
//           return <ProductCategoryCard key={index} data={productCategory} />;
//         })}
//       </View>
//     </View>
//   );
// };

// const ProductCategoryCard = ({ data }: { data: any }) => {
//   return (
//     <Card
//       width={`${100}%`}
//       $gtSm={{
//         width: `${100 / 2}%`
//       }}
//       $gtMd={{
//         width: `${100 / 3}%`
//       }}
//       padding="$3"
//       backgroundColor="transparent"
//       display="flex"
//       flexDirection="row"
//       alignItems="center">
//       <View borderColor="$primary" borderWidth="$0.5" borderRadius="$10" overflow="hidden">
//         <TamaguiImage
//           height={40}
//           width={40}
//           $gtSm={{
//             height: 50,
//             width: 50
//           }}
//           source={{
//             uri: imagePlaceholder
//           }}
//         />
//       </View>
//       <Paragraph
//         ml="$5"
//         fontSize="$5"
//         $gtSm={{
//           fontSize: '$8'
//         }}>
//         {data.name}
//       </Paragraph>
//     </Card>
//   );
// };

const AllProducts = () => {
  const { data: allItems, isLoading, error } = useBcItems();

  if (isLoading) return <Spinner size="large" mt="$16" />;

  console.log('this is the products', allItems);

  return <ProductList title="All Products" productsData={allItems?.value} />;
};
const ProductsByCategory = ({
  categoryId,
  categoryName
}: {
  categoryId: XentralProjectId;
  categoryName: string;
}) => {
  return null;
  // const { data } = useWeClappArticles(`&articleCategoryId-eq=${categoryId}`);
  // return <ProductList title={`${categoryName} Products:`} productsData={data?.pages[0].result} />;
};
// const ClothingIndustryCategoryProducs = () => {
//   const { data } = useProductsByIndustry('clothing-industry');
//   return <ProductList title="Clothing IndustryProducts" productsData={data?.data} />;
// };
// const StickerIndustryCategoryProducs = () => {
//   const { data } = useProductsByIndustry('sticker');
//   return <ProductList title="Sticker IndustryProducts" productsData={data?.data} />;
// };
// const PaintIndustryProducts = () => {
//   const { data } = useProductsByIndustry('paint');
//   return <ProductList title="Paint IndustryProducts" productsData={data?.data} />;
// };

// Reusable Components
const ProductList = ({ title, productsData }: { title: string; productsData?: BcItem[] }) => {
  return (
    <View mt="$16">
      <H3>{title}</H3>
      <ScrollView horizontal mt="$5">
        {productsData?.map((productData, index) => {
          return <ProductCard key={index} data={productData} ml={index !== 0 ? '$3' : 0} />;
        })}
      </ScrollView>
    </View>
  );
};

interface ProductCardProps extends React.ComponentProps<typeof Card> {
  data: BcItem;
}

export const ProductCard = ({ data, ...props }: ProductCardProps) => {
  const shopifyProducts = useBcShopifyProductByItemNumber({ itemNumber: data?.number });

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
          {shopifyProducts?.data ? (
            <XentralCardImage shopifyProductNumber={shopifyProducts?.data?.Id?.toString()} />
          ) : (
            <ImageContainer />
          )}
        </View>
        <H3 mt="$5">{data?.displayName}</H3>
        <View className="__card-description" mt="$5">
          <Text>{convertHTMLText(shopifyProducts?.data?.Description || '')}</Text>
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

  return <ImageContainer imageUri={shopifyProductData?.data?.product?.featuredImage?.url} />;
};
