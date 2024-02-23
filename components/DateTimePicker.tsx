import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Input, View, useTheme } from 'tamagui';
import { TextInput } from './TextInput';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export const DateTimePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [value, setValue] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setValue(date);
    hideDatePicker();
  };

  const theme = useTheme();

  return (
    <View position="relative" flexDirection="row">
      <TextInput
        value={value.toLocaleDateString()}
        onTouchStart={showDatePicker}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        flex={1}
      />
      <Button
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        backgroundColor="$orange6"
        onPress={showDatePicker}>
        <Ionicons name="calendar-outline" size={20} color={theme.color.val} />
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor={theme.color.val}
      />
    </View>
  );
};
