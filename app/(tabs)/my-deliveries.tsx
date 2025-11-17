import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ActiveDelivery {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  distance: string;
  deliveryFee: number;
  items: number;
  pharmacy: string;
  status: 'coletando' | 'a_caminho' | 'entregando';
}

export default function MyDeliveries() {
  const [refreshing, setRefreshing] = useState(false);
  const [deliveries] = useState<ActiveDelivery[]>([
    {
      id: '1',
      orderNumber: '#12340',
      customerName: 'Ana Paula',
      customerAddress: 'Rua dos Lírios, 321 - Bairro Alto',
      customerPhone: '(11) 98765-4321',
      distance: '1.8 km',
      deliveryFee: 6.00,
      items: 4,
      pharmacy: 'Farmácia Vida',
      status: 'a_caminho'
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'coletando':
        return { text: 'Coletando na farmácia', color: '#FF9800', icon: 'shopping-bag' };
      case 'a_caminho':
        return { text: 'A caminho do cliente', color: '#2196F3', icon: 'motorcycle' };
      case 'entregando':
        return { text: 'Entregando', color: '#4CAF50', icon: 'check-circle' };
      default:
        return { text: 'Pendente', color: '#999', icon: 'clock-o' };
    }
  };

  const handleChangeStatus = (deliveryId: string, newStatus: string) => {
    console.log('Mudando status da entrega:', deliveryId, newStatus);
  };

  const handleContactCustomer = (phone: string) => {
    console.log('Contatando cliente:', phone);
  };

  const handleOpenMap = (address: string) => {
    console.log('Abrindo mapa para:', address);
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    console.log('Finalizando entrega:', deliveryId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Entregas</Text>
        <Text style={styles.headerSubtitle}>Entregas em andamento</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {deliveries.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome name="inbox" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma entrega em andamento</Text>
            <Text style={styles.emptySubtext}>Aceite uma entrega para começar</Text>
          </View>
        ) : (
          deliveries.map((delivery) => {
            const statusInfo = getStatusInfo(delivery.status);
            return (
              <View key={delivery.id} style={styles.deliveryCard}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.orderNumber}>{delivery.orderNumber}</Text>
                    <Text style={styles.pharmacyName}>{delivery.pharmacy}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                    <FontAwesome name={statusInfo.icon as any} size={14} color="#fff" />
                    <Text style={styles.statusText}>{statusInfo.text}</Text>
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
                  <View style={styles.infoRow}>
                    <FontAwesome name="phone" size={16} color="#666" />
                    <Text style={styles.infoText}>{delivery.customerPhone}</Text>
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
                    <View style={styles.statItem}>
                      <FontAwesome name="money" size={14} color="#4CAF50" />
                      <Text style={[styles.statText, { color: '#4CAF50' }]}>
                        R$ {delivery.deliveryFee.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => handleContactCustomer(delivery.customerPhone)}
                  >
                    <FontAwesome name="phone" size={16} color="#ff2b59" />
                    <Text style={styles.secondaryButtonText}>Ligar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => handleOpenMap(delivery.customerAddress)}
                  >
                    <FontAwesome name="map" size={16} color="#ff2b59" />
                    <Text style={styles.secondaryButtonText}>Mapa</Text>
                  </TouchableOpacity>
                </View>

                {delivery.status === 'a_caminho' && (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleCompleteDelivery(delivery.id)}
                  >
                    <FontAwesome name="check" size={18} color="#fff" />
                    <Text style={styles.completeButtonText}>Finalizar Entrega</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff2b59',
  },
  secondaryButtonText: {
    color: '#ff2b59',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
