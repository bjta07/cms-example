import { getDocuments } from "@/lib/get-documents"
import { getCirculars } from "@/lib/get-circulars"
import Documents from "@/components/UI/Documents"

const DocumentosYCirculares = async () => {
    const [documents, circulars] = await Promise.all([
        getDocuments(),
        getCirculars()
    ])

    return(
        <div>
            <Documents
                documents={documents}
                title="Documentos de Interes"
            />
            <Documents
                documents={circulars}
                title="Circulares"
            />
        </div>
    )
}

export default DocumentosYCirculares