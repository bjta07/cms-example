import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getSociedadesCientificas(){
    return query('soc-cientificas?populate=logo').then( res => {
        return res.data.map(sociedad => ({
            id: sociedad.id,
            nombre: sociedad.nombre,
            logo: sociedad.logo ? `${STRAPI_HOST}${sociedad.logo.url}` : null,
            logos: sociedad.logo
        }))
    })
}