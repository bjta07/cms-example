import Icon from '../UI/Icons';
import styles from '../../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <div className={styles.info}>
          <p><Icon name = "phone" fill="currentColor"/>(+591) 777-77-777</p>
          <p>|</p>
          <p> <Icon name = "mail" fill="currentColor"/>colEnfermerasBolivia@gmail.com</p>
        </div>
      </div>
    </header>
  );
};

export default Header;