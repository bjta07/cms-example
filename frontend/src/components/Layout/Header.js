import Image from 'next/image';
import styles from '../../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <div className={styles.info}>
          <p>(+591) 777-77-777</p>
          <p>|</p>
          <p>colEnfermerasBolivia@gmail.com</p>
        </div>
      </div>
    </header>
  );
};

export default Header;