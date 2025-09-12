import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getRevistas(){
    return query("rev-cientificas?populate=Documento").then( res => {
        return res.data.map(revista => ({
            id: revista.id,
            titulo: revista.Titulo,
            descripcion: revista.Descripcion,
            fecha: revista.Fecha,
            codigo: revista.Codigo,
            documento: revista.Documento ? `${STRAPI_HOST}${revista.Documento.url}` : null,
            documentos: revista.Documento
        }))
    })
}

export function getRevistaByCodigo(codigo){
    return query(`rev-cientificas?filters[Codigo][$eq]=${codigo}&populate=Documento`).then( res => {
        if (!res.data || res.data.length === 0) {
            return null
        }
        
        const revista = res.data[0] // Toma la primera (debería ser única)
        return {
            id: revista.id,
            titulo: revista.Titulo,
            descripcion: revista.Descripcion,
            fecha: revista.Fecha,
            codigo: revista.Codigo,
            url: revista.Documento ? `${STRAPI_HOST}${revista.Documento.url}` : null, 
            documento: revista.Documento
        }
    }).catch(error => {
        return null
    })
}