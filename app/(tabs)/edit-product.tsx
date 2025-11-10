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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const product = await productService.getById(id.toString());
      
      setNome(product.nome);
      setDescricao(product.descricao || '');
      setPreco(product.preco.toString().replace('.', ','));
      setImage(product.image);
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
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          ActivityIndicator
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
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
});