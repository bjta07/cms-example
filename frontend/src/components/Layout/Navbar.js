'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link 
              href="/" 
              className={pathname === '/' ? styles.active : ''}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              href="/about" 
              className={pathname === '/about' ? styles.active : ''}
            >
              Institucionalidad
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              href="/prensa" 
              className={pathname === '/prensa' ? styles.active : ''}
            >
              Prensa
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              href="/normativa" 
              className={pathname === '/normativa' ? styles.active : ''}
            >
              Normativa
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              href="/documentos" 
              className={pathname === '/documentos' ? styles.active : ''}
            >
              Documentos
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              href="/formacion" 
              className={pathname === '/formacion' ? styles.active : ''}
            >
              Formacion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;