import { NextResponse } from 'next/server';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const pageSize = searchParams.get('pageSize') || '3';
        
        const url = `${STRAPI_HOST}/api/noticias?populate=photo&sort[0]=fecha:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Transformar los datos como lo haces en getNews
        const transformedData = {
            data: data.data.map(getNew => ({
                id: getNew.id,
                titulo: getNew.titulo,
                fecha: getNew.fecha,
                contenido: getNew.contenido,
                imagen: getNew.photo && getNew.photo.length > 0
                    ? `${STRAPI_HOST}${getNew.photo[0].url}`
                    : null,
                imagenes: getNew.photo
                    ? getNew.photo.map(img => `${STRAPI_HOST}${img.url}`)
                    : [],
                photo: getNew.photo,
                idPhoto: getNew.photo && getNew.photo.length > 0
                    ? getNew.photo[0].id
                    : null
            })),
            meta: {
                pagination: data.meta.pagination
            }
        };

        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Error al obtener las noticias' }, 
            { status: 500 }
        );
    }
}