import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { productService, Product } from '@/services/productService';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { router } from 'expo-router';

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar produtos.';
      setError(errorMessage);
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = () => {
    router.push('/new-product');
  };

  const handleEditProduct = (product: Product) => {
    router.push({
      pathname: '/edit-product',
      params: { id: product.id }
    });
  };

  const handleDeleteProduct = (product: Product) => {
    Alert.alert(
      'Excluir Produto',
      `Tem certeza que deseja excluir o produto "${product.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await productService.delete(product.id);
              setProducts(products.filter(p => p.id !== product.id));
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
            }
          }
        }
      ]
    );
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image
        source={
          item.image
            ? { uri: item.image }
            : require('../../assets/images/Logo1.png')
        }
        style={styles.productImage}
        resizeMode="contain"
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nome}</Text>
        <Text style={styles.productDescription}>{item.descricao}</Text>
        <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditProduct(item)}
        >
          <FontAwesome name="edit" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProduct(item)}
        >
          <FontAwesome name="trash" size={16} color="#ff2b59" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#ff2b59" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Tentar novamente"
          onPress={loadProducts}
          variant="outline"
          size="small"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Seus Produtos</Text>
          <Button
            title="Novo Produto"
            onPress={handleAddProduct}
            size="small"
            variant="primary"
            style={{ paddingHorizontal: 16 }}
          />
        </View>

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <FontAwesome name="shopping-bag" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>
                Nenhum produto cadastrado
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Adicione produtos para começar a vender
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff2b59',
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 12,
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  editButton: {
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    borderColor: '#ffccd5',
    backgroundColor: '#fff5f7',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff2b59',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});