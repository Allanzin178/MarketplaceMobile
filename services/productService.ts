import { api } from './api';

// Função auxiliar para garantir que a URL da imagem está completa
const ensureFullImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${api.defaults.baseURL}/uploads/${imageUrl}`;
};

export interface Product {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  image: string;
}

export const productService = {
  // Buscar todos os produtos
  getAll: async () => {
    const response = await api.get<Product[]>('/products');
    // Garante que todas as URLs das imagens estão completas
    const productsWithFullUrls = response.data.map(product => ({
      ...product,
      image: ensureFullImageUrl(product.image)
    }));
    return productsWithFullUrls;
  },

  // Buscar um produto específico
  getById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Criar um novo produto
  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  // Atualizar um produto existente
  update: async (id: string, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  // Deletar um produto
  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  },

  // Buscar produtos por termo de pesquisa
  search: async (query: string) => {
    const response = await api.get<Product[]>(`/products/search`, {
      params: { q: query }
    });
    // Garante que todas as URLs das imagens estão completas
    const productsWithFullUrls = response.data.map(product => ({
      ...product,
      image: ensureFullImageUrl(product.image)
    }));
    return productsWithFullUrls;
  }
};