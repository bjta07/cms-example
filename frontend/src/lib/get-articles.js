import { query } from "@/lib/strapi";

const { STRAPI_HOST } = process.env

export function getArticles(){
    return query("articles?populate=cover")
        .then(res => {
            return res.data.map(article => {
                
                return {
                    id: article.id,
                    titulo: article.titulo,
                    // Cambiado: ahora pasamos directamente el array de bloques
                    description: article.descripcion, // Este ya es el array de bloques
                    image: article.cover ? `${STRAPI_HOST}${article.cover.url}` : null,
                    cover: article.cover
                }
            })
        })
}