import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { CartProvider, useCart } from '@/contexts/CartContext';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
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

function TabsContent() {
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
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
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

      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="order-success"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <CartProvider>
      <TabsContent />
    </CartProvider>
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

