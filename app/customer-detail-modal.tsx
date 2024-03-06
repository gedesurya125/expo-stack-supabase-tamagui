import { YStack, Theme, Text } from 'tamagui';

import { useLocalSearchParams } from 'expo-router';

export default function ModalScreen() {
  const params = useLocalSearchParams();

  return (
    <Theme>
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
        <Text>Hello: {params.id}</Text>
      </YStack>
    </Theme>
  );
}
