'use client'
import Image from "next/image"
import styles from "@/styles/Servicios.module.css"

const Servicios = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div>
        <p>No hay elementos disponibles</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {items.map((item) => {
        // Seleccionar imagen según el tipo
        let imageSrc = "/images/default.jpg"
        let imageAlt = "Documento"

        if (item.tipo === "certificado") {
          imageSrc = "/images/certificado.webp"
          imageAlt = "Certificado"
        } else if (item.tipo === "inscripcion") {
          imageSrc = "/images/inscripciones.jpg"
          imageAlt = "Inscripción"
        }

        return (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                className={styles.image}
                width={287}
                height={160}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.titulo}>{item.titulo || "Sin título"}</h3>
              <div className={styles.buttonContainer}>
                {item.documento ? (
                  <a
                    href={item.documento}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                  >
                    Ver requisitos
                  </a>
                ) : (
                  <p className={styles.noDocument}>Documento no disponible</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Servicios

