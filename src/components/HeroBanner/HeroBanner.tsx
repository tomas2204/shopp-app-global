import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Cyber Week — Las mejores ofertas
        </h1>
        <p className={styles.description}>
          Llega la Cyber Week y con ella los precios más bajos del año en
          electrónica, computadoras y accesorios. Cámaras, laptops, auriculares,
          relojes inteligentes y mucho más — todo con envío gratis y devolución
          sin cargo. No te quedes sin el tuyo: las unidades son limitadas.
        </p>
      </div>
    </section>
  );
}
