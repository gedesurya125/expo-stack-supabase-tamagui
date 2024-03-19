import { fetchShopifyGraphql } from './index';
import { recursiveFetchAllProduct } from './helpers/recursiveFetchAllProduct';

export const MINIMAL_PRODUCT_FIELDS = `#graphql
  fragment minimalProductFields on Product {
    id
    title
    handle
    productType
    featuredImage {
      altText
      url
    }
    rating: metafields(identifiers: {namespace: "reviews", key: "rating"}) {
      key
      value
    }
    ratingCount: metafields(identifiers: {namespace: "reviews", key: "rating_count"}) {
      key
      value
    }
    storeDisplayName: metafields(identifiers: {namespace: "custom", key: "store_display_name"}) {
      key
      value
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 10) {
      nodes {
        id
        selectedOptions {
          name
          value
        }
      }
    }
    collections(first: 10) {
        nodes {
          id
          title
          handle
        }
      }
  }
`;

export const PRODUCT_FIELDS = `#graphql
  fragment productFields on Product {
    availableForSale
    createdAt
    description
    descriptionHtml
    featuredImage {
      altText
      height
      width
      url
    }
    id
    images(first: 10) {
      nodes {
        url
        altText
        width
        height
      }
    }
    isGiftCard
    options {
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    productType
    publishedAt
    requiresSellingPlan
    seo {
      title
      description
    }
    tags
    title
    # totalInventory
    updatedAt
    vendor
    variants(first: 10) {
      nodes {
        id
        sku
        availableForSale
        title
        weight
        weightUnit
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          altText
          url
        }
        quantityAvailable
        unitPrice {
          amount
          currencyCode
        }
        unitPriceMeasurement {
          referenceUnit
          referenceValue
        }
      }
    }
    collections(first: 10) {
      nodes {
        id
        title
        description
        handle
      }
    }
    seo {
      description
      title
    }
    handle
    
  }
`;

export const getProductById = async (props = { productId: '', locale: 'De' }) => {
  const GET_PRODUCT_BY_ID = `#graphql
  ${PRODUCT_FIELDS}
    query productById ($id: ID) @inContext(language:${props.locale.toUpperCase()}) {
      product(id: $id){
        ...productFields
      }
    }
  `;

  const response = await fetchShopifyGraphql({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: props.productId
    }
  });

  return response;
};

export const getMinimalProductById = async (props = { productId: '', locale: 'De' }) => {
  const GET_PRODUCT_BY_ID = `#graphql
  ${MINIMAL_PRODUCT_FIELDS}
    query productById ($id: ID) @inContext(language:${props.locale.toUpperCase()}) {
      product(id: $id){
        ...minimalProductFields
      }
    }
  `;

  const response = await fetchShopifyGraphql({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: props.productId
    }
  });

  return response;
};

// export const getProductDetailByHandle = async (handle, lang = 'DE') => {
//   const GET_PRODUCT_BY_HANDLE = `#graphql
//     ${PRODUCT_FIELDS}
//     query getProductDetailByHandle ($handle: String) @inContext(language:${lang.toUpperCase()}) {
//       product(handle: $handle){
//         ...productFields
//       }
//     }
//   `;

//   const response = await fetchShopifyGraphql({
//     query: GET_PRODUCT_BY_HANDLE,
//     variables: {
//       handle
//     },
//   });

//   return response;
// };

// export const getAllProductHandles = async (lang) => {
//   const GET_ALL_PRODUCT_HANDLES = `#graphql
//     query allProductHandles($first: Int, $after: String) @inContext(language:${lang.toUpperCase()}) {
//       products(after: $after, first: $first) {
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//         nodes {
//           handle
//           updatedAt
//         }
//       }
//     }
//   `;

//   return await recursiveFetchAllProduct(GET_ALL_PRODUCT_HANDLES, lang);
// };

// export const getAllMinimalProductData = async (lang = 'DE') => {
//   const GET_ALL_MINIMAL_PRODUCTS = `#graphql
//   ${MINIMAL_PRODUCT_FIELDS}
//   query allMinimalProducts($first: Int, $after: String) @inContext(language:${lang.toUpperCase()}) {
//     products(after: $after, first: $first) {
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       nodes {
//       ...minimalProductFields
//       }
//     }
//   }
//   `;
//   return await recursiveFetchAllProduct(GET_ALL_MINIMAL_PRODUCTS);
// };

// export const getProductSeoDataByHandle = async (handle, lang = 'DE') => {
//   const GET_PRODUCT_SEO_DATA_BY_HANDLE = `#graphql
//     query getProductSeoDataByHandle ($handle: String) @inContext(language:${lang.toUpperCase()}) {
//       product(handle: $handle){
//         title
//         description
//         featuredImage {
//           altText
//           height
//           width
//           url
//         }
//         seo {
//           description
//           title
//         }
//         handle
//       }
//     }
//   `;

//   const response = await fetchShopifyGraphql({
//     query: GET_PRODUCT_SEO_DATA_BY_HANDLE,
//     variables: {
//       handle
//     },
//   });

//   return response;
// };

export const getAllProducts = async () => {
  const GET_PRODUCTS = `#graphql
  ${PRODUCT_FIELDS}
  query allProducts($first: Int, $after: String) {
    products(after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
      ...productFields
      }
    }
  }
  `;
  return await recursiveFetchAllProduct(GET_PRODUCTS);
};

export const getProductsByCursor = async ({ first, after }: { first: number; after?: string }) => {
  const GET_PRODUCTS = `#graphql
    ${PRODUCT_FIELDS}
    query allProducts($first: Int, $after: String) {
      products(after: $after, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
        ...productFields
        }
      }
    }
  `;

  return await fetchShopifyGraphql({ query: GET_PRODUCTS, variables: { first, after } });
};

//TODO: REMOVE THIS FUNCTION
export const getProducts = async () => {
  const GET_PRODUCTS = `#graphql
    query allProducts($first: Int) {
      products( first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        
      }
    }
  `;

  const products = await fetchShopifyGraphql({
    query: GET_PRODUCTS,
    variables: {
      first: 10
    }
  });
  return products;
};
