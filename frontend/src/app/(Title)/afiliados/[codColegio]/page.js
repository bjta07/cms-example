import { getPaginas } from "@/lib/get-pagina"
import Image from "next/image"
import { notFound } from 'next/navigation'
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Icon from "@/components/UI/Icons"
import styles from '@/styles/PageColegio.module.css'
import Link from "next/link"


export default async function ColegioDetalle({ params }) {
  const { codColegio } = await params   // 👈 importante el await
  const paginas = await getPaginas()
  const pagina = paginas.find(p => p.codColegio === codColegio)

  if (!pagina) {
    notFound()
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>{pagina.titulo}</h1>
        {pagina.logoUrl && (
          <Image
            src={pagina.logoUrl}
            alt={`Logo de ${pagina.titulo}`}
            width={350}
            height={350}
          />
        )}
      </div>

      <div className={styles.containerCards}>
        <div className={styles.itemCard}>
          <h3><strong>Misión:</strong></h3>
          <BlocksRenderer content={pagina.mision} />
        </div>
        <div className={styles.itemCard}>
          <h3><strong>Visión:</strong></h3>
          <BlocksRenderer content={pagina.vision} />
        </div>
      </div>

      <div className={styles.directiva}>
        <div className={styles.tituloDirectiva}>
          <h3>Nuestra Directiva</h3>
        </div>
        <div className={styles.miembros}>
          <div className={styles.miembrosItem}>
            <Image src={pagina.visionUrl} alt="presidente" width={250} height={350}/>
            <p>{pagina.presidente}</p>
            <h5>Presidente</h5>
          </div>
          <div className={styles.miembrosItem}>
            <h5>Vicepresidente:</h5>
            <p>{pagina.vice}</p>
          </div>
        </div>
      </div>

      <div className={styles.contacto}>
        <div className={styles.tituloContacto}>
          <h3 className={styles.h3}>Contáctanos</h3>
        </div>
        <div className={styles.items}>
          <div className={styles.contactItem}>
            <h5>Teléfono: </h5>
            <p><Icon name="phone" fill/>{pagina.telefono}</p>
          </div>
          <div className={styles.contactItem}>
            <h5>Dirección: </h5>
            <p><Icon name="location" fill/>{pagina.direccion}</p>
          </div>
          <div className={styles.contactItem}>
            <h5>Nuestras Redes: </h5>
            <p><Icon name="facebook" fill/><Link href={pagina.facebook} target="_blank" rel="noopener noreferrer">facebook</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
