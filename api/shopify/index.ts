export const fetchShopifyGraphql = async ({
  query,
  variables,
  headers
}: {
  query?: string;
  variables?: any;
  headers?: any;
}) => {
  return await fetch(process.env.EXPO_PUBLIC_SHOPIFY_BASE_URL + '/api/2024-01/graphql.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.EXPO_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
      ...headers
    } as HeadersInit,
    body: JSON.stringify({ query, variables })
  })
    .then((res) => res.json())
    .catch((err) => console.log('error fetching the graphql', err));
};
