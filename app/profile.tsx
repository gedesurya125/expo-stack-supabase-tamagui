/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import { YStack, Theme, Button, Input, View, Form, ScrollView } from 'tamagui';
import { Redirect, router } from 'expo-router';

import { supabase } from '~/utils/supabase';

import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useSession } from '~/components/AuthContext';
import Avatar from '~/components/Avatar';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [fullName, setFullName] = useState('');
  const [pin, setPin] = useState<number>();

  const [avatarUrl, setAvatarUrl] = useState('');
  const { session } = useSession();

  const isModalOpen = router.canGoBack();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name, pin`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log('this is the profile data', data);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
        setPin(data.pin);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    fullName,
    pin
  }: {
    username: string;
    website: string;
    avatar_url: string;
    fullName?: string;
    pin?: number;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name: fullName,
        website,
        avatar_url,
        pin,
        updated_at: new Date()
      };

      console.log('this is the updates', updates);

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!session?.user && isModalOpen) {
    //? go back
    return <Redirect href="../" />;
  }

  return (
    <Theme>
      <ScrollView backgroundColor="$background">
        <YStack paddingHorizontal="$4" paddingTop="$4" paddingBottom="$7">
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          <Avatar
            size={200}
            url={avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateProfile({ username, website, avatar_url: url, fullName, pin });
            }}
          />
          <Form onSubmit={() => {}} gap="$4" marginTop="$7">
            <Input placeholder="Email" value={session?.user?.email} disabled />
            <Input
              placeholder="Username"
              value={username || ''}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
            />
            <Input
              placeholder="Full Name"
              value={fullName || ''}
              onChangeText={(text) => setFullName(text)}
            />

            <Input
              placeholder="Website"
              value={website || ''}
              onChangeText={(text) => setWebsite(text)}
              autoCapitalize="none"
            />

            <Input
              placeholder="Pin"
              keyboardType="number-pad"
              inputMode="decimal"
              dataDetectorTypes="none"
              value={`${pin || ''}`}
              onChangeText={(text) => {
                if (Number(text)) {
                  setPin(Number(text));
                }
                if (text === '') {
                  setPin(undefined);
                }
              }}
            />

            <Button
              onPress={() =>
                updateProfile({ username, website, fullName, pin, avatar_url: avatarUrl })
              }
              disabled={loading}
              backgroundColor="$orange6">
              {loading ? 'Loading ...' : 'Update'}
            </Button>
          </Form>

          <Button
            onPress={() => {
              supabase.auth.signOut();
            }}
            marginTop="$4"
            backgroundColor="$red6">
            SignOut
          </Button>
        </YStack>
      </ScrollView>
    </Theme>
  );
}
