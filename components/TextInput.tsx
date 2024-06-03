import { useTheme, Input, View } from 'tamagui';
import { InputContainer } from './InputContainer';

export const TextInput = ({ ...props }: React.ComponentProps<typeof Input>) => {
  const theme = useTheme();

  return (
    <Input
      {...props}
      borderColor="$orange6"
      focusStyle={{
        borderColor: theme.blue6
      }}
      backgroundColor={props?.disabled ? '$gray5' : '$background'}
    />
  );
};

interface LabelledTextInputProps extends React.ComponentProps<typeof View> {
  label: string;
  textInputProps?: React.ComponentProps<typeof TextInput>;
}

export const LabelledTextInput = ({ label, textInputProps, ...props }: LabelledTextInputProps) => {
  return (
    <InputContainer label={label} {...props}>
      <TextInput {...textInputProps} />
    </InputContainer>
  );
};
