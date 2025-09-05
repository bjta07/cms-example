import { getSociedadesCientificas } from "@/lib/get-sociedades"
import Image from "next/image"
import styles from '@/styles/SociedadesCientificas.module.css'

const SociedadCientifica = async () => {
    const sociedades = await getSociedadesCientificas()
    return(
        <div className={styles.container}>
            <div className={styles.sociedadesGrid}>
                {sociedades.map((sociedad)=>(
                    <div key={sociedad.id} className={styles.itemContainer}>
                        <div className={styles.logoContainer}>
                            <Image 
                                src={sociedad.logo} 
                                alt={sociedad.nombre}
                                width={170}
                                height={170}
                                className={styles.logo}
                            />
                            <h3 className={styles.title}>{sociedad.nombre}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SociedadCientifica