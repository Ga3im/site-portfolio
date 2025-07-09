import styles from './Main.module.css';

export const Main = () => {
  return (
    <div className={'center'}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h1>Акбутин Газим</h1>
        </div>
        <div className={styles.rightColumn}>
          <p>Опыт</p>
        </div>
      </div>
    </div>
  );
};
