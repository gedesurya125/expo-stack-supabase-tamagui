/* eslint-disable import/order */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Link, Redirect, useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable } from 'react-native';
import { Text, View, XStack, YStack, getToken, useTheme } from 'tamagui';
import { useSession } from '~/components/AuthContext';
import { SearchBar } from '~/components/SearchBar';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';
import { Menu } from '@tamagui/lucide-icons';
import React from 'react';
import { StyledButton } from '~/components/StyledButton';
import { useCartContext } from '~/context/CartContext';

const DrawerLayout = () => {
  const { session, inSessionLoginInfo } = useSession();
  const theme = useTheme();

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
        headerLeft: () => {
          return <CustomDrawerToggleButton />;
        },
        headerRight: HeaderRightComponent,
        drawerContentStyle: {
          backgroundColor: '#151515'
        }
      }}
      drawerContent={(props) => {
        return (
          <YStack flex={1}>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <LogOutCustomerButton />
          </YStack>
        );
      }}>
      <Drawer.Screen
        name="catalogue"
        options={{
          headerTitle: 'Catalogue',
          drawerLabel: 'Catalogue',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="index"
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
        name="industry-select"
        options={{
          headerTitle: 'Select Industry',
          drawerLabel: 'Select Industry',
          drawerItemStyle: {
            display: 'none'
          },
          headerLeft: BackToMakeOrderScreen
        }}
      />
      <Drawer.Screen
        name="product/[id]"
        options={{
          headerTitle: 'Product Detail',
          drawerLabel: 'Product Detail',
          drawerItemStyle: {
            display: 'none'
          },
          headerLeft: BackToCatalogButton
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

const HeaderRightComponent = () => {
  const theme = useTheme();
  return (
    <XStack alignItems="center" paddingBottom="$3" width="100%" justifyContent="flex-end">
      <SearchBar
        currentValue=""
        setValue={() => {}}
        mr="$4"
        flex={1 / 2}
        placeholder="Search for product"
        display="none"
        $gtSm={{
          display: 'block'
        }}
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
      <NavigationIconLink
        href={'/profile' as never}
        Icon={(props) => <Ionicons name="person-circle-outline" {...props} />}
      />
      <CartButton />
      {/* <NavigationIconLink
        href={'/cart-detail-modal' as never}
        Icon={(props) => <Ionicons name="cart-outline" {...props} />}
      /> */}
    </XStack>
  );
};

interface NavigationIconLinkProps extends React.ComponentProps<typeof Link> {
  Icon: React.ElementType;
  containerProps?: React.ComponentProps<typeof View>;
}

const CartButton = () => {
  const { totalProductsQuantity } = useCartContext();

  return (
    <NavigationIconLink
      href={'/cart-detail-modal' as never}
      Icon={(props) => <Ionicons name="cart-outline" {...props} />}
      containerProps={{
        position: 'relative'
      }}>
      {totalProductsQuantity !== 0 && (
        <View
          position="absolute"
          right={-2}
          top={-2}
          backgroundColor="red"
          paddingHorizontal="$2"
          paddingVertical="$1"
          borderRadius={100}
          justifyContent="center"
          alignItems="center">
          <Text>{totalProductsQuantity}</Text>
        </View>
      )}
    </NavigationIconLink>
  );
};

const NavigationIconLink = ({
  Icon,
  children,
  containerProps,
  ...props
}: NavigationIconLinkProps) => {
  const theme = useTheme();

  return (
    <Link {...props} asChild>
      <Pressable>
        {({ pressed }) => (
          <View mr="$3" {...containerProps}>
            <Icon size={35} color={theme.blue9.val} />
            {children}
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const BackToMakeOrderScreen = () => {
  return <BackLink href={'/(drawer)' as never} />;
};
const BackToCatalogButton = () => {
  return <BackLink href={'catalogue' as never} />;
};

const BackLink = ({ ...props }: React.ComponentProps<typeof Link>) => {
  const theme = useTheme();
  return (
    <Link asChild {...props}>
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

const CustomDrawerToggleButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Menu size={30} ml="$3" />
    </Pressable>
  );
};

const LogOutCustomerButton = () => {
  const { customerInfo, handleClearCustomerInfo } = useSelectedCustomerContext();
  const navigation = useNavigation();
  const theme = useTheme();
  const [showDialog, setShowDialog] = React.useState(false);
  const handleToggleDialog = () => {
    setShowDialog((state) => !state);
  };

  const drawerStatus = useDrawerStatus();

  React.useEffect(() => {
    let closeDelay: any;
    if (drawerStatus === 'closed') {
      closeDelay = setTimeout(() => {
        setShowDialog(false);
      }, 500);
    }
    return () => {
      if (closeDelay) {
        clearTimeout(closeDelay);
      }
    };
  }, [drawerStatus]);

  if (!customerInfo) return null;

  return (
    <View position="relative">
      <DrawerItem
        icon={({ size, color }) => {
          return (
            <Ionicons
              name="person-circle-sharp"
              size={28}
              color={showDialog ? theme.primary.val : color}
              style={{
                marginTop: 'auto'
              }}
            />
          );
        }}
        label="Customer"
        onPress={() => {
          handleToggleDialog();
        }}
        labelStyle={{
          ...(showDialog ? { color: theme.primary.val } : {})
        }}
      />
      {showDialog && (
        <View
          backgroundColor="$primary"
          width="100%"
          // height={200}
          position="absolute"
          bottom="100%"
          borderTopLeftRadius="$4"
          borderTopRightRadius="$4"
          zIndex={-1}
          padding="$5"
          gap="$4">
          <Link
            href={{
              pathname: '/customer-detail-modal',
              params: {
                id: customerInfo.id
              }
            }}
            asChild>
            <StyledButton
              icon={
                <Ionicons
                  name="newspaper-outline"
                  size={25}
                  color={theme.orange9.val}
                  style={{
                    marginRight: getToken('$3', 'space')
                  }}
                />
              }>
              Profile
            </StyledButton>
          </Link>
          <StyledButton
            icon={
              <Ionicons
                name="log-out-outline"
                size={25}
                color={theme.orange9.val}
                style={{
                  marginRight: getToken('$3', 'space')
                }}
              />
            }
            onPress={() => {
              handleClearCustomerInfo();
              navigation.dispatch(DrawerActions.toggleDrawer());
              handleToggleDialog();
              navigation.navigate('index' as never);
            }}>
            Log Out
          </StyledButton>
        </View>
      )}
    </View>
  );
};
