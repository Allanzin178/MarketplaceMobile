import React, { useState, useEffect } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import FarmaciasScroller from '@/components/FarmaciasScroller';
import Button from '@/components/Button';
import { useCart } from '@/contexts/CartContext';
import { productService, Product } from '@/services/productService';



interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
    Alert.alert('Sucesso', `${product.nome} adicionado ao carrinho!`);
  };

  return (
    <View style={styleDestaque.item}>
      {product.image && (
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styleDestaque.image} 
          resizeMode="contain" 
        />
      )}
      <Text style={styleDestaque.nome}>{product.nome}</Text>
      {product.descricao && <Text style={styleDestaque.descricao}>{product.descricao}</Text>}
      <Text style={styleDestaque.preco}>R$ {product.preco.toFixed(2)}</Text>
      
      <Button 
        title="Adicionar"
        onPress={handleAddToCart}
        size="small"
        fullWidth
      />
    </View>
  );
};

function Propagandas() {
  return (
    <View>
      <Image 
        source={require('../../assets/images/Porpagandas.png')}
        style={{
          width: '100%',
          paddingTop: 20
        }}
        resizeMode='contain'
      />
    </View>
  );
}

interface DestaqueProps {
  searchText: string;
  filteredProducts: Product[];
}

const Destaque: React.FC<DestaqueProps> = ({ searchText, filteredProducts }) => {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <View style={styleDestaque.grid}>
      {filteredProducts.map((product: Product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </View>
  );
};

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar produtos ao iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data);
      setError(null); // Limpa qualquer erro anterior
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar produtos. Verifique sua conexão.';
      setError(errorMessage);
      console.error('Erro ao carregar produtos:', err);
      // Se não houver produtos carregados, mostra o erro
      if (products.length === 0) {
        setProducts([]);
        setFilteredProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Função de pesquisa
  const handleSearch = async (text: string) => {
    setSearchText(text);
    try {
      if (text.trim()) {
        const searchResults = await productService.search(text);
        setFilteredProducts(searchResults);
      } else {
        setFilteredProducts(products);
      }
    } catch (err) {
      console.error('Erro na pesquisa:', err);
      // Fallback para pesquisa local se a API falhar
      const filtered = products.filter(product => 
        product.nome.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar novamente" onPress={loadProducts} size="small" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onSearch={handleSearch} searchValue={searchText}/>
      <View style={styles.separator}/>
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#ff2b59" />
        </View>
      ) : (
        <ScrollView 
          style={styles.wrapper}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {!searchText && (
            <>
              <FarmaciasScroller/>
              <Propagandas/>
            </>
          )}
          <Destaque searchText={searchText} filteredProducts={filteredProducts}/>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff2b59',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

const styleDestaque = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginVertical: 50,
    paddingBottom: 20,
  },
  item: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    alignSelf: 'center'
  },
  nome: {
    fontSize: 13,
    marginBottom: 4,
    color: '#333',
    fontWeight: '500',
  },
  descricao: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff2b59',
    marginBottom: 10,
  },
});