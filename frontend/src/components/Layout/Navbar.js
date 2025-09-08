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
  const isNuestrosServiciosActive = pathname ==='/certificaciones' || pathname  === '/inscripciones' || pathname === '/postgrado'
  const isInformacionActive = pathname === '/soc-cientifica' || pathname === '/rev-cientifica'

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={'/images/logo.png'} alt='logo' width={100} height={100}/>
        </Link>
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
        <li className={styles.navItem}>
          <Link
            href="/afiliados"
            className={pathname === '/afiliados' ? styles.active : ''}
          >
            Colegios
          </Link>
        </li>

        <div className={styles.menu}>
          <li 
          className={`${styles.navItem} ${styles.dropdown}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className={isInformacionActive ? styles.dropdownActive : styles.dropdownToggle}>
            Informacion Cientifica
            <span className={styles.dropdownArrow}>▼</span>
          </span>
          {isDropdownOpen && (
            <div className={styles.dropdownWrapper}>
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownItem}>
                  <Link href="/soc-cientifica">Sociedad Cientifica</Link>
                </li>
                <li className={styles.dropdownItem}>
                  <Link href="/rev-cientifica">Revista Cientifica</Link>
                </li>
                <li className={styles.dropdownItem}>
                  <Link href="/cursos">Actividades Cientificas</Link>
                </li>
              </ul>
            </div>
          )}
          </li>
        </div>

        <div className={styles.menu}>
          <li 
          className={`${styles.navItem} ${styles.dropdown}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className={isDocumentosActive ? styles.dropdownActive : styles.dropdownToggle}>
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
        </div>

        <div className={styles.menu}>
          <li 
          className={`${styles.navItem} ${styles.dropdown}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className={isNuestrosServiciosActive ? styles.dropdownActive : styles.dropdownToggle}>
            Servicios
            <span className={styles.dropdownArrow}>▼</span>
          </span>
          {isDropdownOpen && (
            <div className={styles.dropdownWrapper}>
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownItem}>
                  <Link href="/certificaciones">Certificaciones</Link>
                </li>
                <li className={styles.dropdownItem}>
                  <Link href="/inscripciones">Inscripciones</Link>
                </li>
              </ul>
            </div>
          )}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;