'use client';

import type { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>{children}</CartProvider>
    </FavoritesProvider>
  );
}
