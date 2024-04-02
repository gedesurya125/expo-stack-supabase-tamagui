import React from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '~/tamagui.config';

interface ThemeProviderProps extends React.ComponentProps<typeof TamaguiProvider> {}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <TamaguiProvider config={config} defaultTheme="dark" {...props}>
      {children}
    </TamaguiProvider>
  );
};
