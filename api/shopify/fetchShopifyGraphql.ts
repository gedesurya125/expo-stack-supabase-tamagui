export const fetchShopifyGraphql = async <T>({
  query,
  variables,
  headers
}: {
  query?: string;
  variables?: any;
  headers?: any;
}): Promise<T> => {
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
    .then((res) => res?.json())
    .catch((err) => console.log('error fetching the graphql', err));
};
export const fetchShopifyAdminGraphql = async <T>({
  query,
  variables,
  headers
}: {
  query?: string;
  variables?: any;
  headers?: any;
}): Promise<T> => {
  console.log(
    'this is the endpoinst',
    process.env.EXPO_PUBLIC_SHOPIFY_BASE_URL + '/admin/api/2024-04/graphql.json'
  );

  return await fetch(process.env.EXPO_PUBLIC_SHOPIFY_BASE_URL + '/admin/api/2024-04/graphql.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'X-Shopify-Storefront-Access-Token': process.env.EXPO_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
      'X-Shopify-Access-Token': process.env.EXPO_PUBLIC_SHOPIFY_XENTRAL_ADMIN_TOKEN,
      ...headers
    } as HeadersInit,
    body: JSON.stringify({ query, variables })
  })
    .then((res) => {
      console.log('this is the response', res);
      return res?.json();
    })
    .catch((err) => console.log('error fetching the graphql', err));
};
