import { query } from "./strapi";

export function getAboutCards(){
    return query("cards")
    .then(res => {
        return res.data.map(getAboutCard => ({
            id: getAboutCard.id,
            titulo: getAboutCard.titulo,
            descripcion: getAboutCard.descripcion
        }))
    })
}