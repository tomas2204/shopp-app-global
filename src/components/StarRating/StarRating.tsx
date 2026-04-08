import styles from './StarRating.module.css';

interface Props {
  rating: number;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: Props) {
  return (
    <div className={styles.wrapper} aria-label={`Calificación: ${rating} de ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const full = i + 1 <= Math.floor(rating);
        const half = !full && i < rating;
        return (
          <span
            key={i}
            className={`${styles.star} ${full ? styles.full : half ? styles.half : styles.empty}`}
          >
            ★
          </span>
        );
      })}
      <span className={styles.value}>{rating}</span>
    </div>
  );
}
