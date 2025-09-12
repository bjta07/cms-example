// app/api/inscripciones/route.js
const { STRAPI_HOST } = process.env

export async function POST(request) {
    try {
        const formData = await request.json();

        // Buscar el congreso por su código UID para obtener el ID
        let congresoId = null;
        if (formData.congresoCodigo) {
            console.log("Buscando congreso con código:", formData.congresoCodigo);
            
            // Usar el endpoint correcto basado en tus logs
            const searchUrl = `${STRAPI_HOST}/api/congresos?filters[Cod][$eq]=${formData.congresoCodigo}`;
            
            try {
                const congresoRes = await fetch(searchUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (congresoRes.ok) {
                    const congresoData = await congresoRes.json();
                    
                    if (congresoData.data && congresoData.data.length > 0) {
                        congresoId = congresoData.data[0].id;
                    } else {
                        console.log("❌ No se encontró congreso con código:", formData.congresoCodigo);
                    }
                } else {
                    const errorText = await congresoRes.text();
                }
            } catch (searchError) {
                console.log("Error al hacer fetch:", searchError.message);
            }
        }

        // Preparar los datos para Strapi, incluyendo la relación
        const dataToSend = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            CI: formData.CI,
            email: formData.email,
            telefono: formData.telefono,
            departamento: formData.departamento,
            validacion: "Pendiente",
            CodCongreso: formData.congresoCodigo // Guardamos el código directamente
        };

        // Agregar la relación si encontramos el congreso
        if (congresoId) {
            dataToSend.lista_congreso = {
                connect: [congresoId] // Formato correcto para relaciones en Strapi v4
            };
        } else {
            console.log("⚠️ No se agregó relación porque no se encontró el congreso");
        }

        const res = await fetch(`${STRAPI_HOST}/api/inscongresos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    ...dataToSend,
                    lista_congreso: congresoId ? {
                        connect: [congresoId]
                    } : undefined
                }
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }
        const result = await res.json();

        return Response.json({ success: true, data: result.data });

    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}