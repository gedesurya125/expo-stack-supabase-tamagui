import { fetchShopifyGraphql } from '../index';

export const recursiveFetchAllProduct = async (query: string, endCursor?: number) => {
  /**
   * ? the query must accept first and after parameters
   * ? the query must also query pageInfo with property hasNextPage and endCursor
   */
  const response = await fetchShopifyGraphql({
    query,
    variables: {
      first: 100,
      after: endCursor
    }
  });
  const responseData = response?.data?.products;
  const products = responseData.nodes;

  if (responseData?.pageInfo?.hasNextPage) {
    const newData: any = await recursiveFetchAllProduct(query, responseData.pageInfo.endCursor);
    return [...products, ...newData]; //recursion needed due to algomed paginated the products
  }
  return products;
};
