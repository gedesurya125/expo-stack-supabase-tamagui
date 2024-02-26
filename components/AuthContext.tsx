import React from 'react';
import { supabase } from '~/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { Alert, AppState } from 'react-native';

interface SignProps {
  email: string;
  password: string;
}

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthContext = React.createContext<{
  signInWithEmail: (data: SignProps) => void;
  signUpWithEmail: (data: SignProps) => void;
  signOut: () => void;
  session?: Session | null;
  loading: boolean;
}>({
  signInWithEmail: () => null,
  signUpWithEmail: () => null,
  signOut: () => null,
  session: null,
  loading: false,
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
  const [loading, setLoading] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);

  async function signInWithEmail({ email, password }: SignProps) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail({ email, password }: SignProps) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInWithEmail,
        signUpWithEmail,
        signOut: () => {
          supabase.auth.signOut();
        },
        session,
        loading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
