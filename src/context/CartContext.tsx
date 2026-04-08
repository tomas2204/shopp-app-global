'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Article, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (article: Article) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  totalDistinct: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (article: Article) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.article.id === article.id);
      if (existing) {
        return prev.map((i) =>
          i.article.id === article.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { article, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.article.id !== id));
  };

  const increment = (id: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.article.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  const decrement = (id: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.article.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, increment, decrement, totalDistinct: items.length }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
