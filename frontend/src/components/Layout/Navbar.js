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
              href="/products" 
              className={pathname === '/products' ? styles.active : ''}
            >
              Productos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;