import styles from '../../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Mi CMS</h1>
        </div>
        <div className={styles.contact}>
          <span>Contacto: info@micms.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header;