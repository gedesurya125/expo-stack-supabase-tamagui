/* eslint-disable import/order */
import 'react-native-url-polyfill/auto';
import { useEffect } from 'react';
import { supabase } from 'utils/supabase';
import Auth from 'components/Auth';
import { View } from 'react-native';
import { useSession } from '~/components/AuthContext';
import { Redirect } from 'expo-router';

export default function SignIn() {
  // const [session, setSession] = useState<Session | null>(null);
  const { session, setSession } = useSession();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session && session.user ? <Redirect href="/" /> : <Auth />;
}
