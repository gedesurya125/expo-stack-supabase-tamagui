import { useQuery } from '@tanstack/react-query';
import { fetchShopifyAdminGraphql } from './fetchShopifyGraphql';
import { ShopifyImageData, ShopifyProductNumber, ShopifyProductVariant } from './types';

export const useShopifyProductVariant = (shopifyVariantProductId: ShopifyProductNumber) => {
  const shopifyProductId = `gid://shopify/ProductVariant/${shopifyVariantProductId}`;

  return useQuery({
    queryKey: ['shopify-products-variant', shopifyProductId],
    queryFn: async () => await getVariantDetail({ variantId: shopifyProductId })
  });
};

export const getVariantDetail = async (props = { variantId: '' }) => {
  const GET_PRODUCT_BY_ID = `#graphql
    query productVariantById ($id: ID!) {
      productVariant(id: $id){
        displayName
        image {
          altText
          height
          url
          width
        }
      }
    }
  `;
  const response = await fetchShopifyAdminGraphql<GetShopifyProductVariantResponse>({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: props.variantId
    }
  });

  return response;
};

interface GetShopifyProductVariantResponse {
  data: {
    productVariant: ShopifyProductVariant;
  };
}
