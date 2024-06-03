import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Card, H2, H3, H4, Paragraph, ScrollView, View, YStack } from 'tamagui';
import { useCombinedSingleProductData } from '~/api';
import { useShopifyProductVariant } from '~/api/shopify/useShopifyProductVariant';
import { useSingleProduct, useXentralProductExternalReference } from '~/api/xentral';
import { XENTRAL_EXTERNAL_REFERENCE_NAME } from '~/api/xentral/constants';
import {
  VariantPropertyOfXentralProductData,
  XentralPrice,
  XentralProductData
} from '~/api/xentral/types';
import { StyledImage } from '~/components/StyledExpoImage';
import { imagePlaceholder } from '~/images/placeholder';
import { useSingleProductSalesPrice } from '~/api/xentral/useSingleProductSalesPrice';
import { formatPrice } from '~/utils/formatPrice';
import { StyledButton } from '~/components/StyledButton';
import { useCartContext } from '~/context/CartContext';
import { ShopifyImageData } from '~/api/shopify/types';
import { convertHTMLText } from '~/api/shopify/helpers/convertHTMLText';
import { ProductDetailTab } from '~/components';
import { useBcSingleItem } from '~/api/businessCentral/useBcSingleItem';
import { BcItem } from '~/api/businessCentral/types/item';
import { useBcItemsVariants } from '~/api/businessCentral/useBcItemVariants';
import { useBcShopifyProductByItemNumber } from '~/api/businessCentral/useBcShopifyProductByItemNumber';
import { useShopifyProduct } from '~/api/shopify';

export default function ProductDetailPage() {
  const params = useLocalSearchParams();
  const productId = params?.id as string;

  const { data } = useBcSingleItem({ itemId: productId });
  const shopifyProducts = useBcShopifyProductByItemNumber({
    itemNumber: data?.number || ''
  });

  const { data: shopifyProductData } = useShopifyProduct(
    shopifyProducts?.data?.Id.toString() || ''
  );
  const shopifyImageData = shopifyProductData?.data?.product?.featuredImage;

  // const { data: ItemVariantData, isLoading, error } = useBcItemsVariants({ itemId: productId });
  // console.log('this is the BC product data', { data, ItemVariantData });

  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      <ScrollView>
        <View>
          <StyledImage
            source={shopifyImageData?.url}
            contentFit="contain"
            width="100%"
            height={400}
          />
          {/* Tamagui image cannot has content fit, or object fit property */}
          <ProductDetail erpProductData={data} shopifyImage={shopifyImageData} />
        </View>
      </ScrollView>
    </YStack>
  );
}

const ProductDetail = ({
  erpProductData,
  shopifyImage
}: {
  erpProductData?: BcItem | null;
  shopifyImage?: ShopifyImageData;
}) => {
  // const hasVariants = erpProductData?.variants && erpProductData.variants?.length > 0;
  const hasVariants = false;
  const { addProductToCart } = useCartContext();

  if (!erpProductData) return null;

  return (
    <YStack mt="$10">
      <H2>{erpProductData?.displayName}</H2>
      <Paragraph>Price per unit : ${erpProductData?.unitPrice}</Paragraph>
      <Paragraph>
        Stock available : {erpProductData?.inventory} {erpProductData.baseUnitOfMeasureCode}
      </Paragraph>
      <ProductDetailTab />
      {!hasVariants && (
        <AddToCartButton
          mt="$10"
          onPress={() => {
            addProductToCart({
              item: erpProductData,
              image: shopifyImage
            });
          }}
        />
      )}
      {/* {hasVariants && (
        <View mt="$10" gap="$5">
          <H4>Variants:</H4>
          {xentralProductData?.variants?.map((variant, index) => {
            return <ProductVariants key={index} variant={variant} />;
          })}
        </View>
      )} */}
    </YStack>
  );
};

const AddToCartButton = ({ ...props }: React.ComponentProps<typeof StyledButton>) => {
  return (
    <StyledButton colorStyle="secondary" {...props}>
      Add to Cart
    </StyledButton>
  );
};

// const ProductVariants = ({ variant }: { variant: VariantPropertyOfXentralProductData }) => {
//   const { data: xentralProductVariantData } = useSingleProduct(variant.id);
//   const externalReference = useXentralProductExternalReference(variant.id);
//   const shopifyVariantId = externalReference.data?.data.find(
//     (singleData) => singleData.name === XENTRAL_EXTERNAL_REFERENCE_NAME.shopifyVariantId
//   )?.number;

//   const { data: shopifyProductVariantData } = useShopifyProductVariant(shopifyVariantId || '');

//   const { data: variantSalesPrice } = useSingleProductSalesPrice({ productId: variant.id });

//   const { addProductToCart } = useCartContext();

//   return (
//     <Card flexDirection="row" alignItems="center" gap="$10" padded>
//       <StyledImage
//         source={shopifyProductVariantData?.data?.productVariant?.image?.url || imagePlaceholder}
//         contentFit="contain"
//         width={100}
//         height={100}
//       />
//       <View flex={1}>
//         <H3>{xentralProductVariantData?.data.name}</H3>
//         <Paragraph>Stock: {xentralProductVariantData?.data.stockCount} pcs</Paragraph>
//         {variantSalesPrice?.data.map((xentralPrice, index) => (
//           <Price
//             key={index}
//             priceLabel={xentralPrice?.customer || xentralPrice.customerGroup?.name}
//             xentralPrice={xentralPrice.price}
//           />
//         ))}
//       </View>
//       {xentralProductVariantData?.data && (
//         <AddToCartButton
//           onPress={() => {
//             addProductToCart({
//               xentralProductData: xentralProductVariantData?.data,
//               image: shopifyProductVariantData?.data?.productVariant?.image
//             });
//           }}
//           ml="auto"
//         />
//       )}
//     </Card>
//   );
// };

const Price = ({
  priceLabel = 'Standard Price',
  xentralPrice
}: {
  priceLabel?: string;
  xentralPrice: XentralPrice;
}) => {
  return (
    <Paragraph>
      {priceLabel}: {formatPrice(xentralPrice)}
    </Paragraph>
  );
};
