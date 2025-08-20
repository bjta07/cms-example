import { getArticles } from "@/lib/get-articles";
import Image from "next/image";
import styles from '@/styles/Articles.module.css'

const Articles = async () => {
    const articles = await getArticles()

    return(
        <div className={styles.articleContainer}>
            {articles?.map((article) => (
                <div key={article.id} className={styles.item}>
                    {article.image && (
                        <Image
                            src={article.image}
                            alt={article.titulo}
                            className={styles.articleImage}
                            width={114}
                            height={64}
                        />
                    )}
                    <h4>{article.titulo}</h4>
                </div>
            ))}
        </div>
    )
}

export default Articles