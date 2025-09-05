// app/api/inscripciones/route.js
const { STRAPI_HOST } = process.env

export async function POST(request) {
    try {
        const formData = await request.json();
        console.log("Datos recibidos:", formData);

        // Buscar el congreso por su código UID para obtener el ID
        let congresoId = null;
        if (formData.congresoCodigo) {
            console.log("Buscando congreso con código:", formData.congresoCodigo);
            
            // Usar el endpoint correcto basado en tus logs
            const searchUrl = `${STRAPI_HOST}/api/congresos?filters[Cod][$eq]=${formData.congresoCodigo}`;
            console.log("URL de búsqueda:", searchUrl);
            
            try {
                const congresoRes = await fetch(searchUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Respuesta de búsqueda:", congresoRes.status);
                
                if (congresoRes.ok) {
                    const congresoData = await congresoRes.json();
                    console.log("Datos obtenidos:", congresoData);
                    
                    if (congresoData.data && congresoData.data.length > 0) {
                        congresoId = congresoData.data[0].id;
                        console.log("✅ Congreso encontrado con ID:", congresoId);
                    } else {
                        console.log("❌ No se encontró congreso con código:", formData.congresoCodigo);
                        console.log("Datos devueltos por Strapi:", congresoData);
                    }
                } else {
                    const errorText = await congresoRes.text();
                    console.log("Error en búsqueda:", errorText);
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
            console.log("✅ Agregando relación lista_congreso:", congresoId);
        } else {
            console.log("⚠️ No se agregó relación porque no se encontró el congreso");
        }

        console.log("Datos a enviar a Strapi:", dataToSend);

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
            console.log("Error de Strapi:", errorText);
            throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const result = await res.json();
        console.log("Respuesta de Strapi:", result);

        return Response.json({ success: true, data: result.data });

    } catch (error) {
        console.error("Error en API:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}