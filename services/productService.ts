import { api } from './api';

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
  categoria?: string;
}

export const productService = {
  getAll: async () => {
    const response = await api.get<Product[]>('/products');
    const productsWithFullUrls = response.data.map(product => ({
      ...product,
      image: ensureFullImageUrl(product.image)
    }));
    return productsWithFullUrls;
  },

  getById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  update: async (id: string, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  },

  search: async (query: string) => {
    const response = await api.get<Product[]>(`/products/search`, {
      params: { q: query }
    });
    const productsWithFullUrls = response.data.map(product => ({
      ...product,
      image: ensureFullImageUrl(product.image)
    }));
    return productsWithFullUrls;
  },

  getCategories: async () => {
    const products = await productService.getAll();
    const categories = [...new Set(products.map(p => p.categoria).filter(Boolean))] as string[];
    return categories;
  },

  getByCategory: async (categoria: string) => {
    const products = await productService.getAll();
    return products.filter(p => p.categoria === categoria);
  }
};