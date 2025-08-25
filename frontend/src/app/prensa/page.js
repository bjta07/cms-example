import News from "@/components/UI/News"
import CardDocuments from "@/components/UI/cardDocuments"
import { getCirculars } from "@/lib/get-circulars"
import { getDocuments } from "@/lib/get-documents"
import styles from '@/styles/Noticias.module.css'

const Prensa = async () => {
      const [documents, circulars] = await Promise.all([
          getDocuments(),
          getCirculars()
      ])
    return(
        <div className={styles.dashboard}>
            <div className={styles.title}>
                <h2>Noticias y comunicados oficiales</h2>
            </div>
            <div className={styles.noticiasContainer}>
                <News/>
            </div>
            <div className={styles.cardContainer}>
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
        </div>
    )
}

export default Prensa