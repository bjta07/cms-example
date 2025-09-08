import { getCursos } from "@/lib/get-cursos"
import ListaCursos from "@/components/UI/Cursos"

const Cursos = async () => {
    const cursos = await getCursos()
    return(
        <div>
            <ListaCursos
                documents={cursos}
            />
        </div>
    )
}

export default Cursos