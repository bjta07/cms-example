const STRAPI_HOST = process.env.STRAPI_HOST || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export function query (url){
    if (!STRAPI_HOST) {
        throw new Error('STRAPI_HOST is not defined');
    }

    const apiUrl = `${STRAPI_HOST}/api/${url}`.replace(/([^:]\/)\/+/g, "$1");
    
    console.log('Fetching from:', apiUrl); // Para debugging
    
    return fetch(apiUrl, {
        headers: {
            Authorization: STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : '',
        }
    }).then(async res => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(`API error: ${error}`);
        }
        return res.json();
    }).catch(error => {
        console.error('API request failed:', error);
        throw error;
    });
} 