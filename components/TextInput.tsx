import { useTheme, Input } from 'tamagui';

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
