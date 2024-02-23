/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import { YStack, Paragraph, Separator, Theme, Button, Input, View, Form } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';
import { supabase } from '~/utils/supabase';

import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useSession } from '~/components/AuthContext';
import Avatar from '~/components/Avatar';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { session } = useSession();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
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
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

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

  return (
    <Theme>
      <YStack flex={1} backgroundColor="$background" p="$4">
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
        <Form onSubmit={() => {}} gap="$4" marginTop="$7">
          <Input placeholder="Email" value={session?.user?.email} disabled />
          <Input
            placeholder="Username"
            value={username || ''}
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            placeholder="Website"
            value={website || ''}
            onChangeText={(text) => setWebsite(text)}
          />

          <Button
            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
            disabled={loading}
            backgroundColor="$orange6">
            {loading ? 'Loading ...' : 'Update'}
          </Button>
        </Form>

        <Button
          onPress={() => {
            supabase.auth.signOut();
          }}
          marginTop="$10"
          backgroundColor="$red6">
          SignOut
        </Button>
      </YStack>
    </Theme>
  );
}
