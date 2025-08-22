import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getNormativas(){
    return query('normativas?populate=documento').then(res => {
        return res.data.map(normativa => ({
            id: normativa.id,
            titulo: normativa.titulo,
            documento: normativa.documento ? `${STRAPI_HOST}${normativa.documento.url}` : null,
            documento: normativa.documento
        }))
    })
}