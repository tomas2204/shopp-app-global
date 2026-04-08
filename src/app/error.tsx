'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>⚠️</span>
      <h2 className={styles.title}>Algo salió mal</h2>
      <p className={styles.desc}>
        Ocurrió un error al cargar los productos. Podés intentar de nuevo.
      </p>
      <button className={styles.btn} onClick={reset}>
        Reintentar
      </button>
    </div>
  );
}
