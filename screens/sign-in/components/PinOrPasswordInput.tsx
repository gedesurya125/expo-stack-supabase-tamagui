import React from 'react';
import { H1, Spinner } from 'tamagui';
import { StyledButton } from '~/components/StyledButton';
import { TextInput } from '~/components/TextInput';
import { PinVerification } from './PinVerification';
import { CredentialInputProps } from './EmailInput';
import { useCurrentUser } from '~/utils/useCurrentUser';

export const PinOrPasswordInput = ({
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
      <H1 fontFamily="$heading2">{isSessionExist ? 'Pin' : 'Password'}</H1>
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
            testID="password-input"
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

export const PinInput = ({ pin, setPin, email }: { pin: string; setPin: any; email: string }) => {
  const { hasPin, loading } = useCurrentUser();

  return (
    <InputWrapper headline="Pin">
      {loading ? (
        <Spinner size="large" />
      ) : (
        <PinVerification value={pin} setValue={setPin} email={email} hasPin={hasPin} />
      )}
    </InputWrapper>
  );
};

export const PasswordInput = ({
  password,
  setPassword,
  handleLogin,
  email
}: {
  password: string;
  setPassword: any;
  handleLogin: ({ email, password }: { email: string; password: string }) => void;
  email: string;
}) => {
  return (
    <InputWrapper headline="Password">
      <TextInput
        secureTextEntry
        minWidth={350}
        mt="$4"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        testID="password-input"
      />
      <StyledButton
        colorStyle="primary"
        mt="$4"
        onPress={() => {
          handleLogin({ email, password });
        }}>
        Proceed Login
      </StyledButton>
    </InputWrapper>
  );
};

const InputWrapper = ({ children, headline }: { children: React.ReactNode; headline: string }) => {
  return (
    <>
      <H1 fontFamily="$heading2">{headline}</H1>
      {children}
    </>
  );
};
