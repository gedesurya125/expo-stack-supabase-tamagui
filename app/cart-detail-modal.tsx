import React from 'react';
import { YStack, Theme, Heading } from 'tamagui';

import { StyledButton } from '~/components/StyledButton';
import { useCartContext } from '~/context/CartContext';
import { Link } from 'expo-router';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';
import { ProductCartList } from '~/components/ProductInCartList';

export default function ModalScreen() {
  const status = null;

  return <Theme>{status === 'pending' ? <LoadingView /> : <CartInfo />}</Theme>;
}

const LoadingView = () => {
  return (
    <YStack backgroundColor="$background" flex={1} justifyContent="center" alignItems="center">
      <Heading>Loading...</Heading>
    </YStack>
  );
};

const CartInfo = () => {
  return (
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$4" paddingVertical="$4">
      <Heading>Customer Cart: </Heading>
      <ProductCartList />
      <CheckoutButton />
    </YStack>
  );
};

const CheckoutButton = () => {
  const { customerInfo } = useSelectedCustomerContext();
  const { totalProductsQuantity } = useCartContext();

  console.log('this is the total productquantity', totalProductsQuantity);
  const isDisableButton = totalProductsQuantity === 0;
  const hasCustomerInfo = !!customerInfo;

  return (
    <Link
      asChild
      href={hasCustomerInfo ? '/checkout/options' : '/(drawer)/new-customer'}
      disabled={isDisableButton}>
      <StyledButton colorStyle={isDisableButton ? 'disabled' : 'primary'}>Checkout</StyledButton>
    </Link>
  );
};
