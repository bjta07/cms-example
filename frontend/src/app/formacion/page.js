import { getCongresos } from "@/lib/get-congresos"
import { getEspecialidades } from "@/lib/get-especialidades"
import Documents from "@/components/UI/Documents"
import styles from '@/styles/Documents.module.css'

const Formacion = async () => {
    const [congresos, especialidades] = await Promise.all([
        getCongresos(),
        getEspecialidades()
    ])

    return(
        <div className={styles.dashboard}>
            <div className={styles.mainContainer}>
                <Documents
                    documents={congresos}
                    title="Documentos de Interes"
                />
                <Documents
                    documents={especialidades}
                    title="Circulares"
                />
            </div>
        </div>
    )
}

export default Formacion