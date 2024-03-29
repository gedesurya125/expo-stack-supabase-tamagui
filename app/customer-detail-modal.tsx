import React from 'react';
import { YStack, Theme, Text, XStack, Header, Heading } from 'tamagui';

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getCustomerById, useCustomer } from '~/api/xentral/useCustomer';
import { StyledButton } from '~/components/StyledButton';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';
import { Ionicons } from '@expo/vector-icons';

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const { customerInfo: currentSelectedCustomerInfo } = useSelectedCustomerContext();

  const { status, data, error, isFetching } = useCustomer(params?.id as string);

  const customerData = data?.data;

  const displayShopProps = currentSelectedCustomerInfo?.id === params?.id;

  return (
    <Theme>
      {status === 'pending' ? (
        <LoadingView />
      ) : (
        <CustomerInfo customerData={customerData} displayShopProps={displayShopProps} />
      )}
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
  customerData: any;
  displayShopProps: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$4" paddingVertical="$4">
      <Heading>Basic Info: </Heading>
      <CustomerInfoItem label="id" value={customerData?.id} />
      <CustomerInfoItem label="number" value={customerData?.number} />
      <CustomerInfoItem label="type" value={customerData?.type} />
      <CustomerInfoItem label="name" value={customerData?.general?.name} />
      <Heading mt="$5">Address Info: </Heading>
      <CustomerInfoItem label="city" value={customerData?.general?.address?.city} />
      <CustomerInfoItem label="country" value={customerData?.general?.address?.country} />
      <CustomerInfoItem label="note" value={customerData?.general?.address?.note} />
      <CustomerInfoItem label="state" value={customerData?.general?.address?.state} />
      <CustomerInfoItem label="street" value={customerData?.general?.address.street} />
      <CustomerInfoItem label="zip" value={customerData?.general?.address.zip} />

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
