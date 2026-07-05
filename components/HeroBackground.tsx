import styles from "./HeroBackground.module.css";

export default function HeroBackground() {
  return (
    <div className={styles.hero}>
      <img src="/hero.gif" alt="" className={styles.bgGif} draggable={false} />
      <div className={styles.scrim} />
    </div>
  );
}