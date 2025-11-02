import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 24} style={{ marginBottom: -3 }} color={props.color} name={props.name} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          href: null,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tela inicial',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Suas cestas',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-basket" color={color} size={20}/>,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Pedidos',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} size={20}/>,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={20}/>,
        }}
      />
    </Tabs>
  );
}
