import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from "@expo/vector-icons";

type OrderStatus = "preparing" | "delivering" | "delivered" | "cancelled";

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: {
    nome: string;
    qty: number;
    preco: number;
  }[];
};

export default function History() {
  // Dados mockados de pedidos
  const [orders] = useState<Order[]>([
    {
      id: "0001",
      date: "02/11/2025 - 14:30",
      status: "delivered",
      total: 33.9,
      items: [
        { nome: "Dipirona 100mg", qty: 2, preco: 9.9 },
        { nome: "Colírio Ecoflim", qty: 1, preco: 15.0 },
      ],
    },
    {
      id: "0002",
      date: "01/11/2025 - 10:15",
      status: "delivering",
      total: 45.0,
      items: [
        { nome: "Bepantol", qty: 2, preco: 15.0 },
        { nome: "Xarope", qty: 1, preco: 15.0 },
      ],
    },
    {
      id: "0003",
      date: "30/10/2025 - 16:45",
      status: "preparing",
      total: 24.9,
      items: [
        { nome: "Dipirona 100mg", qty: 1, preco: 9.9 },
        { nome: "Colírio Ecoflim", qty: 1, preco: 15.0 },
      ],
    },
  ]);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return {
          label: "Preparando",
          color: "#f59e0b",
          icon: "clock-o" as const,
        };
      case "delivering":
        return {
          label: "Em Entrega",
          color: "#3b82f6",
          icon: "truck" as const,
        };
      case "delivered":
        return {
          label: "Entregue",
          color: "#10b981",
          icon: "check-circle" as const,
        };
      case "cancelled":
        return {
          label: "Cancelado",
          color: "#ef4444",
          icon: "times-circle" as const,
        };
    }
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const statusInfo = getStatusInfo(item.status);

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Pedido #{item.id}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <FontAwesome name={statusInfo.icon} size={12} color="#fff" />
            <Text style={styles.statusText}>{statusInfo.label}</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          {item.items.map((orderItem, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemName}>
                {orderItem.qty}x {orderItem.nome}
              </Text>
              <Text style={styles.itemPrice}>
                R$ {(orderItem.preco * orderItem.qty).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {item.total.toFixed(2)}</Text>
        </View>

        {item.status === "delivering" && (
          <TouchableOpacity style={styles.trackButton}>
            <FontAwesome name="map-marker" size={16} color="#fff" />
            <Text style={styles.trackButtonText}>Rastrear Pedido</Text>
          </TouchableOpacity>
        )}

        {item.status === "delivered" && (
          <TouchableOpacity style={styles.reorderButton}>
            <FontAwesome name="refresh" size={16} color="#ff2b59" />
            <Text style={styles.reorderButtonText}>Pedir Novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/Logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Meus Pedidos</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="shopping-bag" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum pedido realizado</Text>
          <Text style={styles.emptySubtext}>
            Seus pedidos aparecerão aqui após a compra
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: "#999",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff2b59",
  },
  trackButton: {
    backgroundColor: "#ff2b59",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  reorderButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ff2b59",
    gap: 8,
  },
  reorderButtonText: {
    color: "#ff2b59",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
