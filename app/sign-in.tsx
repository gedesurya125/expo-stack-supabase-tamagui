/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import React from 'react';

import { useSession } from '~/components/AuthContext';
import { Redirect } from 'expo-router';
import { useCurrentColor } from 'tamagui';
// @ts-ignore
import { Session } from '@supabase/supabase-js';
import { SignInScreen } from '~/screens/sign-in/SignInScreen';

export default function SignIn() {
  // const [session, setSession] = useState<Session | null>(null);
  const { session, inSessionLoginInfo, isSessionExist } = useSession();

  return session && session.user && inSessionLoginInfo.email && inSessionLoginInfo.pin ? (
    <Redirect href="/(drawer)/" />
  ) : (
    <SignInScreen isSessionExist={isSessionExist} />
  );
}
