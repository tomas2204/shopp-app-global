import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Producto no encontrado</h1>
      <p className={styles.desc}>
        El producto que estás buscando no existe o fue removido.
      </p>
      <Link href="/" className={styles.btn}>
        Volver al listado
      </Link>
    </div>
  );
}
