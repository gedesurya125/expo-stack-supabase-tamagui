import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'tamagui';

import { SessionProvider } from '~/components/AuthContext';
import { ExistingCustomerContextProvider } from '~/context/CustomersContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query/build/useReactQueryDevTools';
import { SelectedCustomerContextProvider } from '~/context/SelectedCustomerContext';
import * as SystemUI from 'expo-system-ui';
import { CartContextProvider } from '~/context/CartContext';
import { ThemeProvider } from 'react-native-elements';

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync('black');

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)'
};

const queryClient = new QueryClient();

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
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </SessionProvider>
  );
}

const Navigator = () => {
  const theme = useTheme();
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ExistingCustomerContextProvider>
        <SelectedCustomerContextProvider>
          <CartContextProvider>
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
                <Stack.Screen
                  name="profile"
                  options={{ title: 'Profile', presentation: 'modal' }}
                />
                <Stack.Screen
                  name="customer-detail-modal"
                  options={{ title: 'Customer Detail', presentation: 'modal' }}
                />
                <Stack.Screen
                  name="cart-detail-modal"
                  options={{
                    title: 'Cart Detail',
                    presentation: 'modal'
                  }}
                />
              </Stack>
            </GestureHandlerRootView>
          </CartContextProvider>
        </SelectedCustomerContextProvider>
      </ExistingCustomerContextProvider>
    </QueryClientProvider>
  );
};
