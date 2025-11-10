import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  nome: string;
  descricao?: string;
  image: string;
  preco: number;
  precoAntigo?: number;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  error: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    try {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        // Certifica-se de que todos os campos necessários estão presentes
        const newItem = {
          ...item,
          qty: 1,
          nome: item.nome || 'Produto',
          preco: item.preco || 0,
          image: item.image || ''
        };
        return [...prev, newItem];
      });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    try {
      if (!id) {
        console.error('ID inválido para atualização de quantidade');
        return;
      }

      if (qty <= 0) {
        removeItem(id);
        return;
      }

      setItems((prev) => {
        const item = prev.find(i => i.id === id);
        if (!item) {
          console.warn('Item não encontrado no carrinho:', id);
          return prev;
        }

        return prev.map((i) => i.id === id ? { ...i, qty } : i);
      });
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.preco * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
        isLoading,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
