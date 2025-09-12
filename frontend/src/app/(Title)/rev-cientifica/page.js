// app/revista/page.js
import Link from 'next/link'
import { getRevistas } from "@/lib/get-revista"
import styles from '@/styles/RevistaCientifica.module.css'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const RevistaCientifica = async () => {
    const revistas = await getRevistas()
    
    const revistasSorted = revistas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        
    return(
        <div className={styles.container}>
            <div className={styles.revistasGrid}>
                {revistasSorted.map((revista) => (
                    <div key={revista.id} className={styles.revistaCard}>
                        <h2 className={styles.revistaTitle}>{revista.titulo}</h2>
                        <p className={styles.revistaFecha}>Fecha: {new Date(revista.fecha).toLocaleDateString('es-ES',{
                            year: 'numeric',
                            month: 'long',
                            day:'numeric',
                            timeZone: 'UTC'
                        })}
                        </p>
                        <p className={styles.revistaCodigo}>Código: {revista.codigo}</p>
                        <BlocksRenderer content={revista.descripcion}>Descripcion:</BlocksRenderer>
                        <Link 
                            href={`/rev-cientifica/${revista.codigo}`}
                            className={styles.readLink}
                        >
                            Leer Revista
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RevistaCientifica