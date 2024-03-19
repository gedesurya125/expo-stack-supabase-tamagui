import React from 'react';
import { H2, YStack, Separator, ScrollView } from 'tamagui';
import { AddCustomerForm } from '~/components/AddCustomerForm';

export default function NewCustomer() {
  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      <ScrollView>
        <H2>Add New Customer</H2>
        <Separator my="$4" />
        <AddCustomerForm />
      </ScrollView>
    </YStack>
  );
}
