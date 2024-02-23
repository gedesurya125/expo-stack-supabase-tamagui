/* eslint-disable import/order */
import React, { useState } from 'react';
import { Alert, StyleSheet, AppState } from 'react-native';
import { supabase } from '../utils/supabase';
// import { Button, Input } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { View, Button, useTheme, getToken, Avatar } from 'tamagui';

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

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  const theme = useTheme();

  return (
    <View
      padding="$4"
      backgroundColor="$background"
      flex={1}
      justifyContent="center"
      paddingBottom="$20">
      <Input
        label="Email"
        leftIcon={{
          type: 'font-awesome',
          name: 'envelope',
          color: theme.orange6.val,
          size: getToken('$1', 'size'),
        }}
        inputStyle={{
          marginLeft: getToken('$2'),
          color: theme.color.val,
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
          size: getToken('$2', 'size'),
        }}
        inputStyle={{
          marginLeft: getToken('$2'),
          color: theme.color.val,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />
      <Button disabled={loading} onPress={() => signInWithEmail()} backgroundColor="$orange6">
        Sign In
      </Button>
      <Button
        disabled={loading}
        onPress={() => signUpWithEmail()}
        marginTop="$5"
        backgroundColor="$blue6">
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
