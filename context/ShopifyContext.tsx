import { useQuery } from '@tanstack/react-query';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getProductsByCursor } from '~/api/shopify/getAllProdurcts';

interface ShopifyContextProviderValue {
  products: any[];
  handleIncreasePageIndex: () => void;
  handleDecreasePageIndex: () => void;
  pageIndex: number;
}

const ShopifyContext = createContext<ShopifyContextProviderValue>({
  products: [],
  handleIncreasePageIndex: () => {},
  handleDecreasePageIndex: () => {},
  pageIndex: 0
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
    isFetching
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
  //     if (products.length === 0) {
  //       const firstPageProducts = await getProductsByCursor({ first: PRODUCT_PER_PAGE });
  //       console.log('this is the firts page product', firstPageProducts);
  //       setProducts(firstPageProducts);
  //     }
  //   };
  //   fetchFirstProducts();
  // }, []);

  console.log('this is the products', productsData?.data?.products?.nodes);

  return (
    <ShopifyContext.Provider
      value={{
        products: productsData?.data?.products?.nodes,
        handleIncreasePageIndex,
        handleDecreasePageIndex,
        pageIndex
      }}>
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopifyContext = () => useContext(ShopifyContext);
