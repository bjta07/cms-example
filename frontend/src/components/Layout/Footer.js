import Image from 'next/image';
import styles from '../../styles/Footer.module.css';
import Icon from '../UI/Icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <div className={styles.logoWrapper}>
            <Image className="logo" src='/images/logo.png' alt="logo" width={110} height={110} />
          </div>
          <div className={styles.logoText}>
            <h3>Colegio de Enfermeras de Bolivia</h3>
            <p>Comprometidos con la excelencia en el cuidado de la salud</p>
          </div>
        </div>
        
        <div className={styles.footerContacts}>
          <div className={styles.contactSection}>
            <h4>
              <Icon name="contact" className={styles.icon} fill="currentColor"/>
              Contactos
            </h4>
            <div className={styles.contactItem}>
              <Icon name = "mail" className={styles.icon} fill="currentColor"/>
              <div>
                <strong>Email:</strong>
                <span>colEnf@gmail.com</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <Icon name="phone" className={styles.icon} fill="currentColor"/>
              <div>
                <strong>Teléfonos:</strong>
                <span>77777777</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <Icon name="location" fill="currentColor"/>
              <div>
                <strong>Dirección:</strong>
                <span>Batallón Colorados Edif. Cóndor piso 14 of: 15</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footterLinks}>
          <h5>
            <Icon name="social" className={styles.icon} fill="currentColor"/>
            Nuestras redes
          </h5>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <Icon name="youTube" fill="currentColor"/>
              <span>YouTube</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <Icon name="instagram" fill="currentColor"/>
              <span>Instagram</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <Icon name="facebook" fill="currentColor"/>
              <span>Facebook</span>
            </a>
          </div>
        </div>
        
        <div className={styles.footerMembership}>
          <div className={styles.divider}></div>
          <div className={styles.membershipContainer}>
            <span>Afiliaciones: </span>
            <a href="https://feppen.org.py/" target="_blank" rel="noopener noreferrer">
              <Image src={"/images/FEPPEN.png"} alt='FEPPEN logo' width={139} height={139} className={styles.logoItem}/>
            </a>
            <a href="https://www.icn.ch/es" target="_blank" rel="noopener noreferrer">
              <Image src={"/images/CIE.png"} alt='CIE logo' width={139} height={139} className={styles.logoItem}/>
            </a>
            <a href="https://www.fuden.es/" target="_blank" rel="noopener noreferrer">
              <Image src={"/images/LOGO-FUDEN-COOPERACION.png"} alt='FUDEN logo' width={139} height={139} className={styles.logoItem}/>

            </a>
          </div>

        </div>

        <div className={styles.footerRights}>
          <div className={styles.divider}></div>
          <p>© 2025 Colegio de Enfermeras de Bolivia - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;