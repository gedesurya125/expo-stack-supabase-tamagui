import React from 'react';
import { useNavigation } from 'expo-router';
import { View, H2 } from 'tamagui';
import { useSession } from '~/components/AuthContext';
import { StyledButton } from '~/components/StyledButton';
import { TextInput } from '~/components/TextInput';
import { useCurrentUser } from '~/utils/useCurrentUser';

// todo fix the login input props
interface LoginInputProps {
  value: any;
  setValue: any;
  handleButtonClick: any;
}
export const EmailInput = ({ value, setValue, handleButtonClick }: LoginInputProps) => {
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
    <View justifyContent="center" alignItems="center" padding="$4">
      <H2 fontFamily="$heading2" textAlign="center">
        {welcomeMessage}
      </H2>
      <TextInput
        autoCapitalize="none"
        placeholder="john@emai.com"
        minWidth={350}
        mt="$4"
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        testID="email-input"
      />
      <StyledButton
        colorStyle="primary"
        minWidth="$15"
        mt="$5"
        onPress={handleButtonClick}
        disabled={isButtonDisabled}
        backgroundColor={isButtonDisabled ? 'gray' : '$primary'}
        testID="login-button">
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
    </View>
  );
};
export interface CredentialInputProps {
  value: any;
  setValue: any;
  handleButtonClick: any;
  email: string;
  isSessionExist: boolean;
  hasPin: boolean;
  password: string;
  setPassword: any;
}
