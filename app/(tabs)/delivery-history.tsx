import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface CompletedDelivery {
  id: string;
  orderNumber: string;
  customerName: string;
  deliveryFee: number;
  completedAt: string;
  rating?: number;
}

export default function DeliveryHistory() {
  const [refreshing, setRefreshing] = useState(false);
  const [deliveries] = useState<CompletedDelivery[]>([
    {
      id: '1',
      orderNumber: '#12335',
      customerName: 'Carlos Mendes',
      deliveryFee: 8.00,
      completedAt: '15/11/2025 - 14:30',
      rating: 5
    },
    {
      id: '2',
      orderNumber: '#12330',
      customerName: 'Juliana Lima',
      deliveryFee: 5.50,
      completedAt: '14/11/2025 - 10:15',
      rating: 4
    },
    {
      id: '3',
      orderNumber: '#12328',
      customerName: 'Roberto Souza',
      deliveryFee: 7.00,
      completedAt: '13/11/2025 - 16:45',
      rating: 5
    },
    {
      id: '4',
      orderNumber: '#12320',
      customerName: 'Fernanda Costa',
      deliveryFee: 6.00,
      completedAt: '12/11/2025 - 11:20',
      rating: 5
    },
    {
      id: '5',
      orderNumber: '#12315',
      customerName: 'Ricardo Alves',
      deliveryFee: 4.50,
      completedAt: '11/11/2025 - 09:00',
      rating: 3
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const totalEarned = deliveries.reduce((sum, delivery) => sum + delivery.deliveryFee, 0);
  const averageRating = deliveries.reduce((sum, delivery) => sum + (delivery.rating || 0), 0) / deliveries.length;

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= rating ? 'star' : 'star-o'}
            size={14}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico de Entregas</Text>
        <Text style={styles.headerSubtitle}>Entregas concluídas</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <FontAwesome name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>{deliveries.length}</Text>
          <Text style={styles.statLabel}>Entregas</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome name="money" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>R$ {totalEarned.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Ganhos</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome name="star" size={24} color="#FFD700" />
          <Text style={styles.statValue}>{averageRating.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Avaliação</Text>
        </View>
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
                <Text style={styles.customerName}>{delivery.customerName}</Text>
              </View>
              <View style={styles.feeContainer}>
                <Text style={styles.feeText}>R$ {delivery.deliveryFee.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.dateContainer}>
                <FontAwesome name="clock-o" size={14} color="#666" />
                <Text style={styles.dateText}>{delivery.completedAt}</Text>
              </View>
              {delivery.rating && renderStars(delivery.rating)}
            </View>
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
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
  deliveryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  feeContainer: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  feeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
});
