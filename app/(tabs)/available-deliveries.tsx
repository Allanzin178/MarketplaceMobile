import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Delivery {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  distance: string;
  deliveryFee: number;
  items: number;
  pharmacy: string;
}

export default function AvailableDeliveries() {
  const [refreshing, setRefreshing] = useState(false);
  const [deliveries] = useState<Delivery[]>([
    {
      id: '1',
      orderNumber: '#12345',
      customerName: 'João Silva',
      customerAddress: 'Rua das Flores, 123 - Centro',
      distance: '2.5 km',
      deliveryFee: 5.00,
      items: 3,
      pharmacy: 'Farmácia Central'
    },
    {
      id: '2',
      orderNumber: '#12346',
      customerName: 'Maria Santos',
      customerAddress: 'Av. Principal, 456 - Jardim',
      distance: '3.8 km',
      deliveryFee: 7.50,
      items: 5,
      pharmacy: 'Farmácia Saúde'
    },
    {
      id: '3',
      orderNumber: '#12347',
      customerName: 'Pedro Costa',
      customerAddress: 'Rua da Paz, 789 - Vila Nova',
      distance: '1.2 km',
      deliveryFee: 4.00,
      items: 2,
      pharmacy: 'Farmácia BemViver'
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAcceptDelivery = (deliveryId: string) => {
    console.log('Entrega aceita:', deliveryId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Entregas Disponíveis</Text>
        <Text style={styles.headerSubtitle}>Aceite uma entrega para começar</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {deliveries.map((delivery) => (
          <View key={delivery.id} style={styles.deliveryCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderNumber}>{delivery.orderNumber}</Text>
                <Text style={styles.pharmacyName}>{delivery.pharmacy}</Text>
              </View>
              <View style={styles.feeContainer}>
                <FontAwesome name="money" size={20} color="#4CAF50" />
                <Text style={styles.feeText}>R$ {delivery.deliveryFee.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.customerInfo}>
              <View style={styles.infoRow}>
                <FontAwesome name="user" size={16} color="#666" />
                <Text style={styles.infoText}>{delivery.customerName}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="map-marker" size={16} color="#666" />
                <Text style={styles.infoText}>{delivery.customerAddress}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <FontAwesome name="road" size={14} color="#666" />
                  <Text style={styles.statText}>{delivery.distance}</Text>
                </View>
                <View style={styles.statItem}>
                  <FontAwesome name="shopping-bag" size={14} color="#666" />
                  <Text style={styles.statText}>{delivery.items} itens</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAcceptDelivery(delivery.id)}
            >
              <FontAwesome name="check" size={18} color="#fff" />
              <Text style={styles.acceptButtonText}>Aceitar Entrega</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  deliveryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pharmacyName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  feeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  customerInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  acceptButton: {
    backgroundColor: '#ff2b59',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
