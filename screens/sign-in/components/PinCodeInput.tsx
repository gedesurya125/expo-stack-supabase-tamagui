import React from 'react';
// @ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { View, useTheme, Text } from 'tamagui';

export const PinCodeInput = ({
  value,
  onFulFill,
  onTextChange,
  errorText,
  mask
}: {
  value: any;
  onFulFill?: (value: string) => void;
  onTextChange: (value: string) => void;
  errorText?: string;
  mask?: string;
}) => {
  const theme = useTheme();

  return (
    <View mt="$4" alignItems="center">
      <SmoothPinCodeInput
        password
        mask={mask}
        codeLength={6}
        cellSize={50}
        cellStyle={{
          borderWidth: 2,
          borderColor: theme.primary.val
        }}
        cellStyleFocused={{
          borderColor: theme.secondary.val
        }}
        textStyle={{
          fontSize: 24,
          color: theme.color.val
        }}
        textStyleFocused={{}}
        value={value}
        onTextChange={onTextChange}
        onFulfill={onFulFill}
      />
      {errorText && (
        <Text mt="$4" color="red">
          {errorText}
        </Text>
      )}
    </View>
  );
};
