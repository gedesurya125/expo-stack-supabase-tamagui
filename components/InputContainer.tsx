import { View, Text } from 'tamagui';

interface InputContainerProps extends React.ComponentProps<typeof View> {
  label: string;
  children: React.ReactNode;
}

export const InputContainer = ({ label, children, ...props }: InputContainerProps) => {
  return (
    <View {...props}>
      <Text>{label}</Text>
      <View marginTop="$2">{children}</View>
    </View>
  );
};
