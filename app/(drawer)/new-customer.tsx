import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { H2, YStack, Separator, ScrollView } from 'tamagui';
import { AddCustomerForm, NewCustomerParams } from '~/components/AddCustomerForm';

export default function NewCustomer() {
  const params = useLocalSearchParams<NewCustomerParams>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1
      }}>
      <YStack backgroundColor="$background" flex={1} padding="$4">
        <ScrollView>
          <H2>Add New Customer</H2>
          <Separator my="$4" />
          <AddCustomerForm mapboxLocationId={params?.id as string} params={params} />
        </ScrollView>
      </YStack>
    </KeyboardAvoidingView>
  );
}
