import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from "@/contexts/CartContext";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function Cart() {
  const { items, updateQty, subtotal, isLoading, error } = useCart();
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery"
  );

  function changeQty(id: string, delta: number) {
    const item = items.find((i) => i.id === id);
    if (item) {
      updateQty(id, item.qty + delta);
    }
  }

  const shipping = deliveryType === "delivery" ? 9.0 : 0.0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos ao carrinho antes de finalizar.");
      return;
    }
    router.push("/(tabs)/checkout" as any);
  };

  // Item do carrinho como componente separado
  const CartItem = React.memo(({ item }: { item: typeof items[0] }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
      <View style={styles.card}>
        <Image
          source={
            imageError || !item.image
              ? require('../../assets/images/image.png')
              : { uri: item.image }
          }
          style={styles.cardImage}
          resizeMode="contain"
          onError={(error) => {
            console.log('Erro ao carregar imagem:', error.nativeEvent.error);
            setImageError(true);
          }}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <Text style={styles.cardDesc}>{item.descricao}</Text>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
              {item.precoAntigo ? (
                <Text style={styles.oldPrice}>
                  R$ {item.precoAntigo.toFixed(2)}
                </Text>
              ) : null}
            </View>

            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => changeQty(item.id, -1)}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>

              <View style={styles.qtyValue}>
                <Text>{item.qty}</Text>
              </View>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => changeQty(item.id, +1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff2b59" />
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <CartItem item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
        ListHeaderComponent={() => (
          <>
            <Image
              source={require("../../assets/images/image.png")}
              style={{ width: 200, height: 80, alignSelf: "center", marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text style={{ textAlign: "center", marginBottom: 12, color: "#333" }}>
              Finalizar Compra
            </Text>
          </>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Opções de Entrega:</Text>
            <View>
              <TouchableOpacity
                style={[
                  styles.deliveryCard,
                  deliveryType === "delivery" && styles.deliveryCardActive,
                ]}
                onPress={() => setDeliveryType("delivery")}
              >
                <Text style={styles.deliveryTitle}>Entrega Padrão</Text>
                <Text style={styles.deliveryDesc}>
                  O entregador irá deixar seus produtos na localização desejada
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.deliveryCard,
                  deliveryType === "pickup" && styles.deliveryCardActive,
                ]}
                onPress={() => setDeliveryType("pickup")}
              >
                <Text style={styles.deliveryTitle}>Retirada na Loja</Text>
                <Text style={styles.deliveryDesc}>
                  Retire o produto direto na loja
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 12 }} />

            <Text style={styles.sectionTitle}>Endereço:</Text>
            <View style={styles.addressCard}>
              <Text style={{ fontWeight: "600" }}>Casa</Text>
              <Text style={{ color: "#666" }}>R. Exemplo, Nº 22</Text>
            </View>

            <View style={{ height: 12 }} />

            <Text style={styles.sectionTitle}>Resumo:</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Valor dos Produtos:</Text>
                <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Valor da entrega:</Text>
                <Text style={styles.summaryValue}>R$ {shipping.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, { marginTop: 8 }]}>
                <Text style={[styles.summaryLabel, { fontWeight: "700" }]}>
                  Valor Total
                </Text>
                <Text
                  style={[
                    styles.summaryValue,
                    { color: "#e91e63", fontWeight: "700" },
                  ]}
                >
                  R$ {total.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={{ height: 18 }} />
            <Button 
              title="Finalizar Compra"
              onPress={handleCheckout}
              size="large"
              fullWidth
            />

            <View style={{ height: 80 }} />
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff2b59',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 96,
    height: 72,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 16, fontWeight: "700" },
  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "700" },
  qtyValue: {
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    paddingVertical: 4,
  },

  sectionTitle: { fontWeight: "700", marginBottom: 8, marginTop: 6 },

  deliveryRow: { gap: 8 },
  deliveryCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  deliveryCardActive: {
    borderColor: "#e91e63",
    shadowColor: "#e91e63",
  },
  deliveryTitle: { fontWeight: "700", marginBottom: 4 },
  deliveryDesc: { color: "#666", fontSize: 12 },

  addressCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },

  summaryCard: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryLabel: { color: "#666" },
  summaryValue: { color: "#000" },
});