import Image from 'next/image';
import styles from '../../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Image className={styles.logo}src='/images/logo.png' alt="logo" width={115} height={115} />
        <h1>Colegio de Enfermeras de Bolivia</h1>
      </div>
    </header>
  );
};

export default Header;