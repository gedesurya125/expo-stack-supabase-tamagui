/* eslint-disable import/order */
import React, { useState } from 'react';
// import { AppState } from 'react-native';
// import { supabase } from '../utils/supabase';
// import { Button, Input } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { View, Button, useTheme, getToken, Spinner } from 'tamagui';
import { useSession } from './AuthContext';
import { TextInput } from './TextInput';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// });

interface AuthProps extends React.ComponentProps<typeof View> {
  hideSignInButton?: boolean;
  hideSignUpButton?: boolean;
}

export default function Auth({ hideSignInButton, hideSignUpButton, ...props }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signInWithEmail, signUpWithEmail, loading } = useSession();

  const isButtonDisabled = loading || password !== confirmPassword || !confirmPassword || !email;

  return (
    <View
      padding="$4"
      backgroundColor="$background"
      flex={1}
      justifyContent="center"
      paddingBottom="$20"
      {...props}>
      <EmailInput value={email} setValue={setEmail} />
      {/* <Input
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
      /> */}
      {/* <Input
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
      /> */}
      <PasswordInput value={password} setValue={setPassword} />
      <PasswordInput
        value={confirmPassword}
        setValue={setConfirmPassword}
        placeholder="Confirm Password"
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
          disabled={isButtonDisabled}
          onPress={() => signUpWithEmail({ email, password })}
          marginTop="$5"
          backgroundColor={isButtonDisabled ? '$gray8' : '$blue6'}>
          {loading ? <Spinner /> : 'Sign Up'}
        </Button>
      )}
    </View>
  );
}

const EmailInput = ({ value, setValue }: { value: string; setValue: any }) => {
  return (
    <TextInput
      autoCapitalize="none"
      placeholder="email@address.com"
      value={value}
      onChangeText={(text) => {
        setValue(text);
      }}
    />
  );
};

const PasswordInput = ({
  value,
  setValue,
  placeholder = 'Password'
}: {
  value: string;
  setValue: any;
  placeholder?: string;
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setValue(text);
      }}
      secureTextEntry
      marginTop="$4"
    />
  );
};
