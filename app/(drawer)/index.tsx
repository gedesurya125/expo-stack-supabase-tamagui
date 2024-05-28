import React from 'react';
import { YStack, H2, Separator, Theme, Button, H1, Text, View } from 'tamagui';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, Redirect } from 'expo-router';
import { useCurrentUser } from '~/utils/useCurrentUser';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  const { currentUser } = useCurrentUser();
  const { customerInfo } = useSelectedCustomerContext();

  // ==== start authentication =====

  const TENANT_ID = process.env.EXPO_PUBLIC_TENANT_ID || '';
  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID || '';
  const TOKEN_NAME = process.env.EXPO_PUBLIC_TOKEN_NAME || '';
  const GRANT_TYPE = process.env.EXPO_PUBLIC_GRANT_TYPE || '';
  const ACCESS_TOKEN_URL = process.env.EXPO_PUBLIC_ACCESS_TOKEN_URL || '';
  const CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET || '';
  const SCOPE = process.env.EXPO_PUBLIC_SCOPE || '';

  // We store the JWT in here
  const [token, setToken] = React.useState<string | null>(null);

  console.log('this is the token', token);

  React.useEffect(() => {
    const fetchToken = async () => {
      const details = {
        grant_type: GRANT_TYPE,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: SCOPE
      };

      let formBody: any = [];
      for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property as keyof typeof details]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      const authResponse = await fetch(ACCESS_TOKEN_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log('error fetch the token', err);
        });

      console.log('this is the auth res', authResponse);
    };
    fetchToken();
  }, []);

  // ==== end authentication ====
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
      <Text mt="$4" textAlign="center">
        Or
      </Text>
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
