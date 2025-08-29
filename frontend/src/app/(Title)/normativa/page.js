import { getNormativas } from "@/lib/get-normativa"
import { getReglamentos } from "@/lib/get-reglamento"
import Documents from "@/components/UI/Documents"
import styles from '@/styles/Documents.module.css'

const Normativa = async () => {
    const [normativas, reglamentos] = await Promise.all([
        getNormativas(),
        getReglamentos()
    ])

    return(
        <div className={styles.dashboard}>
            <div className={styles.mainContainer}>
                <Documents
                    documents = {normativas}
                    title="Normativas"
                />
                <Documents
                    documents = {reglamentos}
                    title="Reglamentos"
                />
            </div>
        </div>
    )
}

export default Normativa