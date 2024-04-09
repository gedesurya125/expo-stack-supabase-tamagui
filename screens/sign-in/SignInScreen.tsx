import React from 'react';
// @ts-ignore
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'tamagui';
import { useSession } from '~/components/AuthContext';
import { useCurrentUser } from '~/utils/useCurrentUser';
import { PinOrPasswordInput } from './components/PinOrPasswordInput';
import { EmailInput } from './components/EmailInput';

export const SignInScreen = ({ isSessionExist }: { isSessionExist: boolean }) => {
  const [step, setStep] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pin, setPin] = React.useState(''); // currently pin can be as password
  const { signInWithEmail, session } = useSession();
  const { hasPin } = useCurrentUser();

  const handleSignIn = ({ email, password }: { email: string; password: string }) => {
    signInWithEmail({ email, password });
  };

  React.useEffect(() => {
    if (isSessionExist && session && session?.user.email) {
      setEmail(session.user.email);
      setStep(2);
    }
  }, [isSessionExist]);

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
