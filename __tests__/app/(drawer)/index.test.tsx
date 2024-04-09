// @ts-nocheck
// ? this test is moved to each component

import { render } from 'react-native-testing-library';
import { AuthCon } from '';

describe('check the env', () => {
  it('should load the env variable', () => {
    //? to enable the inline access of process.env.[VAR NAME]  source: https://github.com/expo/expo/issues/26513#issuecomment-1989035903
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    expect(supabaseUrl).toEqual('https://bzrvryzvskjurkzrjcln.supabase.co');
  });
});

// describe('testing example', () => {
//   it('my-test', async () => {
//     const MockComponent = jest.fn(() => <Home />);

//     renderRouter(
//       {
//         index: MockComponent
//       },
//       {
//         initialUrl: '/directory/a'
//       }
//     );

//     // ? source of available command for expo https://docs.expo.dev/router/reference/testing/#jest-native-matchers-optional
//     expect(screen).toHavePathname('/directory/a');
//   });

//   it('my-test', async () => {
//     const MockAuthLayout = jest.fn(() => <View />);
//     renderRouter({
//       appDir: 'app/(drawer)',
//       overrides: {
//         'directory/_layout': MockAuthLayout
//       }
//     });
//     expect(screen).toHavePathname('/');
//   });
//   it('test2', async () => {
//     const MockAuthLayout = jest.fn(() => <View />);
//     renderRouter({
//       appDir: 'app/(drawer)',
//       overrides: {
//         'directory/_layout': MockAuthLayout
//       }
//     });
//     expect(screen).toHavePathname('/product');
//   });
// });
