import { getDocuments } from "@/lib/get-documents"
import { getCirculars } from "@/lib/get-circulars"
import Documents from "@/components/UI/Documents"
import styles from '@/styles/Documents.module.css'

const DocumentosYCirculares = async () => {
    const [documents, circulars] = await Promise.all([
        getDocuments(),
        getCirculars()
    ])

    return(
        <div className={styles.dashboard}>
            <div className={styles.mainContainer}>
                <Documents
                    documents={documents}
                    title="Documentos de Interes"
                />
                <Documents
                    documents={circulars}
                    title="Circulares"
                />
            </div>
        </div>
    )
}

export default DocumentosYCirculares