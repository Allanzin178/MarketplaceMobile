import { api } from './api';
import { CartItem } from '@/contexts/CartContext';

// Função auxiliar para garantir que a URL da imagem está completa
const ensureFullImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${api.defaults.baseURL}/uploads/${imageUrl}`;
};

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export const cartService = {
  // Buscar o carrinho atual do usuário
  getCurrentCart: async () => {
    const response = await api.get<Cart>('/cart/current');
    // Garante que todas as URLs das imagens estão completas
    response.data.items = response.data.items.map(item => ({
      ...item,
      image: ensureFullImageUrl(item.image)
    }));
    return response.data;
  },

  // Adicionar item ao carrinho
  addItem: async (productId: string, quantity: number = 1) => {
    const response = await api.post<Cart>('/cart/items', {
      productId,
      quantity,
    });
    return response.data;
  },

  // Atualizar quantidade de um item
  updateItemQuantity: async (productId: string, quantity: number) => {
    const response = await api.put<Cart>(`/cart/items/${productId}`, {
      quantity,
    });
    return response.data;
  },

  // Remover item do carrinho
  removeItem: async (productId: string) => {
    await api.delete(`/cart/items/${productId}`);
  },

  // Limpar carrinho
  clearCart: async () => {
    await api.delete('/cart/clear');
  },

  // Sincronizar carrinho local com o servidor
  syncCart: async (items: CartItem[]) => {
    const response = await api.post<Cart>('/cart/sync', { items });
    return response.data;
  }
};