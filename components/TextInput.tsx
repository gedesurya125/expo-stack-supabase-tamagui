import { useField } from 'formik';
import { useTheme, Input } from 'tamagui';
import { InputContainer } from './InputContainer';

export const TextInput = ({ ...props }: React.ComponentProps<typeof Input>) => {
  const theme = useTheme();

  return (
    <Input
      {...props}
      borderColor="$orange6"
      focusStyle={{
        borderColor: theme.blue6,
      }}
    />
  );
};

interface LabelledTextInputProps {
  label: string;
  textInputProps?: React.ComponentProps<typeof TextInput>;
}

export const LabelledTextInput = ({ label, textInputProps }: LabelledTextInputProps) => {
  return (
    <InputContainer label={label}>
      <TextInput {...textInputProps} />
    </InputContainer>
  );
};
