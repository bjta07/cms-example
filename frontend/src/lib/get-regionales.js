import { query } from "./strapi";

const STRAPI_HOST = process.env.STRAPI_HOST || 'http://localhost:1337';

export function getRegionales(){
    return query('regionals?populate=logo').then(res => {
        return res.data.map(regional => {
            // Extraer el texto de la descripción si está en formato de bloques
            const descripcionText = regional.descripcion?.[0]?.children?.[0]?.text || regional.descripcion;

            return {
                id: regional.id,
                titulo: regional.titulo,
                descripcion: descripcionText,
                imagen: regional.logo ? `${STRAPI_HOST}${regional.logo.url}` : null,
                url: regional.url
            }
        })
    })
}