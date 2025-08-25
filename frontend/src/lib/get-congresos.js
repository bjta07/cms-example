import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getCongresos(){
    return query ('congresos?populate=documento').then(
        res => {
            return res.data.map(getCongreso => ({
                id: getCongreso.id,
                titulo: getCongreso.titulo,
                fecha: getCongreso.date,
                document: getCongreso.documento ? `${STRAPI_HOST}${getCongreso.documento.url}` : null,
                documents: getCongreso.documento
            }))
        }
    )
}

export default getCongresos