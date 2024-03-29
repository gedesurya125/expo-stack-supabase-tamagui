/* eslint-disable import/order */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View, XStack, getToken, useTheme } from 'tamagui';
import { useSession } from '~/components/AuthContext';
import { SearchBar } from '~/components/SearchBar';
import { StyledPressable } from '~/components/StyledPressable';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

const DrawerLayout = () => {
  const { session, inSessionLoginInfo } = useSession();
  const theme = useTheme();
  const { customerInfo } = useSelectedCustomerContext();

  // You can keep the splash screen open, or render a loading screen like we do here.

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session || !inSessionLoginInfo.email || !inSessionLoginInfo.pin) {
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
        headerTitleAlign: 'left',
        headerRight: () => (
          <XStack alignItems="center" paddingBottom="$3" width="100%" justifyContent="flex-end">
            <SearchBar
              currentValue=""
              setValue={() => {}}
              mr="$4"
              flex={1 / 2}
              placeholder="Search for product"
            />
            <Link href="/achievement" asChild>
              <Pressable>
                <View flexDirection="row" alignItems="center">
                  <Text
                    backgroundColor="$blue4"
                    paddingVertical="$2"
                    paddingRight="$7"
                    paddingLeft="$3"
                    mr="$-4">
                    3500pts
                  </Text>
                  <Ionicons
                    name="trophy-outline"
                    size={25}
                    color={theme.blue10.val}
                    style={{
                      marginRight: getToken('$3', 'space')
                    }}
                  />
                </View>
              </Pressable>
            </Link>
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
            {customerInfo?.id && (
              <Link
                href={{
                  pathname: '/customer-detail-modal',
                  params: {
                    id: customerInfo.id
                  }
                }}
                asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="newspaper-outline"
                      size={25}
                      color={theme.orange9.val}
                      style={{
                        marginRight: getToken('$3', 'space')
                      }}
                    />
                  )}
                </Pressable>
              </Link>
            )}
          </XStack>
        )
      }}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Catalogue',
          drawerLabel: 'Catalogue',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="make-order"
        options={{
          headerTitle: 'Make Order',
          drawerLabel: 'Make Order',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="achievement"
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
      {/* //? not showing up for now */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Existing Customer',
          drawerLabel: 'Existing Customer',
          drawerItemStyle: {
            display: 'none'
          },
          headerLeft: BackToMakeOrderScreen
        }}
      />
      <Drawer.Screen
        name="search-new-customer"
        options={{
          headerTitle: 'Search New Customer',
          drawerLabel: 'Search New Customer',
          drawerItemStyle: {
            display: 'none'
          },
          headerLeft: BackToMakeOrderScreen
        }}
      />
      <Drawer.Screen
        name="search-new-customer-mapbox"
        options={{
          headerTitle: 'Search New Customer Mapbox',
          drawerLabel: 'Search New Customer Mapbox',
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
    <Link href="/make-order" asChild>
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

//? this group is not used, it moved to /(drawer)/make-order
