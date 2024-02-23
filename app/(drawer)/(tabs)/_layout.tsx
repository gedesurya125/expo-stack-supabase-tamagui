import Ionicon from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicon>['name']; color: string }) {
  return <Ionicon size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.blue10.val,
        tabBarInactiveTintColor: theme.color.val,
        tabBarStyle: {
          backgroundColor: theme.orange6.val,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color }) => <TabBarIcon name="people-circle-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Achievement',
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
