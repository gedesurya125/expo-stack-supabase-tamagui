import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { H2, YStack, Separator, ScrollView } from 'tamagui';
import { AddCustomerForm } from '~/components/AddCustomerForm';

export type NewCustomerParams = {
  name: string;
  address: string;
  id: string;
};

export default function NewCustomer() {
  const params = useLocalSearchParams<NewCustomerParams>();

  console.log('this i is the params', params);

  // let customerBasicInfo: CustomerBasicInfo;

  // if (params?.address && typeof params?.address === 'string') {
  //   const customerInfo = params?.address?.split(',').map((text) => text.trim());
  //   console.log('this is the customer info', customerInfo);

  //   const customerZipNumber = customerInfo[3].match(/\d*$/);

  //   customerBasicInfo = {
  //     name: customerInfo[0],
  //     address: customerInfo[1],
  //     city: customerInfo[2],
  //     state: customerInfo[3].replace(/\s{1}\d*$/, ''),
  //     country: customerInfo[4],
  //     zip: customerZipNumber ? customerZipNumber[0] : ''
  //   };
  //   console.log('NEW customer basic info', customerBasicInfo);
  // }

  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      <ScrollView>
        <H2>Add New Customer</H2>
        <Separator my="$4" />
        <AddCustomerForm mapboxLocationId={params?.id as string} params={params} />
      </ScrollView>
    </YStack>
  );
}

export type CustomerBasicInfo = {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

export const getCustomerBasicInfo = (address: string): CustomerBasicInfo => {
  const customerInfo = address?.split(',').map((text) => text.trim());

  const customerZipNumber = customerInfo[3].match(/\d*$/);

  const customerBasicInfo = {
    name: customerInfo[0],
    address: customerInfo[1],
    city: customerInfo[2],
    state: customerInfo[3].replace(/\s{1}\d*$/, ''),
    country: customerInfo[4],
    zip: customerZipNumber ? customerZipNumber[0] : ''
  };

  return customerBasicInfo;
};
