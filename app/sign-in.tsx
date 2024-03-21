/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import React, { useEffect } from 'react';
import { supabase } from 'utils/supabase';
import Auth from 'components/Auth';
import { useSession } from '~/components/AuthContext';
import { Redirect } from 'expo-router';
import { H1, ScrollView, View } from 'tamagui';
import { TextInput } from '~/components/TextInput';
import { StyledButton } from '~/components/StyledButton';

export default function SignIn() {
  // const [session, setSession] = useState<Session | null>(null);
  const { session } = useSession();

  return session && session.user ? <Redirect href="/(drawer)/" /> : <SignInView />;
}

const SignInView = () => {
  const [step, setStep] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [pin, setPin] = React.useState('123123');

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
      {step === 2 && <PinInput value={pin} setValue={setPin} handleButtonClick={() => {}} />}
    </View>
  );
};

interface LoginInputProps {
  value: any;
  setValue: any;
  handleButtonClick: () => void;
}

const EmailInput = ({ value, setValue, handleButtonClick }: LoginInputProps) => {
  return (
    <>
      <H1>Login</H1>
      <TextInput
        placeholder="john@emai.com"
        minWidth={350}
        mt="$4"
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
      />
      <StyledButton colorStyle="primary" minWidth="$15" mt="$5" onPress={handleButtonClick}>
        Login
      </StyledButton>
    </>
  );
};

const PinInput = ({ value, setValue, handleButtonClick }: LoginInputProps) => {
  const [currentPin, setCurrentPin] = React.useState(['', '', '', '', '', '']);
  return (
    <>
      <H1>Pin</H1>
      <View flexDirection="row" mt="$4">
        {currentPin.map((singlePin, index) => {
          return (
            <TextInput
              key={index}
              minWidth="$4"
              ml={index !== 0 ? '$3' : 0}
              inputMode="decimal"
              keyboardType="decimal-pad"
            />
          );
        })}
      </View>
    </>
  );
};
