import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getCirculars(){
    return query("circulars?populate=document").then(
        res => {
            return res.data.map(getCircular => ({
                id: getCircular.id,
                titulo: getCircular.name,
                fecha: getCircular.date,
                document: getCircular.document ? `${STRAPI_HOST}${getCircular.document.url}`: null,
                documents: getCircular.document
            }))
        }
    )
}
