import { query } from "./strapi";

const { STRAPI_HOST } = process.env

export function getCertificados() {
    return query ('certificados?populate=requisitos').then(
        res => {
            return res.data.map(getCertificado => ({
                id: getCertificado.id,
                titulo: getCertificado.titulo,
                documento: getCertificado.requisitos ? `${STRAPI_HOST}${getCertificado.requisitos.url}` : null,
                documentos: getCertificado.requisitos,
                tipo: 'certificado'
            }))
        }
    )
}

export default getCertificados