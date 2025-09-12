import { getPaginas } from "@/lib/get-pagina"
import Colegios from "@/components/UI/Colegios"

export default async function Page() {
  const paginas = await getPaginas()

  return (
    <main>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Colegios de Enfermeras de Bolivia
      </h1>
      <Colegios paginas={paginas} />
    </main>
  )
}
