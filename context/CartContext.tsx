import React, { createContext, useContext } from 'react';
import { BcItem } from '~/api/businessCentral/types/item';
import { ShopifyImageData } from '~/api/shopify/types';

export interface ProductInCartType {
  item: BcItem;
  image?: ShopifyImageData;
  isVariant?: boolean;
  quantity?: number;
}

interface CartContextValue {
  products: ProductInCartType[];
  addProductToCart: (productDetails: ProductInCartType) => void;
  removeSingleProductFromCart: (xentralId: string) => void;
  increaseSingleProductInCart: (prodcutId: string) => void;
  decreaseSingleProductInCart: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
  totalProductsQuantity: number;
  totalProductPrice: number;
}

const CartContext = createContext<CartContextValue>({
  products: [],
  addProductToCart: () => {},
  removeSingleProductFromCart: () => {},
  increaseSingleProductInCart: () => {},
  decreaseSingleProductInCart: () => {},
  getProductQuantity: () => 0,
  totalProductsQuantity: 0,
  totalProductPrice: 0
});

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [productInCart, setProductInCart] = React.useState<ProductInCartType[]>([]);

  const addProductToCart = (productDetails: ProductInCartType) => {
    if (productInCart.find((product) => product.item.id === productDetails.item.id)) return;

    setProductInCart((state) => [...state, { ...productDetails, quantity: 1 }]);
  };

  const removeSingleProductFromCart = (xentralId: string) => {
    const newCart = productInCart.filter((product) => product.item.id !== xentralId);
    setProductInCart(newCart);
  };

  const decreaseSingleProductInCart = (productId: string) => {
    const newCart = productInCart
      .map((product) => {
        if (product.item.id !== productId) return product;
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

  const increaseSingleProductInCart = (prodcutId: string) => {
    const newCart = productInCart.map((product) => {
      if (product.item.id !== prodcutId) return product;

      const currentProductQuantity = product?.quantity || 0;

      let newQuantity;

      if (currentProductQuantity + 1 > product.item.inventory) {
        newQuantity = product.item.inventory;
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

  const getProductQuantity = (prodcutId: string) => {
    return productInCart.find((product) => product.item.id === prodcutId)?.quantity || 0;
  };

  const totalProductsQuantity = productInCart.reduce((acc, cur) => {
    const currentProductQuantity = cur?.quantity ? cur?.quantity : 0;
    return acc + currentProductQuantity;
  }, 0);

  const totalProductPrice = productInCart.reduce((acc, cur) => {
    const productPrice = cur.item.unitPrice * (cur?.quantity || 0);
    return acc + productPrice;
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
        totalProductsQuantity,
        totalProductPrice
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
