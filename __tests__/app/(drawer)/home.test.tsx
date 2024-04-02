import React from 'react';
// import renderer from 'react-test-renderer';

import Home from '../../../app/(drawer)/index';
// ? we have to install this  to using renderRouter https://testing-library.com/docs/ecosystem-jest-native/
import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'tamagui';

describe('<App />', () => {
  // const originalEnv = process.env;

  // beforeEach(() => {
  //   jest.resetModules();
  //   process.env = {
  //     ...originalEnv
  //   };
  // });
  // afterEach(() => {
  //   process.env = originalEnv;
  // });

  it('should load the env variable', () => {
    //? to enable the inline access of process.env.[VAR NAME]  source: https://github.com/expo/expo/issues/26513#issuecomment-1989035903
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    expect(supabaseUrl).toEqual('https://bzrvryzvskjurkzrjcln.supabase.co');
  });

  it('my-test', async () => {
    const MockComponent = jest.fn(() => <Home />);

    renderRouter(
      {
        index: MockComponent
      },
      {
        initialUrl: '/directory/a'
      }
    );

    expect(screen).toHavePathname('/directory/a');
  });
});
