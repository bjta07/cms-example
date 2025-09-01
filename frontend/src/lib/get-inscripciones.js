import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getInscripciones() {
    return query ('inscripcions?populate=requisitos').then(
        res => {
            return res.data.map(getInscripcion => ({
                id: getInscripcion.id,
                titulo: getInscripcion.titulo,
                documento: getInscripcion.requisitos ? `${STRAPI_HOST}${getInscripcion.requisitos.url}` : null,
                documentos: getInscripcion.requisitos,
                tipo: 'inscripcion'
            }))
        }
    )
}

export default getInscripciones