import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useCart } from '@/contexts/CartContext';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 24} style={{ marginBottom: -3 }} color={props.color} name={props.name} />;
}

function CartIcon({ color }: { color: string }) {
  const { totalItems } = useCart();
  
  return (
    <View style={{ position: 'relative' }}>
      <TabBarIcon name="shopping-basket" color={color} size={20} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
}

export default function ClientTabLayout() {
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
        name="home"
        options={{
          title: 'Tela inicial',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Suas cestas',
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} size={20}/>,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={20}/>,
        }}
      />

      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen
        name="order-success"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -6,
    backgroundColor: '#ff2b59',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});