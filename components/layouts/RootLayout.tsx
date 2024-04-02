import React from 'react';
import { useReactQueryDevTools } from '@dev-plugins/react-query/build/useReactQueryDevTools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartContextProvider } from '~/context/CartContext';
import { ExistingCustomerContextProvider } from '~/context/CustomersContext';
import { SelectedCustomerContextProvider } from '~/context/SelectedCustomerContext';

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ExistingCustomerContextProvider>
        <SelectedCustomerContextProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </SelectedCustomerContextProvider>
      </ExistingCustomerContextProvider>
    </QueryClientProvider>
  );
};

// TODO: Finish this Root layout and implement it to the app, and use it to do the testing layout wrapper for every screen
