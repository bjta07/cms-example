import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getDocuments(){
    return query("documentos?populate=document").then(
        res => {
            return res.data.map(getDocument => ({
                id: getDocument.id,
                titulo: getDocument.name,
                fecha: getDocument.date,
                document: getDocument.document ? `${STRAPI_HOST}${getDocument.document.url}`: null,
                documents: getDocument.document
            }))
        }
    )
}
