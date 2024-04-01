import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Card, H2, H3, H4, Paragraph, ScrollView, View, YStack } from 'tamagui';
import { useCombinedSingleProductData } from '~/api';
import { useShopifyProductVariant } from '~/api/shopify/useShopifyProductVariant';
import { useSingleProduct, useXentralProductExternalReference } from '~/api/xentral';
import { XENTRAL_EXTERNAL_REFERENCE_NAME } from '~/api/xentral/constants';
import { VariantPropertyOfXentralProductData, XentralProductData } from '~/api/xentral/types';
import { StyledImage } from '~/components/StyledExpoImage';
import { imagePlaceholder } from '~/images/placeholder';

export default function ProductDetailPage() {
  const params = useLocalSearchParams();
  const productId = params?.id as string;

  const { xentralProductData, shopifyProductData } = useCombinedSingleProductData(productId);

  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      <ScrollView>
        <View>
          {/* Tamagui image cannot has content fit, or object fit property */}
          <StyledImage
            source={shopifyProductData?.featuredImage?.url || imagePlaceholder}
            contentFit="contain"
            width="100%"
            height={400}
          />
          <ProductDetail xentralProductData={xentralProductData} />
        </View>
      </ScrollView>
    </YStack>
  );
}

const ProductDetail = ({ xentralProductData }: { xentralProductData?: XentralProductData }) => {
  return (
    <YStack mt="$10">
      <H2>{xentralProductData?.name}</H2>
      <Paragraph>{xentralProductData?.description || 'this product has no description'}</Paragraph>
      <View>
        <H4>Variants:</H4>
        {xentralProductData?.variants?.map((variant, index) => {
          return <ProductVariants key={index} variant={variant} />;
        })}
      </View>
    </YStack>
  );
};

const ProductVariants = ({ variant }: { variant: VariantPropertyOfXentralProductData }) => {
  const { data: xentralProductVariantData } = useSingleProduct(variant.id);
  const externalReference = useXentralProductExternalReference(variant.id);
  const shopifyVariantId = externalReference.data?.data.find(
    (singleData) => singleData.name === XENTRAL_EXTERNAL_REFERENCE_NAME.shopifyVariantId
  )?.number;

  const { data: shopifyProductVariantData } = useShopifyProductVariant(shopifyVariantId || '');

  return (
    <Card>
      <StyledImage
        source={shopifyProductVariantData?.data?.productVariant?.image?.url || imagePlaceholder}
        contentFit="contain"
        width={200}
        height={200}
      />
      <H3>{xentralProductVariantData?.data.name}</H3>
    </Card>
  );
};
