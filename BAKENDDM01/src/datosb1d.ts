/**
 * Servidor en TypeScript para recibir Nombre, Edad e Imagen usando Bun.
 */
const server = Bun.serve({
    port: 3000,
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);

        // Endpoint para procesar el formulario
        if (url.pathname === "/api/usuario" && request.method === "POST") {
            try {
                // 1. Parsear el cuerpo de la petición como FormData
                const data = await request.formData();

                // 2. Extraer los campos del formulario (dejamos que TS infiera el tipo nativo básico)
                const nombre = data.get("nombre");
                const edad = data.get("edad");
                const imagen = data.get("imagen");

                // Validación básica de los campos de texto
                if (!nombre || !edad) {
                    return Response.json(
                        { error: "Falta el nombre o la edad" }, 
                        { status: 400 }
                    );
                }

                // 3. Type Guard usando 'instanceof' con la clase global 'File'
                // Esto soluciona los errores de .name y .size inmediatamente.
                if (imagen && imagen instanceof File) {
                    
                    // Si el archivo está vacío, lanzamos un error
                    if (imagen.size === 0) {
                        return Response.json(
                            { error: "La imagen subida está vacía" }, 
                            { status: 400 }
                        );
                    }

                    // Definimos la ruta local donde guardaremos el archivo
                    const rutaDestino = `./uploads/${imagen.name}`;
                    
                    // Bun escribe el archivo de forma ultra rápida
                    await Bun.write(rutaDestino, imagen);

                    return Response.json({
                        mensaje: `Usuario ${nombre.toString()} de ${edad.toString()} años registrado con éxito.`,
                        archivoGuardado: rutaDestino,
                        tamanoArchivo: `${(imagen.size / 1024).toFixed(2)} KB`
                    });
                }

                // Si no se envió un archivo válido
                return Response.json({
                    mensaje: `Usuario ${nombre.toString()} registrado, pero no se envió ninguna imagen válida.`
                });

            } catch (error) {
                return Response.json(
                    { error: "Error interno al procesar el formulario" }, 
                    { status: 500 }
                );
            }
        }

        return Response.json({ error: "Ruta no encontrada" }, { status: 404 });
    }
});

console.log(`🚀 Servidor TypeScript corriendo en http://localhost:${server.port}`);