import { getCongresos } from "@/lib/get-congresos"
import { getEspecialidades } from "@/lib/get-especialidades"
import ListaCongresos from "@/components/UI/ListaCongresos"
import styles from '@/styles/Documents.module.css'

const Formacion = async () => {
    const [congresos, especialidades] = await Promise.all([
        getCongresos(),
        getEspecialidades()
    ])

    return(
        <div className={styles.dashboard}>
            <div className={styles.mainContainer}>
                <div>
                    <ListaCongresos
                        documents={congresos}
                        title="Congresos"
                    />
                </div>
                <div>
                    <ListaCongresos
                        documents={especialidades}
                        title="Especialidades"
                    />
                </div>
            </div>
        </div>
    )
}

export default Formacion