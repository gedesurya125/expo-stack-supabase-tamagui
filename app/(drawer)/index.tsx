import { YStack, H2, Separator, Theme, Button, H1, Text, View } from 'tamagui';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, Redirect } from 'expo-router';
import { useCurrentUser } from '~/utils/useCurrentUser';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

export default function TabOneScreen() {
  const { currentUser } = useCurrentUser();
  const { customerInfo } = useSelectedCustomerContext();

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
      <Text fontSize="$9" textAlign="center" fontFamily="$heading2">
        Hi {currentUser?.full_name},
      </Text>
      <Text marginTop="$4" fontFamily="$heading2">
        let's start your sales presentation
      </Text>
      <OptionsButton />
    </YStack>
  );
}

const OptionsButton = () => {
  const navigation = useNavigation();

  return (
    <YStack width={300}>
      <Button
        icon={<Ionicons name="people-outline" size={22} />}
        backgroundColor="$primary"
        marginTop="$5"
        onPress={() => {
          navigation.navigate('existing-customer' as never);
        }}>
        Existing Customer
      </Button>
      <Button
        icon={<Ionicons name="person-add-outline" size={21} />}
        backgroundColor="$secondary"
        marginTop="$4"
        onPress={() => {
          navigation.navigate('industry-select' as never);
        }}>
        New Customer
      </Button>
    </YStack>
  );
};
