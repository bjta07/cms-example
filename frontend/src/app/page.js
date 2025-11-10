import { getHomeData } from '@/lib/get-home';
import { getPaginas } from '@/lib/get-pagina';
import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import NewsCarouselWrapper from '@/components/UI/NewsCarouselWrapper';
import LogosCarousel from '@/components/UI/LogosCarousel';



const Home = async () => {
  const {titulo, descripcion} = await getHomeData();
  let colegiosData = [];

  try {
    colegiosData = await getPaginas();
  } catch (error) {
    console.error('Error al obtener colegios:', error);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.tittleContainer}>
        <div className={styles.mainTittle}>
          <h2>Colegio de</h2>
          <h2>Enfermeras de Bolivia</h2>
          <Link href="/about" className={styles.button}>
            Conócenos
          </Link>
        </div>
        <Image src={'/images/enfermera.jpg'} alt='Enfermera' width={666} height={444} className={styles.image}/>
      </div>
        <div className={styles.welcomeContainer}>
          <Image src={'/images/enfermera.jpg'} alt='Enfermera' width={666} height={491} className={styles.image}/>
          <div className={styles.welcome}>
            <h2>{titulo}</h2>
            <BlocksRenderer content={descripcion} className={styles.descripcion}></BlocksRenderer>
          </div>
        </div>
        <h3 className={styles.subtitle}>Nuestros colegios departamentales y regionales</h3>
        <div className={styles.logosContainer}>
          <LogosCarousel 
            regionalesData={colegiosData.filter(colegio => colegio.tipoColegio === "Regional")}
            departamentalesData={colegiosData.filter(colegio => colegio.tipoColegio === "Departamental")}
          />
        </div>
        <h3 className={styles.subtitle}>Miembro oficial de:</h3>
        <div className={styles.membershipContainer}>
          <div className={styles.par}>
            <div className={styles.itemContainer}>
              <div className={styles.logoContainer}>
                <Image src={'/images/FEPPEN.png'} alt='Feppen logo' width={200} height={199}/>
                <a href="https://feppen.org.py/" target="_blank" rel="noopener noreferrer">Visita su sitio web</a>
              </div>
              <div className={styles.content}>
                <h4>FEPPEN</h4>
                <p>La Federación Panamericana de Profesionales de Enfermería (FEPPEN), fundada en 1970, agrupa organizaciones de enfermería de Latinoamérica y el Caribe. Sin sede fija, actualmente opera en Paraguay (2021-2025).</p>
              </div>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.logoContainer}>
                <Image src={'/images/CIE NEW.png'} alt='Feppen logo' width={200} height={199}/>
                <a href="https://www.icn.ch/es" target="_blank" rel="noopener noreferrer">Visita su sitio web</a>
              </div>
              <div className={styles.content}>
                <h4>CIE</h4>
                <p>El Consejo Internacional de Enfermeras (CIE) es una federación de más de 140 asociaciones nacionales de enfermeras (ANE) en representación de los 30 millones de enfermeras en todo el mundo.</p>
              </div>
            </div>
          </div>
          <div className={styles.par}>
            <div className={styles.itemContainer}>
              <div className={styles.logoContainer}>
                <Image src={'/images/fuden.png'} alt='Feppen logo' width={200} height={199}/>
                <a href="https://www.fuden.es/" target="_blank" rel="noopener noreferrer">Visita su sitio web</a>
              </div>
              <div className={styles.content}>
                <h4>FUDEN</h4>
                <p>La Federación Panamericana de Profesionales de Enfermería (FEPPEN), fundada en 1970, agrupa organizaciones de enfermería de Latinoamérica y el Caribe. Sin sede fija, actualmente opera en Paraguay (2021-2025).</p>
              </div>
            </div>
              <div className={styles.itemContainer}>
                <div className={styles.logoContainer}>
                  <Image src={'/images/ops-logo.png'} alt='Feppen logo' width={200} height={199}/>
                  <a href="https://campus.paho.org/es" target="_blank" rel="noopener noreferrer">Visita su sitio web</a>
                </div>
                <div className={styles.content}>
                  <h4>Campus virtual</h4>
                  <p>Todos los cursos virtuales, materiales, recursos y certificados del Campus Virtual de Salud Pública de la OPS/OMS son 100% de acceso libre y gratuito para los participantes.</p>
                </div>
            </div>
          </div>
        </div>
      <h3 className={styles.subtitle}>Noticias Recientes</h3>
      <div className={styles.carousel}>
        <NewsCarouselWrapper/>
      </div>
    </div>
  );
};

export default Home;