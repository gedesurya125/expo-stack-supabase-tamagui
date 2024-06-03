import { Link } from 'expo-router';
import { Heading, Text, View, YStack } from 'tamagui';
import { StyledButton } from '~/components/StyledButton';

export default function CheckoutOptions() {
  return (
    <YStack flex={1} backgroundColor="$background" justifyContent="center" alignItems="center">
      <View>
        <Heading>Select checkout options</Heading>
        <StyledButton mt="$4" colorStyle="primary">
          Checkout Now
        </StyledButton>
        <Text textAlign="center" my="$3">
          or
        </Text>
        <Link asChild href="/(drawer)/checkout/send-as-quote">
          <StyledButton colorStyle="secondary">Send as Quote</StyledButton>
        </Link>
      </View>
    </YStack>
  );
}
