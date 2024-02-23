import { YStack, H2, Separator, Theme, Button, H1 } from 'tamagui';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function TabOneScreen() {
  return (
    <Theme>
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
        <YStack paddingBottom="$10">
          <H1 fontSize="$12" lineHeight="$12">
            Select Customer
          </H1>
          <OptionsButton />
        </YStack>
      </YStack>
    </Theme>
  );
}

const OptionsButton = () => {
  const navigation = useNavigation();

  return (
    <YStack>
      <Button
        icon={<Ionicons name="people-outline" size={22} />}
        backgroundColor="$orange6"
        marginTop="$5">
        Existing Customer
      </Button>
      <Button
        icon={<Ionicons name="person-add-outline" size={21} />}
        backgroundColor="$blue6"
        marginTop="$4"
        onPress={() => {
          navigation.navigate('new-customer' as never);
        }}>
        New Customer
      </Button>
    </YStack>
  );
};
