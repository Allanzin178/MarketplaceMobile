import React, { useState, useEffect } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ToastAndroid, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import FarmaciasScroller from '@/components/FarmaciasScroller';
import Button from '@/components/Button';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { productService, Product } from '@/services/productService';
import FontAwesome from '@expo/vector-icons/FontAwesome';



interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = () => {
    onAddToCart(product);
    
    if (Platform.OS === 'android') {
      ToastAndroid.show(`✓ ${product.nome} adicionado ao carrinho`, ToastAndroid.SHORT);
    } else {
      Alert.alert('✓ Adicionado', `${product.nome} foi adicionado ao carrinho`, [
        { text: 'OK', style: 'default' }
      ]);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <View style={styleDestaque.item}>
      <TouchableOpacity 
        style={styleDestaque.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <FontAwesome 
          name={isProductFavorite ? "star" : "star-o"} 
          size={20} 
          color="#ff2b59" 
        />
      </TouchableOpacity>

      {product.image && (
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styleDestaque.image} 
          resizeMode="contain" 
        />
      )}
      <Text style={styleDestaque.nome}>{product.nome}</Text>
      {product.categoria && (
        <Text style={styleDestaque.categoria}>{product.categoria}</Text>
      )}
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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await productService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar produtos. Verifique sua conexão.';
      setError(errorMessage);
      console.error('Erro ao carregar produtos:', err);
      if (products.length === 0) {
        setProducts([]);
        setFilteredProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (searchQuery: string, category: string | null, allProducts: Product[]) => {
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter(p => p.categoria === category);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.categoria && product.categoria.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);
    setShowFavoritesOnly(false);
    
    try {
      const filtered = applyFilters(text, selectedCategory, products);
      setFilteredProducts(filtered);
    } catch (err) {
      console.error('Erro na pesquisa:', err);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setShowFavoritesOnly(false);
    
    if (selectedCategory === category) {
      setSelectedCategory(null);
      const filtered = applyFilters(searchText, null, products);
      setFilteredProducts(filtered);
    } else {
      setSelectedCategory(category);
      const filtered = applyFilters(searchText, category, products);
      setFilteredProducts(filtered);
    }
  };

  const handleToggleFavorites = () => {
    const newShowFavorites = !showFavoritesOnly;
    setShowFavoritesOnly(newShowFavorites);
    
    if (newShowFavorites) {
      setFilteredProducts(favorites);
      setSelectedCategory(null);
      setSearchText('');
    } else {
      const filtered = applyFilters(searchText, selectedCategory, products);
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
    <SafeAreaView style={styles.container} edges={['top']}>
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
          
          {/* Filtro de Categorias */}
          {categories.length > 0 && (
            <View style={styles.categoriesContainer}>
              <View style={styles.categoriesHeader}>
                <Text style={styles.categoriesTitle}>Categorias</Text>
                <TouchableOpacity 
                  style={[
                    styles.favoritesButton,
                    showFavoritesOnly && styles.favoritesButtonActive
                  ]}
                  onPress={handleToggleFavorites}
                >
                  <FontAwesome 
                    name={showFavoritesOnly ? "star" : "star-o"} 
                    size={18} 
                    color={showFavoritesOnly ? "#fff" : "#ff2b59"} 
                  />
                  <Text style={[
                    styles.favoritesButtonText,
                    showFavoritesOnly && styles.favoritesButtonTextActive
                  ]}>
                    Favoritos
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipActive
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
    paddingBottom: 100,
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
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  favoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ff2b59',
    gap: 6,
  },
  favoritesButtonActive: {
    backgroundColor: '#ff2b59',
    borderColor: '#ff2b59',
  },
  favoritesButtonText: {
    fontSize: 13,
    color: '#ff2b59',
    fontWeight: '600',
  },
  favoritesButtonTextActive: {
    color: '#fff',
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  categoryChipActive: {
    backgroundColor: '#ff2b59',
    borderColor: '#ff2b59',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
});

const styleDestaque = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginTop: 16,
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
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 4,
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
  categoria: {
    fontSize: 10,
    color: '#ff2b59',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
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