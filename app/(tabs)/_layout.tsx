import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 28} style={{ marginBottom: -3 }} {...props} />;
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
  const { userType } = useAuth();
  const isFarmacia = userType === 'farmacia';
  const isEntregador = userType === 'entregador';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff2b59',
        tabBarInactiveTintColor: '#666',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      
      {/* Telas da Farmácia */}
      <Tabs.Screen
        name="manage-products"
        options={{
          title: 'Seus Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="cubes" color={color} />,
          href: isFarmacia ? undefined : null,
        }}
      />

      {/* Telas do Entregador */}
      <Tabs.Screen
        name="available-deliveries"
        options={{
          title: 'Disponíveis',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} size={22} />,
          href: isEntregador ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="my-deliveries"
        options={{
          title: 'Minhas Entregas',
          tabBarIcon: ({ color }) => <TabBarIcon name="check-circle" color={color} size={22} />,
          href: isEntregador ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="delivery-history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} size={20} />,
          href: isEntregador ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="delivery-profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={20} />,
          href: isEntregador ? undefined : null,
        }}
      />

      {/* Telas do Cliente */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tela inicial',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          href: !isFarmacia && !isEntregador ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Suas cestas',
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
          href: !isFarmacia && !isEntregador ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} size={20}/>,
          href: !isFarmacia && !isEntregador ? undefined : null,
        }}
      />

      {/* Tela comum para cliente e farmácia */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={20}/>,
          href: !isEntregador ? undefined : null,
        }}
      />

      {/* Telas utilitárias (ocultas) */}
      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="order-success"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="new-product"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="edit-product"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <FavoritesProvider>
      <CartProvider>
        <TabsContent />
      </CartProvider>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
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
    fontSize: 11,
    fontWeight: 'bold',
  },
});
