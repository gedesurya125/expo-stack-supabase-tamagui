/* eslint-disable import/order */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet } from 'react-native';
import { Text, getToken, useTheme } from 'tamagui';
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
          backgroundColor: theme.background.val
        },
        headerTitleStyle: {
          color: theme.color.val
        },
        headerRight: () => (
          <Link href="/profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="person-circle-outline"
                  size={25}
                  color={theme.blue9.val}
                  style={{
                    marginRight: getToken('$3', 'space')
                  }}
                />
              )}
            </Pressable>
          </Link>
        )
      }}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Dashboard',
          drawerLabel: 'Dashboard',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Make Order',
          drawerLabel: 'Make Order',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="two"
        options={{
          title: 'Achievement',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="new-customer"
        options={{
          headerTitle: 'new customer',
          drawerLabel: 'new customer',
          drawerItemStyle: {
            display: 'none'
          },
          headerLeft: BackToMakeOrderScreen
        }}
      />
      <Drawer.Screen
        name="existing-customer"
        options={{
          headerTitle: 'Existing Customer',
          drawerLabel: 'Existing Customer',
          drawerItemStyle: {
            display: 'none'
          },
          headerLeft: BackToMakeOrderScreen
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

const BackToMakeOrderScreen = (props: any) => {
  const theme = useTheme();

  return (
    <Link href="/(drawer)/(tabs)" asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="arrow-back"
            size={25}
            color={theme.blue9.val}
            style={{
              marginLeft: getToken('$3', 'space')
            }}
          />
        )}
      </Pressable>
    </Link>
  );
};
