import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getCursos(){
    return query ('cursos?populate=overlay').then(
        res => {
            return res.data.map(getCurso => ({
                id: getCurso.id,
                titulo: getCurso.titulo,
                fechaPublicacion: getCurso.updatedAt,
                codigo: getCurso.codigo,
                fecha: getCurso.fecha,
                activo: getCurso.activo,
                cover: getCurso.overlay ? `${STRAPI_HOST}${getCurso.overlay.url}` : null,
                covers: getCurso.overlay
            }))
        }
    )
}

export default getCursos