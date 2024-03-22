/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import React from 'react';

import { useSession } from '~/components/AuthContext';
import { Redirect, useNavigation } from 'expo-router';
import { H1, H2, H3, ScrollView, Text, View, useCurrentColor, useTheme } from 'tamagui';
import { TextInput } from '~/components/TextInput';
import { StyledButton } from '~/components/StyledButton';
// @ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useCurrentUser } from '~/utils/useCurrentUser';
import { supabase } from '~/utils/supabase';
import { Session } from '@supabase/supabase-js';

export default function SignIn() {
  // const [session, setSession] = useState<Session | null>(null);
  const { session, inSessionLoginInfo, isSessionExist } = useSession();

  return session && session.user && inSessionLoginInfo.email && inSessionLoginInfo.pin ? (
    <Redirect href="/(drawer)/" />
  ) : (
    <SignInView isSessionExist={isSessionExist} />
  );
}

const SignInView = ({ isSessionExist }: { isSessionExist: boolean }) => {
  console.log('is sesstion exist', isSessionExist);
  const [step, setStep] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pin, setPin] = React.useState(''); // currently pin can be as password
  const { signInWithEmail, loading, session } = useSession();
  const { hasPin } = useCurrentUser();

  console.log('this is the pin', { pin });

  const handleSignIn = ({ email, password }: { email: string; password: string }) => {
    signInWithEmail({ email, password });
  };

  React.useEffect(() => {
    if (isSessionExist && session && session?.user.email) {
      setEmail(session.user.email);
      setStep(2);
    }
  }, [isSessionExist]);

  return (
    <View flex={1} backgroundColor="$background" justifyContent="center" alignItems="center">
      {step === 1 && (
        <EmailInput
          value={email}
          setValue={setEmail}
          handleButtonClick={() => {
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <PinOrPasswordInput
          value={pin}
          setValue={setPin}
          password={password}
          setPassword={setPassword}
          handleButtonClick={handleSignIn}
          email={email}
          isSessionExist={isSessionExist}
          hasPin={hasPin}
        />
      )}
    </View>
  );
};

// todo fix the login input props
interface LoginInputProps {
  value: any;
  setValue: any;
  handleButtonClick: any;
}

const EmailInput = ({ value, setValue, handleButtonClick }: LoginInputProps) => {
  const navigation = useNavigation();
  const { isSessionExist, session } = useSession();
  const { currentUser } = useCurrentUser();

  const isEmailMatch = isSessionExist && session?.user.email === value;
  const isButtonDisabled = isSessionExist ? !isEmailMatch : false;

  const welcomeMessage =
    isSessionExist && currentUser?.full_name
      ? `Hi ${currentUser?.full_name}, welcome back!!`
      : 'Hi, welcome to Ambratect app';

  return (
    <>
      <H2>{welcomeMessage}</H2>
      <TextInput
        autoCapitalize="none"
        placeholder="john@emai.com"
        minWidth={350}
        mt="$4"
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
      />
      <StyledButton
        colorStyle="primary"
        minWidth="$15"
        mt="$5"
        onPress={handleButtonClick}
        disabled={isButtonDisabled}
        backgroundColor={isButtonDisabled ? 'gray' : '$primary'}>
        Login
      </StyledButton>
      {!isSessionExist && (
        <StyledButton
          colorStyle="clear"
          minWidth="$15"
          mt="$5"
          onPress={() => {
            navigation.navigate('sign-up' as never);
          }}>
          Sign Up
        </StyledButton>
      )}
    </>
  );
};

interface CredentialInputProps {
  value: any;
  setValue: any;
  handleButtonClick: any;
  email: string;
  isSessionExist: boolean;
  hasPin: boolean;
  password: string;
  setPassword: any;
}
const PinOrPasswordInput = ({
  value,
  setValue,
  handleButtonClick,
  email,
  isSessionExist,
  hasPin,
  password,
  setPassword
}: CredentialInputProps) => {
  return (
    <>
      <H1>{isSessionExist ? 'Pin' : 'Password'}</H1>
      {isSessionExist && (
        <PinVerification value={value} setValue={setValue} email={email} hasPin={hasPin} />
      )}

      {!isSessionExist && (
        <>
          <TextInput
            secureTextEntry
            minWidth={350}
            mt="$4"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <StyledButton
            colorStyle="primary"
            mt="$4"
            onPress={() => {
              handleButtonClick({ email, password });
            }}>
            Proceed Login
          </StyledButton>
        </>
      )}
    </>
  );
};

// Reused components

const PinVerification = ({
  value,
  setValue,
  email,
  hasPin
}: {
  value: string;
  setValue: any;
  email: string;
  hasPin: boolean;
}) => {
  const { handleInSessionLogin, session } = useSession();
  const navigation = useNavigation();

  const { currentUser } = useCurrentUser();
  const [error, setError] = React.useState('');

  const updateUserPin = async (pin: string) => {
    const updates = {
      id: session?.user.id,
      username: currentUser?.username,
      full_name: currentUser?.full_name,
      website: currentUser?.website,
      avatar_url: currentUser?.avatar_url,
      pin,
      updated_at: new Date()
    };
    try {
      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      } else {
        handleInSessionLogin({ email, pin });
        navigation.navigate('(drawer)' as never);
      }
    } catch (err) {
      console.log('error update pin', err);
    }
  };

  return hasPin ? (
    <PinCodeInput
      value={value}
      onTextChange={(value) => setValue(value)}
      onFulFill={(value) => {
        if (currentUser?.pin.toString() === value) {
          handleInSessionLogin({ email, pin: value });
        } else {
          setError('Pin is not match');
        }
      }}
      errorText={error}
      mask="⭑"
    />
  ) : (
    <>
      <H3>Create New</H3>
      <PinCodeInput value={value} onTextChange={(value) => setValue(value)} errorText={error} />
      <StyledButton colorStyle="primary" mt="$6" onPress={async () => await updateUserPin(value)}>
        Confirm Pin
      </StyledButton>
    </>
  );
};

const PinCodeInput = ({
  value,
  onFulFill,
  onTextChange,
  errorText,
  mask
}: {
  value: any;
  onFulFill?: (value: string) => void;
  onTextChange: (value: string) => void;
  errorText?: string;
  mask?: string;
}) => {
  const theme = useTheme();

  return (
    <View mt="$4" alignItems="center">
      <SmoothPinCodeInput
        password
        mask={mask}
        codeLength={6}
        cellSize={50}
        cellStyle={{
          borderWidth: 2,
          borderColor: theme.primary.val
        }}
        cellStyleFocused={{
          borderColor: theme.secondary.val
        }}
        textStyle={{
          fontSize: 24,
          color: theme.color.val
        }}
        textStyleFocused={{}}
        value={value}
        onTextChange={onTextChange}
        onFulfill={onFulFill}
      />
      {errorText && (
        <Text mt="$4" color="red">
          {errorText}
        </Text>
      )}
    </View>
  );
};

// Pin input source https://www.npmjs.com/package/react-native-smooth-pincode-input
