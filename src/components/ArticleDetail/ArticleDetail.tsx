'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useImageFallback } from '@/hooks/useImageFallback';
import StarRating from '@/components/StarRating/StarRating';
import styles from './ArticleDetail.module.css';

interface Props {
  article: Article;
}

export default function ArticleDetail({ article }: Props) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(article.id);
  const { imgSrc, onError, isFallback } = useImageFallback(
    article.imagen,
    'https://placehold.co/500x400?text=Sin+imagen',
  );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Link href="/" className={styles.backBtn}>
          ← Volver al listado
        </Link>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src={imgSrc}
              alt={article.titulo}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain', padding: '1rem' }}
              onError={onError}
              unoptimized={article.unoptimized ?? isFallback}
            />
          </div>

          <div className={styles.info}>
            <span className={styles.category}>{article.categoria}</span>
            <h1 className={styles.title}>{article.titulo}</h1>

            <StarRating rating={article.rating} />

            <p className={styles.price}>${article.precio.toFixed(2)}</p>

            <p className={styles.description}>{article.descripcion}</p>

            <div className={styles.actions}>
              <button
                className={styles.addBtn}
                onClick={() => addToCart(article)}
              >
                Agregar al carrito
              </button>

              <button
                className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
                onClick={() => toggleFavorite(article.id)}
                aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {fav ? '♥ Favorito' : '♡ Agregar a favoritos'}
              </button>
            </div>

            <div className={styles.shipping}>
              <span className={styles.shippingBadge}>✔ Llega gratis hoy</span>
              <span className={styles.returnLabel}>Devolución gratis · 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
