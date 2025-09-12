import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getPaginas(){
    return query('pagina-colegios?populate=*').then(
        res => {
            return res.data.map(pagina => {
                return{
                    id: pagina.id,
                    titulo: pagina.Titulo,
                    mision: pagina.mision,
                    vision: pagina.vision,
                    codColegio: pagina.codColegio,
                    telefono: pagina.numTelefono,
                    facebook: pagina.facebook,
                    url: pagina.url,
                    direccion: pagina.direccion,
                    presidente: pagina.presidenta,
                    tipoColegio: pagina.tipoColegio,
                    vice: pagina.vicepresidente,
                    logoUrl: pagina.logo ? `${STRAPI_HOST}${pagina.logo.url}` : null,
                    logoData: pagina.logo,
                    visionUrl: pagina.imagenVision ? `${STRAPI_HOST}${pagina.imagenVision.url}` : null,
                    visionData: pagina.imagenVision,
                    misionUrl: pagina.imagenMision ? `${STRAPI_HOST}${pagina.imagenMision.url}` : null,
                    misionData: pagina.imagenMision,
                }
            })
        }
    )
}