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
    datasheet: metafield(key: "datasheet", namespace: "custom") {
      id
      reference {
        ... on GenericFile {
          id
          url
        }
      }
    }
    
  }
`;
