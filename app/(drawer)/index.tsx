import { YStack, H2, Separator, Theme, Text } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';

const Page = () => {
  return (
    <Theme>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
        padding="$4">
        <H2>Dashboard</H2>
        <Separator />
        <Text color="$color" fontSize="$5" marginTop="$4">
          Here will contain, announcement, rewards, target, notification etc
        </Text>
      </YStack>
    </Theme>
  );
};

export default Page;
