'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import { useImageFallback } from '@/hooks/useImageFallback';
import StarRating from '@/components/StarRating/StarRating';
import styles from './ArticleCard.module.css';

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(article.id);
  const { imgSrc, onError, isFallback } = useImageFallback(
    article.imagen,
    'https://placehold.co/300x200?text=Sin+imagen',
  );

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={imgSrc}
          alt={article.titulo}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{ objectFit: 'contain', padding: '0.5rem' }}
          onError={onError}
          unoptimized={article.unoptimized ?? isFallback}
        />
        <button
          className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
          onClick={() => toggleFavorite(article.id)}
          aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{article.categoria}</span>

        <Link href={`/products/${article.id}`} className={styles.title}>
          {article.titulo}
        </Link>

        <p className={styles.description}>{article.descripcion}</p>

        <div className={styles.footer}>
          <StarRating rating={article.rating} />
          <span className={styles.price}>${article.precio.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
