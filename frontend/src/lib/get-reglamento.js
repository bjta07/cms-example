import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getReglamentos(){
    return query('reglamentos?populate=documento').then(res => {
        return res.data.map(reglamento => ({
            id: reglamento.id,
            titulo: reglamento.titulo,
            documento: reglamento.documento ? `${STRAPI_HOST}${reglamento.documento.url}` : null,
            documento: reglamento.documento
        }))
    })
}