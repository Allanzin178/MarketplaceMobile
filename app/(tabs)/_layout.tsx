import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';


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
        <View>
          <Text>{totalItems}</Text>
        </View>
      )}
    </View>
  );
}

function TabsContent() {
  const { userType } = useAuth();
  const isFarmacia = userType === 'farmacia';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff2b59',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,
          padding: 0,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
        }}
      />
      
      {/* Telas da Farmácia */}
      <Tabs.Screen
        name="manage-products"
        options={{
          title: 'Seus Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="cubes" color={color} />,
          tabBarButton: isFarmacia ? undefined : () => null,
        }}
      />

      {/* Telas do Cliente */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tela inicial',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarButton: !isFarmacia ? undefined : () => null,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Suas cestas',
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
          tabBarButton: !isFarmacia ? undefined : () => null,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} size={20}/>,
          tabBarButton: !isFarmacia ? undefined : () => null,
        }}
      />

      {/* Tela comum para ambos */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={20}/>,
        }}
      />

      {/* Telas utilitárias (ocultas) */}
      <Tabs.Screen
        name="checkout"
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="order-success"
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="new-product"
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="edit-product"
        options={{
          tabBarButton: () => null,
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
    <CartProvider>
      <TabsContent />
    </CartProvider>
  );
}

// const styles = StyleSheet.create({
//   badge: {
//     position: 'absolute',
//     right: -8,
//     top: -5,
//     backgroundColor: '#ff2b59',
//     borderRadius: 8,
//     minWidth: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 3,
//     borderWidth: 1,
//     borderColor: '#fff',
//     zIndex: 2,
//     elevation: 3,
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 9,
//     fontWeight: 'bold',
//     includeFontPadding: false,
//     textAlignVertical: 'center',
//     lineHeight: 14,
//   },
// });

