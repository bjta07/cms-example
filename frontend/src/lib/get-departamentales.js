import { query } from "./strapi";

const STRAPI_HOST = process.env.STRAPI_HOST || 'http://localhost:1337';

export function getDepartamentales(){
    return query('departamentals?populate=logo').then(res => {
        return res.data.map(departamental => {
            // Extraer el texto de la descripción si está en formato de bloques
            const descripcionText = departamental.descripcion?.[0]?.children?.[0]?.text || departamental.descripcion;

            return {
                id: departamental.id,
                titulo: departamental.titulo,
                descripcion: descripcionText,
                imagen: departamental.logo ? `${STRAPI_HOST}${departamental.logo.url}` : null,
                url: departamental.url
            }
        })
    })
}