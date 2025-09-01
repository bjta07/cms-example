import getCertificados from "@/lib/get-certificados"
import Servicios from "@/components/UI/Servicios"

const Certificados = async () => {
  const certificados = await getCertificados()

  return (
    <div>
      <Servicios items={certificados}/>
    </div>
  )
}

export default Certificados