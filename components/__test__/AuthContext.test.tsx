// @ts-nocheck
// ? this test is moved to each component

import { supabase } from '~/utils/supabase';
import { SessionProvider } from '../AuthContext';
// import { render } from 'react-native-testing-library';
import { screen, renderRouter } from 'expo-router/testing-library';
import { Text, View } from 'tamagui';
import { ThemeProvider } from '../ThemeProvider';
import ProfileScreen from '~/app/profile';

describe('Test the Auth Context Component', () => {
  beforeAll(async () => {
    supabase.auth.startAutoRefresh();
    const { error } = await supabase.auth.signInWithPassword({
      email: process.env.EXPO_PUBLIC_TEST_USER_EMAIL,
      password: process.env.EXPO_PUBLIC_TEST_USER_PASSWORD
    });
  });

  afterAll(() => {
    supabase.auth.signOut();
    supabase.auth.stopAutoRefresh();
  });

  it('should load the env file', () => {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    expect(supabaseUrl).toEqual('https://bzrvryzvskjurkzrjcln.supabase.co');
  });

  // it('should render the AuthContext', () => {
  // renderRouter(
  //   <SessionProvider>
  //     <ThemeProvider>
  //       <ProfileScreen />
  //     </ThemeProvider>
  //   </SessionProvider>
  // );

  // const MockComponent = jest.fn(() => {
  //   return <View />;
  // });

  //   renderRouter(['index', 'profile'], {
  //     initialUrl: '/(drawer)'
  //   });

  //   expect(screen.getByTestId('email-input')).toHaveDisplayValue(
  //     process.env.EXPO_PUBLIC_TEST_USER_EMAIL
  //   );
  // });
});
