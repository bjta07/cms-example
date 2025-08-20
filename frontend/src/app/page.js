import { getHomeData } from '@/lib/get-home';
import styles from '@/styles/Home.module.css'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const Home = async () => {
  const {titulo, descripcion} = await getHomeData();

  return (
    <div className={styles.dashboard}>
        <div className={styles.container}>
          <h1>{titulo}</h1>
          <BlocksRenderer content={descripcion}></BlocksRenderer>
        </div>
    </div>
  );
};

export default Home;