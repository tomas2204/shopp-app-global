'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useImageFallback } from '@/hooks/useImageFallback';
import type { CartItem } from '@/types';
import styles from './Cart.module.css';

function ItemImage({ item }: { item: CartItem }) {
  const { imgSrc, onError, isFallback } = useImageFallback(
    item.article.imagen,
    'https://placehold.co/64x64?text=img',
  );
  return (
    <Image
      src={imgSrc}
      alt={item.article.titulo}
      fill
      sizes="64px"
      style={{ objectFit: 'contain', padding: '4px' }}
      onError={onError}
      unoptimized={item.article.unoptimized ?? isFallback}
    />
  );
}

interface Props {
  onClose: () => void;
}

export default function Cart({ onClose }: Props) {
  const { items, removeFromCart, increment, decrement } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const total = items.reduce(
    (sum, item) => sum + item.article.precio * item.quantity,
    0,
  );

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Mi carrito</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        <div className={styles.panelBody}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛒</span>
              <p className={styles.emptyTitle}>Tu carrito está vacío</p>
              <p className={styles.emptyDesc}>
                Descubrí las categorías del sitio y elegí los mejores productos
              </p>
              <button className={styles.continueBtn} onClick={onClose}>
                Seguí comprando
              </button>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.article.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    <ItemImage item={item} />
                  </div>

                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.article.titulo}</p>
                    <p className={styles.itemPrice}>
                      ${(item.article.precio * item.quantity).toFixed(2)}
                    </p>
                    <div className={styles.controls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => decrement(item.article.id)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => increment(item.article.id)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.article.id)}
                    aria-label={`Eliminar ${item.article.titulo}`}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.panelFooter}>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalValue}>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn}>Ir a mi carrito</button>
          </div>
        )}
      </div>
    </div>
  );
}
