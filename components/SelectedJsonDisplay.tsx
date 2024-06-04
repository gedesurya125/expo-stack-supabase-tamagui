import { Text, YStack } from 'tamagui';

interface SelectedJsonDisplayProps extends React.ComponentProps<typeof YStack> {
  itemsToDisplay: any;
  displayedKeys: string[];
}

export const SelectedJsonDisplay = ({
  itemsToDisplay,
  displayedKeys,
  ...props
}: SelectedJsonDisplayProps) => {
  return (
    <YStack flex={1} {...props}>
      {displayedKeys.map((data, index) => {
        return (
          <Text color="$color" key={index}>
            {data}: {itemsToDisplay[data as keyof any]}
          </Text>
        );
      })}
    </YStack>
  );
};
