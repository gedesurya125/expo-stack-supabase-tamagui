import React from 'react';
import { YStack, Theme, Heading } from 'tamagui';

import { useLocalSearchParams } from 'expo-router';

export default function ModalScreen() {
  const params = useLocalSearchParams();

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
      <Heading>Basic Info: </Heading>
    </YStack>
  );
};
