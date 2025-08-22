import { getNews } from "@/lib/get-news";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { extractPlainText, truncateText } from "@/utils/textUtils";
import styles from '@/styles/News.module.css'

const News = async () => {
    const news = await getNews()

    return(
        <div className={styles.newsContainer}>
            {news?.map((newsItem) => (
                <div key={newsItem.id} className={styles.newItem}>
                    {newsItem.imagen && (
                        <div>
                                <Image
                                    className={styles.newImage}
                                    src={newsItem.imagen}
                                    alt={newsItem.titulo}
                                    width={269}
                                    height={179}
                                />
                        </div>
                    )}
                    <h4>{newsItem.titulo}</h4>
                    <p className={styles.newFecha}>{new Date(newsItem.fecha).toLocaleDateString('es-ES',{
                        year: 'numeric',
                        month:'long',
                        day: 'numeric',
                        timeZone: 'UTC'
                    })}</p>
                    <p className={styles.newDescripcion}>{truncateText(extractPlainText(newsItem.contenido))}</p>
                    <a>Leer mas</a>
                </div>
            ))}
        </div>
    )
}

export default News