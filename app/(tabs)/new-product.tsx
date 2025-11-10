import React, { useState } from 'react';
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
import { router } from 'expo-router';

import Button from '@/components/Button';
import Header from '@/components/Header';
import { productService } from '@/services/productService';
import { api } from '@/services/api';

export default function NewProduct() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedImages = [
    {
      url: "https://previews.123rf.com/images/mything/mything1710/mything171000062/88760581-cough-remedy-bottle-of-medicine-syrup-and-one-dose-in-spoon-for-treat-sore-throat-cold-flu.jpg",
      label: "Remédio Líquido"
    },
    {
      url: "https://saude.abril.com.br/wp-content/uploads/2020/10/remedio01.jpeg?crop=1&resize=1212,909",
      label: "Comprimidos"
    },
    {
      url: "https://static.vecteezy.com/ti/vetor-gratis/p1/658028-desenho-de-objeto-de-ferramenta-de-escola-de-lapis-gratis-vetor.jpg",
      label: "Outros"
    }
  ];

  const selectImage = (url: string) => {
    setImage(url);
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsLoading(true);

      const precoNumber = parseFloat(preco.replace(',', '.'));

      if (isNaN(precoNumber) || precoNumber <= 0) {
        Alert.alert('Erro', 'Por favor, insira um preço válido.');
        return;
      }

      if (!image) {
        Alert.alert('Erro', 'Por favor, selecione uma imagem para o produto.');
        return;
      }

      await api.post('/products', {
        nome,
        descricao,
        preco: precoNumber,
        image: image
      });

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!', [
        { 
          text: 'OK',
          onPress: () => router.replace('/manage-products')
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Novo Produto</Text>
        </View>

        <View style={styles.imageGrid}>
          <Text style={styles.label}>Selecione uma imagem para o produto:</Text>
          {predefinedImages.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageOption,
                image === img.url && styles.selectedImage
              ]}
              onPress={() => selectImage(img.url)}
            >
              <Image source={{ uri: img.url }} style={styles.imagePreview} />
              <Text style={styles.imageLabel}>{img.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
            title="Cadastrar Produto"
            onPress={handleSubmit}
            variant="primary"
            loading={isLoading}
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
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
});