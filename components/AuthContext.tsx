/* eslint-disable import/order */
import React, { Dispatch, SetStateAction } from 'react';
// import { useStorageState } from 'hooks/useStorageState';

/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import { Session } from '@supabase/supabase-js';

const AuthContext = React.createContext<{
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
}>({
  session: null,
  setSession: () => {},
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = React.useState<Session | null>(null);

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
