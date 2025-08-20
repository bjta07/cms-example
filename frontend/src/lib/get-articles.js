import { query } from "@/lib/strapi";

const { STRAPI_HOST } = process.env

export function getArticles(){
    return query("articles?populate=cover")
        .then(res => {
            return res.data.map(article => ({
                id: article.id,
                titulo: article.titulo,
                image: article.cover ? `${STRAPI_HOST}${article.cover.url}` : null,
                cover: article.cover
            }))
        })
}