import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getEspecialidades(){
    return query ('especialidads?populate=documento').then(
        res => {
            return res.data.map(getEspecialidad => ({
                id: getEspecialidad.id,
                titulo: getEspecialidad.titulo,
                fecha: getEspecialidad.date,
                document: getEspecialidad.documento ? `${STRAPI_HOST}${getEspecialidad.documento.url}` : null,
                documents: getEspecialidad.documento
            }))
        }
    )
}

export default getEspecialidades