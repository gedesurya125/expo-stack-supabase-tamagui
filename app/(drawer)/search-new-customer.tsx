import React from 'react';
import { H1, YStack } from 'tamagui';

export default function SearchNewCustomer() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
      <YStack paddingBottom="$10">
        <H1 fontSize="$12" lineHeight="$12">
          Select Customer
        </H1>
      </YStack>
    </YStack>
  );
}
