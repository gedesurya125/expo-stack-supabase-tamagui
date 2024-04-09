import React from 'react';
import { ThemeProvider } from '~/components/ThemeProvider';
import { SignInScreen } from '../SignInScreen';

import { SessionProvider } from '~/components/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { renderRouter, screen, fireEvent } from 'expo-router/testing-library';
import { View } from 'tamagui';
import { EmailInput } from '../components/EmailInput';

const userEmail = 'gedesurya125@gmail.com';

describe('Sign In Screen', () => {
  it('Should logged in the user', () => {
    // const LayoutComponent = ({ children }: { children?: React.ReactNode }) => {
    //   return (
    //     <ThemeProvider>
    //       <SessionProvider>{children}</SessionProvider>
    //     </ThemeProvider>
    //   );
    // };

    // const MockLayout = jest.fn(() => <LayoutComponent />);

    const MockComponent = jest.fn(() => (
      <ThemeProvider>
        <SessionProvider>
          <SignInScreen isSessionExist={false} />
        </SessionProvider>
      </ThemeProvider>
    ));

    // const MockSignIn = jest.fn(() => <SignInScreen isSessionExist={false} />);
    renderRouter(
      {
        index: MockComponent
      },
      { initialUrl: '/' }
    );
    const emailInputElement = screen.getByTestId('email-input');
    expect(emailInputElement).toBeDefined();

    const emailInputByQuery = screen.queryByTestId('email-input');
    expect(emailInputByQuery).toBeDefined();

    fireEvent(emailInputElement, 'onChangeText', userEmail);

    expect(emailInputElement).toHaveDisplayValue(userEmail);

    const loginButton = screen.getByTestId('login-button');

    fireEvent(loginButton, 'press');

    expect(screen?.queryByTestId('email-input')).toBeNull();
  });
});

// TODO find way to have the same layout for every router in  the render router
