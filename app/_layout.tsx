import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, View, useTheme } from 'tamagui';

import config from '../tamagui.config';
import { SessionProvider } from '~/components/AuthContext';
import { ExistingCustomerContextProvider } from '~/context/CustomersContext';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)'
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SessionProvider>
      {/* At the moment we just use dark */}
      <TamaguiProvider config={config} defaultTheme="dark">
        <Navigator />
      </TamaguiProvider>
    </SessionProvider>
  );
}

const Navigator = () => {
  const theme = useTheme();

  return (
    <ExistingCustomerContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background.val
            },
            headerTitleStyle: {
              color: theme.color.val
            }
          }}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ title: 'Profile', presentation: 'modal' }} />
          <Stack.Screen
            name="customer-detail-modal"
            options={{ title: 'Customer Detail', presentation: 'modal' }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ExistingCustomerContextProvider>
  );
};
