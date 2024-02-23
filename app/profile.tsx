import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { YStack, Paragraph, Separator, Theme, Button } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';
import { supabase } from '~/utils/supabase';

export default function ProfileScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Paragraph>Modal</Paragraph>
        <Separator />
        <EditScreenInfo path="app/modal.tsx" />
        <Button
          onPress={() => {
            supabase.auth.signOut();
          }}
          marginTop="$10">
          SignOut
        </Button>
      </YStack>
    </Theme>
  );
}
