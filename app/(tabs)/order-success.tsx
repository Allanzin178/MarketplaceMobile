import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/Button";

export default function OrderSuccess() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome name="check-circle" size={100} color="#4ade80" />
        </View>

        <Text style={styles.title}>Pedido Confirmado!</Text>
        
        <Text style={styles.message}>
          Seu pedido foi realizado com sucesso e está sendo preparado.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Próximos Passos:</Text>
          <Text style={styles.infoText}>
            • Você receberá uma notificação quando o pedido sair para entrega
          </Text>
          <Text style={styles.infoText}>
            • Acompanhe o status do seu pedido na aba "Pedidos"
          </Text>
          <Text style={styles.infoText}>
            • Tempo estimado de entrega: 30-45 minutos
          </Text>
        </View>

        <View style={styles.orderNumber}>
          <Text style={styles.orderNumberLabel}>Número do Pedido</Text>
          <Text style={styles.orderNumberValue}>
            #{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
          </Text>
        </View>

        <Button
          title="Acompanhar Pedido"
          onPress={() => router.push("/(tabs)/history")}
          size="large"
          fullWidth
        />

        <View style={{ height: 12 }} />

        <Button
          title="Voltar para Início"
          onPress={() => router.push("/(tabs)/home")}
          variant="outline"
          size="large"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: "#f0f9ff",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0369a1",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#0c4a6e",
    marginBottom: 8,
    lineHeight: 20,
  },
  orderNumber: {
    backgroundColor: "#fff5f7",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff2b59",
  },
  orderNumberLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  orderNumberValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff2b59",
  },
});
