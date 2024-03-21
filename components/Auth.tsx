/* eslint-disable import/order */
import React, { useState } from 'react';
import { AppState } from 'react-native';
import { supabase } from '../utils/supabase';
// import { Button, Input } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { View, Button, useTheme, getToken } from 'tamagui';
import { useSession } from './AuthContext';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

interface AuthProps extends React.ComponentProps<typeof View> {
  hideSignInButton?: boolean;
  hideSignUpButton?: boolean;
}

export default function Auth({ hideSignInButton, hideSignUpButton, ...props }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmail, signUpWithEmail, loading } = useSession();

  const theme = useTheme();

  return (
    <View
      padding="$4"
      backgroundColor="$background"
      flex={1}
      justifyContent="center"
      paddingBottom="$20"
      {...props}>
      <Input
        label="Email"
        leftIcon={{
          type: 'font-awesome',
          name: 'envelope',
          color: theme.orange6.val,
          size: getToken('$1', 'size')
        }}
        inputStyle={{
          marginLeft: getToken('$2'),
          color: theme.color.val
        }}
        leftIconContainerStyle={{}}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        leftIcon={{
          type: 'font-awesome',
          name: 'lock',
          color: theme.orange6.val,
          size: getToken('$2', 'size')
        }}
        inputStyle={{
          marginLeft: getToken('$2'),
          color: theme.color.val
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />
      {!hideSignInButton && (
        <Button
          disabled={loading}
          onPress={() => signInWithEmail({ email, password })}
          backgroundColor="$orange6">
          Sign In
        </Button>
      )}
      {!hideSignUpButton && (
        <Button
          disabled={loading}
          onPress={() => signUpWithEmail({ email, password })}
          marginTop="$5"
          backgroundColor="$blue6">
          Sign Up
        </Button>
      )}
    </View>
  );
}
