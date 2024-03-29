import { UseQueryResult, useQuery } from '@tanstack/react-query';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getProductsByCursor } from '~/api/shopify/getAllProdurcts';

interface ShopifyContextProviderValue {
  products: any[];
  handleIncreasePageIndex: () => void;
  handleDecreasePageIndex: () => void;
  pageIndex: number;
  refetch: ({
    thrownError,
    cancelRefetch
  }: {
    thrownError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
}

const ShopifyContext = createContext<ShopifyContextProviderValue>({
  products: [],
  handleIncreasePageIndex: () => {},
  handleDecreasePageIndex: () => {},
  pageIndex: 0,
  refetch: async () => new Promise(() => {})
});

interface ShopifyContextProviderProps {
  children: React.ReactNode;
}

const PRODUCT_PER_PAGE = 20;

export const ShopifyContextProvider = ({ children }: ShopifyContextProviderProps) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [cursors, setCursors] = React.useState([undefined]);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const {
    data: productsData,
    isError,
    isLoading,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['products', pageIndex],
    queryFn: async () => {
      const newData = await getProductsByCursor({
        first: PRODUCT_PER_PAGE,
        after: cursors[pageIndex]
      });
      if (newData?.products?.pageInfo?.hasNextPage) {
        setCursors((state) => [...state, newData?.products?.pageInfo.endCursor]);
      } else {
        setHasNextPage(false);
      }
      return newData;
    }
    // refetchInterval: 1000
  });

  const handleIncreasePageIndex = () => {
    if (hasNextPage) {
      setPageIndex((state) => state + 1);
    }
  };

  const handleDecreasePageIndex = () => {
    if (pageIndex !== 0) {
      setPageIndex((state) => state - 1);
    }
  };

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchFirstProducts = async () => {
  //     const firstPageProducts = await getProductsByCursor({ first: PRODUCT_PER_PAGE });
  //     console.log('this is the firts page product', firstPageProducts);
  //   };
  //   fetchFirstProducts();
  // }, []);

  return (
    <ShopifyContext.Provider
      value={{
        products: productsData?.data?.products?.nodes,
        handleIncreasePageIndex,
        handleDecreasePageIndex,
        pageIndex,
        refetch
      }}>
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopifyContext = () => useContext(ShopifyContext);
