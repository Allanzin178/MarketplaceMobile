import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { productService } from '@/services/productService';
import { api } from '@/services/api';

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [id]);

  const loadCategories = async () => {
    try {
      const cats = await productService.getCategories();
      setCategorias(cats);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };

  const loadProduct = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const product = await productService.getById(id.toString());
      
      setNome(product.nome);
      setDescricao(product.descricao || '');
      setPreco(product.preco.toString().replace('.', ','));
      setImage(product.image);
      setCategoria(product.categoria || '');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsSaving(true);

      const precoNumber = parseFloat(preco.replace(',', '.'));

      if (isNaN(precoNumber) || precoNumber <= 0) {
        Alert.alert('Erro', 'Por favor, insira um preço válido.');
        return;
      }

      // Se uma nova imagem foi selecionada
      if (image && image.startsWith('file://')) {
        const fileName = image.split('/').pop() || 'photo.jpg';
        const formData = new FormData();
        
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('preco', precoNumber.toString());
        formData.append('categoria', categoria);
        
        formData.append('image', {
          uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
          type: 'image/jpeg',
          name: fileName,
        } as any);

        await api.put(`/products/${id}`, formData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data) => data,
        });
      } else {
        // Se não houver nova imagem, envia apenas os dados do produto
        await api.put(`/products/${id}`, {
          nome,
          descricao,
          preco: precoNumber,
          categoria: categoria,
        });
      }

      Alert.alert('Sucesso', 'Produto atualizado com sucesso!', [
        { 
          text: 'OK',
          onPress: () => router.replace('/manage-products')
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff2b59" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Editar Produto</Text>
        </View>

        <TouchableOpacity 
          style={styles.imageSelector} 
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome name="camera" size={32} color="#999" />
              <Text style={styles.imagePlaceholderText}>
                Alterar foto
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome do produto"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Digite a descrição do produto"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={styles.input}
              value={preco}
              onChangeText={setPreco}
              placeholder="0,00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categoryContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categorias.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      categoria === cat && styles.categoryChipActive
                    ]}
                    onPress={() => setCategoria(cat)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      categoria === cat && styles.categoryChipTextActive
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <Button
            title="Salvar Alterações"
            onPress={handleSubmit}
            variant="primary"
            loading={isSaving}
            style={{ marginTop: 24 }}
          />
        </View>
      </ScrollView>
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
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSelector: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  },
  imageGrid: {
    marginBottom: 24,
  },
  imageOption: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedImage: {
    borderColor: '#ff2b59',
    backgroundColor: '#fff5f7',
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  imageLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  form: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryScroll: {
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