'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Cart from '@/components/Cart/Cart';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const { totalDistinct } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link className={styles.logo} href="/">
            Shop App Global
          </Link>
          <button
            className={styles.cartBtn}
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
          >
            <svg
              className={styles.cartIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalDistinct > 0 && (
              <span className={styles.badge}>{totalDistinct}</span>
            )}
          </button>
        </div>
      </header>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}
