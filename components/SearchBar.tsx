import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Input, View, getTokenValue, useTheme } from 'tamagui';

interface SearchBarProps extends React.ComponentProps<typeof View> {
  currentValue: any;
  setValue: (value: any) => any;
  placeholder?: string;
}

// TODO: reuse this component latter
export const SearchBar = ({
  currentValue,
  setValue,
  placeholder = 'search...',
  ...props
}: SearchBarProps) => {
  const theme = useTheme();

  return (
    <View position="relative" justifyContent="center" {...props}>
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.color.val}
        style={{
          position: 'absolute',
          zIndex: 1,
          left: getTokenValue('$3', 'space')
        }}
      />
      <Input
        placeholder={placeholder}
        paddingLeft="$8"
        value={currentValue}
        onChangeText={(value) => {
          setValue(value);
        }}
      />
    </View>
  );
};
