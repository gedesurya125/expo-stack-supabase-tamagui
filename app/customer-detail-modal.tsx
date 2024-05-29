import React from 'react';
import { YStack, Theme, Text, XStack, Heading } from 'tamagui';

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyledButton } from '~/components/StyledButton';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';
import { Ionicons } from '@expo/vector-icons';
import { useSingleCustomer } from '~/api/weClapp';
import { WeClappCustomer } from '~/api/weClapp/types/customer';
import { useSingleBcCustomers } from '~/api/businessCentral/useSingleBcCustomer';
import { BcCustomer } from '~/api/businessCentral/types/customer';

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const { customerInfo: currentSelectedCustomerInfo } = useSelectedCustomerContext();

  // const { status, data, error, isFetching } = useCustomer(params?.id as string);
  // const { data, isLoading } = useSingleCustomer(params?.id as string);
  const { data, isLoading, error } = useSingleBcCustomers({ customerId: params.id as string });

  const displayShopProps = currentSelectedCustomerInfo?.id === params?.id;

  console.log('this is the customer detail', data);

  return (
    <Theme>
      {isLoading ? (
        <LoadingView />
      ) : data ? (
        <CustomerInfo customerData={data} displayShopProps={displayShopProps} />
      ) : null}
    </Theme>
  );
}

const LoadingView = () => {
  return (
    <YStack backgroundColor="$background" flex={1} justifyContent="center" alignItems="center">
      <Heading>Loading...</Heading>
    </YStack>
  );
};

const CustomerInfo = ({
  customerData,
  displayShopProps
}: {
  customerData?: BcCustomer;
  displayShopProps: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$4" paddingVertical="$4">
      <Text>{JSON.stringify(customerData, null, 2)}</Text>

      <XStack gap="$3" mt="$8" justifyContent="center">
        <StyledButton colorStyle="primary" icon={<Ionicons name="pencil-outline" size={18} />}>
          Edit
        </StyledButton>
        {displayShopProps && (
          <StyledButton
            colorStyle="secondary"
            onPress={() => {
              navigation.navigate('cart-detail-modal' as never);
            }}
            icon={<Ionicons name="cart-outline" size={20} />}>
            Cart
          </StyledButton>
        )}
        {!displayShopProps && (
          <StyledButton colorStyle="danger" icon={<Ionicons name="trash-outline" size={19} />}>
            Delete
          </StyledButton>
        )}
      </XStack>
    </YStack>
  );
};

const CustomerInfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <XStack>
      <Text fontWeight="bold">{label}</Text>
      <Text>: </Text>
      <Text>{value}</Text>
    </XStack>
  );
};
