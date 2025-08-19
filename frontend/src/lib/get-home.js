// Función para obtener datos de la home

import { query } from "./strapi"

const { STRAPI_HOST } = process.env

export function getHomeData (){
  return query("home-page?populate=cover")
    .then(res => {
      const { titulo, descripcion, cover, buttonText} = res.data
      const image = `${STRAPI_HOST}${cover.url}`
      return { titulo, descripcion, image, buttonText}
    })
};