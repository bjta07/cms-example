// Función para obtener datos de la home

import { query } from "./strapi"


export function getHomeData (){
  return query("home-page")
    .then(res => {
      const { titulo, descripcion} = res.data
      return { titulo, descripcion}
    })
};