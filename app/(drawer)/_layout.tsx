/* eslint-disable import/order */
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'tamagui';
import { useSession } from '~/components/AuthContext';

const DrawerLayout = () => {
  const { session } = useSession();
  const theme = useTheme();

  // You can keep the splash screen open, or render a loading screen like we do here.

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.val,
        },
        headerTitleStyle: {
          color: theme.color.val,
        },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Dashboard',
          drawerLabel: 'Dashboard',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Make Order',
          drawerLabel: 'Make Order',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="gray"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="new-customer"
        options={{
          headerTitle: 'new customer',
          drawerLabel: 'new customer',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});

export default DrawerLayout;
