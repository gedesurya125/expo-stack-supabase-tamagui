export const fetchShopifyGraphql = (body: '') => {
  return fetch(process.env.SHOPIFY_BASE_URL + '/api/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': process.env.EXPO_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN
    } as HeadersInit,
    body: body
  });
};

export const fetchShopify = (path: '') => {
  return fetch(process.env.SHOPIFY_BASE_URL + `/admin/${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': process.env.EXPO_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN
    } as HeadersInit
  });
};
