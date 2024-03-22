/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import React from 'react';

import { useSession } from '~/components/AuthContext';
import { Redirect, useNavigation } from 'expo-router';
import { H1, Text, View, useCurrentColor, useTheme } from 'tamagui';
import { TextInput } from '~/components/TextInput';
import { StyledButton } from '~/components/StyledButton';
// @ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useCurrentUser } from '~/utils/useCurrentUser';

export default function SignIn() {
  // const [session, setSession] = useState<Session | null>(null);
  const { session, inSessionLoginInfo } = useSession();

  return session && session.user && inSessionLoginInfo.email && inSessionLoginInfo.pin ? (
    <Redirect href="/(drawer)/" />
  ) : (
    <SignInView />
  );
}

const SignInView = () => {
  const [step, setStep] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [pin, setPin] = React.useState(''); // currently pin can be as password
  const { signInWithEmail, loading } = useSession();

  console.log('this is the pin', { pin });

  const handleSignIn = ({ email, password }: { email: string; password: string }) => {
    signInWithEmail({ email, password });
  };

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
          handleButtonClick={handleSignIn}
          email={email}
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

  const isEmailMatch = isSessionExist && session?.user.email === value;
  const isButtonDisabled = isSessionExist ? !isEmailMatch : false;

  return (
    <>
      <H1>Login</H1>
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
}
const PinOrPasswordInput = ({
  value,
  setValue,
  handleButtonClick,
  email
}: CredentialInputProps) => {
  const { isSessionExist } = useSession();

  return (
    <>
      <H1>{isSessionExist ? 'Pin' : 'Password'}</H1>
      {isSessionExist && <PinCodeInput value={value} setValue={setValue} email={email} />}

      {!isSessionExist && (
        <>
          <TextInput
            secureTextEntry
            minWidth={350}
            mt="$4"
            value={value}
            onChangeText={(text) => {
              setValue(text);
            }}
          />
          <StyledButton
            colorStyle="primary"
            mt="$4"
            onPress={() => {
              handleButtonClick({ email, password: value });
            }}>
            Proceed Login
          </StyledButton>
        </>
      )}

      {/* <StyledButton colorStyle="secondary" mt="$4" onPress={handleTogglePinOrPasswordInput}>
        {pinLogin ? 'Deprecated: Login With Password Instead' : 'Use Pin instead'}
      </StyledButton> */}
    </>
  );
};

const PinCodeInput = ({ value, setValue, email }: { value: any; setValue: any; email: string }) => {
  const theme = useTheme();
  const { handleInSessionLogin } = useSession();
  const { currentUser } = useCurrentUser();
  const [error, setError] = React.useState('');

  return (
    <View mt="$4" alignItems="center">
      <SmoothPinCodeInput
        password
        mask="⭑"
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
        onTextChange={(value: any) => setValue(value)}
        onFulfill={(value: any) => {
          console.log('thi si the pin value', { value, userPin: currentUser?.pin });

          if (currentUser?.pin.toString() === value) {
            handleInSessionLogin({ email, pin: value });
          } else {
            setError('Pin is not match');
          }
        }}
      />
      {error && (
        <Text mt="$4" color="red">
          {error}
        </Text>
      )}
    </View>
  );
};

// Pin input source https://www.npmjs.com/package/react-native-smooth-pincode-input
