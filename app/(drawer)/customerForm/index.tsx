import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { YStack, Text, ListItem, useTheme, Spinner, Separator } from 'tamagui';
import { BcSalesQuote } from '~/api/businessCentral/types/salesQuote';

export default function TabOneScreen() {
  return (
    <YStack flex={1} backgroundColor="$background">
      <Text>Hello</Text>
    </YStack>
  );
}
