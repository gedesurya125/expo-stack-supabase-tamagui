import { View, Text } from 'tamagui';

export const InputContainer = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <View marginTop="$2">{children}</View>
    </View>
  );
};
