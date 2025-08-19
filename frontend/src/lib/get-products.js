import { query } from "./strapi";

const { STRAPI_HOST } = process.env

// Función para obtener productos
export function getProducts(){
  return query("products?populate=cover")
    .then(res => {
      // res.data es un array, así que lo retornamos directamente
      return res.data.map(product => ({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        categoria: product.categoria, // nota: era "cateogoria" con typo
        image: product.cover ? `${STRAPI_HOST}${product.cover.url}` : null,
        cover: product.cover
      }))
    })
}