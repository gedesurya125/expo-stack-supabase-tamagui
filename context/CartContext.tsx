import React, { createContext, useContext } from 'react';
import { ShopifyImageData } from '~/api/shopify/types';
import { XentralProductData, xentralProductId } from '~/api/xentral/types';

interface ProductInCartType {
  xentralProductData: XentralProductData;
  image: ShopifyImageData;
  isVariant?: boolean;
  quantity: number;
}

interface CartContextValue {
  products: ProductInCartType[];
  addProductToCart: (productDetails: ProductInCartType) => void;
  removeProductInCart: (xentralId: xentralProductId) => void;
  increaseSingleProductInCart: (prodcutId: xentralProductId) => void;
  reduceSingleProductInCart: (productId: xentralProductId) => void;
}

const CartContext = createContext<CartContextValue>({
  products: [],
  addProductToCart: () => {},
  removeProductInCart: () => {},
  increaseSingleProductInCart: () => {},
  reduceSingleProductInCart: () => {}
});

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [productInCart, setProductInCart] = React.useState<ProductInCartType[]>([]);

  const addProductToCart = (productDetails: ProductInCartType) => {
    setProductInCart((state) => [...state, productDetails]);
  };

  const removeProductInCart = (xentralId: xentralProductId) => {
    const newCart = productInCart.filter((product) => product.xentralProductData.id !== xentralId);
    setProductInCart(newCart);
  };

  const reduceSingleProductInCart = (productId: xentralProductId) => {
    const newCart = productInCart
      .map((product) => {
        if (product.xentralProductData.id !== productId) return product;
        const currentProductQuantity = product.quantity;
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
      .filter((product) => product.quantity > 0);

    setProductInCart(newCart);
  };

  const increaseSingleProductInCart = (prodcutId: xentralProductId) => {
    const newCart = productInCart.map((product) => {
      if (product.xentralProductData.id !== prodcutId) return product;

      const currentProductQuantity = product.quantity;

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

  return (
    <CartContext.Provider
      value={{
        products: productInCart,
        addProductToCart,
        removeProductInCart,
        reduceSingleProductInCart,
        increaseSingleProductInCart
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
