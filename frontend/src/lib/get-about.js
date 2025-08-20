import { query } from "./strapi";

const { STRAPI_HOST } = process.env

//funcion para obtener el contenido de about
export function getAbout(){
    return query("about?populate=cover")
        .then(res => {
            const { titulo, descripcion, cover} = res.data
            const image = `${STRAPI_HOST}${cover.url}`
            return { titulo, descripcion, image}
    })
}
