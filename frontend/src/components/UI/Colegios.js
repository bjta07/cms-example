'use client'

import Image from "next/image"
import styles from "@/styles/Colegios.module.css"
import { useRouter } from "next/navigation"

export default function Colegios({ paginas }) {
  const router = useRouter()

  // Filtrar por tipo de colegio
  const departamentales = paginas.filter(p => p.tipoColegio === "Departamental")
  const regionales = paginas.filter(p => p.tipoColegio === "Regional")

  // función para manejar clic en el botón
  const handleVisitar = (pagina) => {
    if (pagina.url) {
      // si tiene URL externa -> redirige ahí
      window.open(pagina.url, "_blank")
    } else {
      // si no tiene URL -> redirige a página interna dinámica
      router.push(`/afiliados/${pagina.codColegio}`)
    }
  }

  // función que renderiza tarjetas
  const renderTarjetas = (lista) => (
    <div className={styles.grid}>
      {lista.map((pagina) => (
        <div key={pagina.id} className={styles.card}>
          {pagina.logoUrl && (
            <Image src={pagina.logoUrl} alt={`Logo de ${pagina.titulo}`}  className={styles.logo} width={150} height={150}/>
          )}
          <h3>{pagina.titulo}</h3>
          <button onClick={() => handleVisitar(pagina)} className={styles.button}>
            Visitar página
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <div className={styles.container}>
      <section>
        <h2>Colegios Departamentales</h2>
        {renderTarjetas(departamentales)}
      </section>

      <section>
        <h2>Colegios Regionales</h2>
        {renderTarjetas(regionales)}
      </section>
    </div>
  )
}
