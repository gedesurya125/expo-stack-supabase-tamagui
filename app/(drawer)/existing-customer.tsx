import { YStack, H2, Separator, Theme } from 'tamagui';

export default function TabTwoScreen() {
  return (
    <Theme>
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
        <H2>Tab Two</H2>
        <Separator />
      </YStack>
    </Theme>
  );
}
