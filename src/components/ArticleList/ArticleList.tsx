'use client';

import { useState } from 'react';
import type { Article } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import styles from './ArticleList.module.css';

interface Props {
  articles: Article[];
}

function normalize(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function ArticleList({ articles }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [showFavs, setShowFavs] = useState(false);
  const { isFavorite } = useFavorites();

  const filtered = articles
    .filter((a) => !showFavs || isFavorite(a.id))
    .filter((a) => normalize(a.titulo).includes(normalize(search)));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    setSearch('');
  };

  return (
    <section className={styles.section}>
      <div className={styles.toolbar}>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.input}
            placeholder="Ingrese un nombre"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Filtrar por nombre"
          />
          <button type="submit" className={styles.searchBtn}>
            Buscar
          </button>
          {search && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </form>

        <button
          type="button"
          className={`${styles.favsBtn} ${showFavs ? styles.favsBtnActive : ''}`}
          onClick={() => setShowFavs((v) => !v)}
          aria-pressed={showFavs}
        >
          {showFavs ? '♥ Favoritos' : '♡ Favoritos'}
        </button>
      </div>

      <p className={styles.count}>
        {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        {search && ` para "${search}"`}
        {showFavs && ' · solo favoritos'}
      </p>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>{showFavs ? '♡' : '🔍'}</span>
          <h2>{showFavs ? 'Sin favoritos' : 'No se encontraron productos'}</h2>
          <p>
            {showFavs
              ? 'Todavía no marcaste ningún producto como favorito.'
              : 'No hay productos que coincidan con tu búsqueda.'}
            <br />
            {!showFavs && 'Intenta ajustar los filtros o verifica que el nombre sea correcto.'}
          </p>
          <button
            className={styles.clearAllBtn}
            onClick={() => { handleClear(); setShowFavs(false); }}
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
