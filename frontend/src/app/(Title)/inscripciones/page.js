import Servicios from "@/components/UI/Servicios"
import { getInscripciones } from "@/lib/get-inscripciones"

const Inscripciones =async () => {
    const inscripciones = await getInscripciones()
    return(
        <div>
            <Servicios items = {inscripciones}/>
        </div>
    )
}

export default Inscripciones