import React from 'react';
import { H1 } from 'tamagui';
import { StyledButton } from '~/components/StyledButton';
import { TextInput } from '~/components/TextInput';
import { PinVerification } from './PinVerification';
import { CredentialInputProps } from './EmailInput';

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
