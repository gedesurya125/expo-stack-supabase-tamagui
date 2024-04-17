import React from 'react';
// @ts-ignore
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, View } from 'tamagui';
import { useSession } from '~/components/AuthContext';
import { getCurrentUser } from '~/utils/useCurrentUser';
import { PasswordInput, PinInput, PinOrPasswordInput } from './components/PinOrPasswordInput';
import { EmailInput } from './components/EmailInput';
import { Redirect } from 'expo-router';

export const SignInScreen = ({ isSessionExist }: { isSessionExist: boolean }) => {
  const [step, setStep] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pin, setPin] = React.useState(''); // currently pin can be as password
  const { signInWithEmail, session, handleInSessionLogin, inSessionLoginInfo } = useSession();

  // ? when sign in don't as user the pin
  const handleSignIn = async ({ email, password }: { email: string; password: string }) => {
    await signInWithEmail({ email, password });
    const loggedInUserData = await getCurrentUser();
    if (loggedInUserData?.pin) {
      handleInSessionLogin({ email, pin: loggedInUserData?.pin });
    }
    if (!loggedInUserData?.pin && loggedInUserData?.username) {
      setStep(3);
    }
  };

  React.useEffect(() => {
    if (isSessionExist && session && session?.user.email && step === 1) {
      setEmail(session.user.email);
      setStep(3);
    }
  }, [session?.user.email]);

  // ?: source https://reactnative.dev/docs/keyboardavoidingview
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1
      }}>
      <ScrollView
        backgroundColor="$background"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        testID="sign-in-screen-container">
        {step === 1 && !isSessionExist && (
          <EmailInput
            value={email}
            setValue={setEmail}
            handleButtonClick={() => {
              setStep(2);
            }}
          />
        )}
        {step === 2 && !isSessionExist && (
          <PasswordInput
            password={password}
            setPassword={setPassword}
            handleLogin={handleSignIn}
            email={email}
          />
        )}
        {step === 3 && isSessionExist && <PinInput pin={pin} setPin={setPin} email={email} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
