import { getHomeData } from '@/lib/get-home';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const Home = async () => {
  const {titulo, descripcion,image, buttonText} = await getHomeData();

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>{titulo}</h1>
          <BlocksRenderer content={descripcion}></BlocksRenderer>
            <Image 
              src={image}
              alt="Hero"
              className={styles.heroImage}
              width={100}
              height={100}
            />
          <button className={styles.ctaButton}>
            {buttonText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;