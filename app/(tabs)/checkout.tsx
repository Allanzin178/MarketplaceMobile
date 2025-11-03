import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useCart } from "@/contexts/CartContext";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  
  // Informações de endereço
  const [address, setAddress] = useState("R. Exemplo, Nº 22");
  const [complement, setComplement] = useState("Casa");
  
  // Informações de pagamento
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | "pix" | "money">("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const shipping = deliveryType === "delivery" ? 9.0 : 0.0;
  const total = subtotal + shipping;

  const handleFinalizePurchase = () => {
    if (items.length === 0) {
      Alert.alert("Erro", "Seu carrinho está vazio!");
      return;
    }

    if (paymentMethod === "credit" || paymentMethod === "debit") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        Alert.alert("Erro", "Preencha todos os dados do cartão!");
        return;
      }
    }

    // Simular processamento
    Alert.alert(
      "Pedido Confirmado!",
      `Seu pedido no valor de R$ ${total.toFixed(2)} foi realizado com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            router.push("/(tabs)/order-success" as any);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Checkout</Text>

        {/* Tipo de Entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Entrega</Text>
          
          <TouchableOpacity
            style={[
              styles.optionCard,
              deliveryType === "delivery" && styles.optionCardActive,
            ]}
            onPress={() => setDeliveryType("delivery")}
          >
            <Text style={styles.optionTitle}>Entrega Padrão</Text>
            <Text style={styles.optionDesc}>
              O entregador irá deixar seus produtos na localização desejada
            </Text>
            <Text style={styles.optionPrice}>R$ 9,00</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              deliveryType === "pickup" && styles.optionCardActive,
            ]}
            onPress={() => setDeliveryType("pickup")}
          >
            <Text style={styles.optionTitle}>Retirada na Loja</Text>
            <Text style={styles.optionDesc}>Retire o produto direto na loja</Text>
            <Text style={styles.optionPrice}>Grátis</Text>
          </TouchableOpacity>
        </View>

        {/* Endereço de Entrega */}
        {deliveryType === "delivery" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Endereço completo"
              value={address}
              onChangeText={setAddress}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Complemento"
              value={complement}
              onChangeText={setComplement}
            />
          </View>
        )}

        {/* Forma de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          
          <View style={styles.paymentGrid}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "credit" && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod("credit")}
            >
              <Text style={styles.paymentText}>Crédito</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "debit" && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod("debit")}
            >
              <Text style={styles.paymentText}>Débito</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "pix" && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod("pix")}
            >
              <Text style={styles.paymentText}>PIX</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "money" && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod("money")}
            >
              <Text style={styles.paymentText}>Dinheiro</Text>
            </TouchableOpacity>
          </View>

          {(paymentMethod === "credit" || paymentMethod === "debit") && (
            <View style={styles.cardForm}>
              <TextInput
                style={styles.input}
                placeholder="Número do cartão"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={16}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Nome no cartão"
                value={cardName}
                onChangeText={setCardName}
              />
              
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="Validade (MM/AA)"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  maxLength={5}
                />
                
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="CVV"
                  value={cardCVV}
                  onChangeText={setCardCVV}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          )}

          {paymentMethod === "pix" && (
            <View style={styles.pixInfo}>
              <Text style={styles.pixText}>
                Após confirmar o pedido, você receberá o QR Code para pagamento.
              </Text>
            </View>
          )}

          {paymentMethod === "money" && (
            <TextInput
              style={styles.input}
              placeholder="Troco para quanto? (opcional)"
              keyboardType="numeric"
            />
          )}
        </View>

        {/* Resumo do Pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Produtos ({items.length})</Text>
              <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Entrega</Text>
              <Text style={styles.summaryValue}>R$ {shipping.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Botão Finalizar */}
        <Button 
          title="Confirmar Pedido"
          onPress={handleFinalizePurchase}
          size="large"
          fullWidth
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  optionCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  optionCardActive: {
    borderColor: "#ff2b59",
    borderWidth: 2,
    backgroundColor: "#fff5f7",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333",
  },
  optionDesc: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff2b59",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  paymentOption: {
    flex: 1,
    minWidth: "45%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  paymentOptionActive: {
    borderColor: "#ff2b59",
    borderWidth: 2,
    backgroundColor: "#fff5f7",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cardForm: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  pixInfo: {
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  pixText: {
    color: "#0369a1",
    fontSize: 14,
    textAlign: "center",
  },
  summaryCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  summaryTotal: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff2b59",
  },
});
