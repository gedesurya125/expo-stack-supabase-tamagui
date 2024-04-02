import React, { createContext, useContext } from 'react';
import { ShopifyImageData } from '~/api/shopify/types';
import { XentralProductData, xentralProductId } from '~/api/xentral/types';

export interface ProductInCartType {
  xentralProductData: XentralProductData;
  image?: ShopifyImageData;
  isVariant?: boolean;
  quantity?: number;
}

interface CartContextValue {
  products: ProductInCartType[];
  addProductToCart: (productDetails: ProductInCartType) => void;
  removeSingleProductFromCart: (xentralId: xentralProductId) => void;
  increaseSingleProductInCart: (prodcutId: xentralProductId) => void;
  decreaseSingleProductInCart: (productId: xentralProductId) => void;
  getProductQuantity: (productId: xentralProductId) => number;
  totalProductsQuantity: number;
}

const CartContext = createContext<CartContextValue>({
  products: [],
  addProductToCart: () => {},
  removeSingleProductFromCart: () => {},
  increaseSingleProductInCart: () => {},
  decreaseSingleProductInCart: () => {},
  getProductQuantity: () => 0,
  totalProductsQuantity: 0
});

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [productInCart, setProductInCart] = React.useState<ProductInCartType[]>([]);

  const addProductToCart = (productDetails: ProductInCartType) => {
    if (
      productInCart.find(
        (product) => product.xentralProductData.id === productDetails.xentralProductData.id
      )
    )
      return;

    setProductInCart((state) => [...state, { ...productDetails, quantity: 1 }]);
  };

  const removeSingleProductFromCart = (xentralId: xentralProductId) => {
    const newCart = productInCart.filter((product) => product.xentralProductData.id !== xentralId);
    setProductInCart(newCart);
  };

  const decreaseSingleProductInCart = (productId: xentralProductId) => {
    const newCart = productInCart
      .map((product) => {
        if (product.xentralProductData.id !== productId) return product;
        const currentProductQuantity = product?.quantity || 0;
        let newQuantity;
        if (currentProductQuantity - 1 < 0) {
          newQuantity = 0;
        } else {
          newQuantity = currentProductQuantity - 1;
        }
        return {
          ...product,
          quantity: newQuantity
        };
      })
      .filter((product) => !!product?.quantity && product?.quantity > 0);

    setProductInCart(newCart);
  };

  const increaseSingleProductInCart = (prodcutId: xentralProductId) => {
    const newCart = productInCart.map((product) => {
      if (product.xentralProductData.id !== prodcutId) return product;

      const currentProductQuantity = product?.quantity || 0;

      let newQuantity;

      if (currentProductQuantity + 1 > product.xentralProductData.stockCount) {
        newQuantity = product.xentralProductData.stockCount;
      } else {
        newQuantity = currentProductQuantity + 1;
      }

      return {
        ...product,
        quantity: newQuantity
      };
    });

    setProductInCart(newCart);
  };

  const getProductQuantity = (prodcutId: xentralProductId) => {
    return (
      productInCart.find((product) => product.xentralProductData.id === prodcutId)?.quantity || 0
    );
  };

  const totalProductsQuantity = productInCart.reduce((acc, cur) => {
    const currentProductQuantity = cur?.quantity ? cur?.quantity : 0;
    return acc + currentProductQuantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        products: productInCart,
        addProductToCart,
        removeSingleProductFromCart,
        decreaseSingleProductInCart,
        increaseSingleProductInCart,
        getProductQuantity,
        totalProductsQuantity
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
