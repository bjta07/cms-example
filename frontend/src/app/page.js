import { getHomeData } from '@/lib/get-home';
import styles from '@/styles/Home.module.css'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import CardDocuments from '@/components/UI/cardDocuments';
import { getDocuments } from "@/lib/get-documents"
import { getCirculars } from "@/lib/get-circulars"

const Home = async () => {
  const {titulo, descripcion} = await getHomeData();
  const [documents, circulars] = await Promise.all([
          getDocuments(),
          getCirculars()
      ])

  return (
    <div className={styles.dashboard}>
        <div className={styles.container}>
          <h1>{titulo}</h1>
          <div className={styles.descripcion}>
            <BlocksRenderer content={descripcion}></BlocksRenderer>
          </div>
        </div>
      <div className={styles.cardCirculares}>
        <CardDocuments
          documents={circulars}
          title="Circulares recientes"
          limit={3}
        />
      </div>
      <div className={styles.cardDocuments}>
        <CardDocuments
          documents={documents}
          title="Documentos recientes"
          limit={3}
        />
      </div>
    </div>
  );
};

export default Home;