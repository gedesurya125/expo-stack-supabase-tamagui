import { useQuery } from '@tanstack/react-query';
import { fetchShopifyGraphql } from './fetchShopifyGraphql';
import { PRODUCT_FIELDS } from './fragments/products';
import { ShopifyProduct, ShopifyProductNumber } from './types';

export const useShopifyProduct = (shopifyProductIdNumber: ShopifyProductNumber) => {
  const shopifyProductId = `gid://shopify/Product/${shopifyProductIdNumber}`;
  return useQuery({
    queryKey: ['shopify-products', shopifyProductId],
    queryFn: () => getProductById({ productId: shopifyProductId })
  });
};

export const getProductById = async (props = { productId: '' }) => {
  const GET_PRODUCT_BY_ID = `#graphql
  ${PRODUCT_FIELDS}
    query productById ($id: ID) {
      product(id: $id){
        ...productFields
      }
    }
  `;
  const response = await fetchShopifyGraphql<GetShopifyProductByIdResponse>({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: props.productId
    }
  });

  return response;
};

interface GetShopifyProductByIdResponse {
  data: {
    product: ShopifyProduct;
  };
}
