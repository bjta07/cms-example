'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para verificar si estamos en una página del dropdown
  const isDocumentosActive = pathname === '/documentos' || pathname === '/normativa';

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src={'/images/logo.png'} alt='logo' width={97} height={97}/>
        <h1>CEB</h1>
      </div>
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
        <li 
        className={`${styles.navItem} ${styles.dropdown}`}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span className={isDocumentosActive ? styles.active : styles.dropdownToggle}>
          Documentos
          <span className={styles.dropdownArrow}>▼</span>
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdownWrapper}>
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdownItem}>
                <Link href="/documentos">Circulares</Link>
              </li>
              <li className={styles.dropdownItem}>
                <Link href="/normativa">Normativas</Link>
              </li>
            </ul>
          </div>
        )}
      </li>
        <li className={styles.navItem}>
          <Link
            href="/formacion"
            className={pathname === '/formacion' ? styles.active : ''}
          >
            Formación
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;