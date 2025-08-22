import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export function getNews(){
    return query("noticias?populate=photo").then(
        res => {
            return res.data.map(getNew => ({
                id: getNew.id,
                titulo: getNew.titulo,
                fecha: getNew.fecha,
                contenido: getNew.contenido,
                //Tomar solo la primera imagen
                imagen: getNew.photo && getNew.photo.length > 0 
                    ? `${STRAPI_HOST}${getNew.photo[0].url}` 
                    : null,
                //Mapear todas las imágenes
                imagenes: getNew.photo 
                    ? getNew.photo.map(img => `${STRAPI_HOST}${img.url}`)
                    : [],
                photo: getNew.photo,
                idPhoto: getNew.photo && getNew.photo.length > 0 
                    ? getNew.photo[0].id 
                    : null
            }))
        }
    )
}