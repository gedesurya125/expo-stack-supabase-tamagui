import { YStack, H2, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';

const Page = () => {
  return (
    <Theme>
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
        <H2>Home</H2>
        <Separator />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </YStack>
    </Theme>
  );
};

export default Page;
