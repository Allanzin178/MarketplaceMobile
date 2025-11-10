import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 24} style={{ marginBottom: -3 }} color={props.color} name={props.name} />;
}

export default function PharmacyTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      
      <Tabs.Screen
        name="manage-products"
        options={{
          title: 'Seus Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="cubes" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={20}/>,
        }}
      />
    </Tabs>
  );
}