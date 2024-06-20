import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Text, View, useTheme } from 'tamagui';

import { TextInput } from './TextInput';
import { InputContainer } from './InputContainer';
import moment from 'moment';

interface DateTimePickerProps {
  value: any;
  handleChange: (e: any) => void;
  onBlur: (e: any) => void;
  mode?: 'date' | 'time';
}

export const DateTimePicker = ({ value, handleChange, onBlur, mode }: DateTimePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [value, setValue] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // setValue(date);
    handleChange && handleChange(date.toISOString());
    hideDatePicker();
  };

  const theme = useTheme();

  const momentDate = moment(value);

  return (
    <>
      <View position="relative" flexDirection="row" onBlur={onBlur}>
        <TextInput
          // value={mode === 'time' ? new Date(value).toTimeString() : new Date(value).toDateString()}
          value={
            mode === 'time' ? new Date(value).toTimeString() : momentDate.toDate().toDateString()
          }
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
          <Ionicons
            name={mode === 'time' ? 'time-outline' : 'calendar-outline'}
            size={20}
            color={theme.color.val}
          />
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode || 'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor={theme.color.val}
        />
      </View>
      {mode !== 'time' && <SelectedWeek date={momentDate} />}
    </>
  );
};

export const LabelledDateTimePicker = ({
  label,
  dateTimePickerProps
}: {
  label: string;
  dateTimePickerProps: React.ComponentProps<typeof DateTimePicker>;
}) => {
  return (
    <InputContainer label={label}>
      <DateTimePicker {...dateTimePickerProps} />
    </InputContainer>
  );
};

const SelectedWeek = ({ date }: { date: moment.Moment }) => {
  const weekNumber = date.isoWeek();
  const fromDate = date.startOf('isoWeek').toDate().toDateString();
  const toDate = date.endOf('isoWeek').toDate().toDateString();
  return <Text fontSize="$5" mt="$2">{`Week ${weekNumber} \nFrom ${fromDate} to ${toDate}`}</Text>;
};
