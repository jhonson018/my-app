/**
 * @fileoverview Servidor HTTP básico creado con Bun que actúa como una API REST básica.
 * @module server
 */

/**
 * Instancia del servidor HTTP de Bun.
 * Configura el puerto y maneja las peticiones entrantes.
 * * @type {import("bun").Server}
 */
const server = Bun.serve({
    /**
     * Puerto en el que escuchará el servidor.
     * @type {number}
     */
    port: 3000,

    /**
     * Manejador central de peticiones HTTP (Función Fetch).
     * Se encarga de enrutar las solicitudes según el path y el método HTTP.
     *
     * @param {Request} request - Objeto que representa la petición HTTP recibida.
     * @returns {Response} Objeto que representa la respuesta HTTP enviada al cliente.
     * * @example
     * // Endpoints disponibles:
     * // GET  /api/saludo -> { mensaje: "Hola" }
     * // GET  /api/fecha  -> { fechaActual: "2026-06-22T..." }
     * // POST /api/datos  -> { mensaje: "Datos recibidos..." }
     */
    fetch(request) {
        /** @type {URL} */
        const url = new URL(request.url);
        /** @type {string} */
        const pathname = url.pathname;
        /** @type {string} */
        const method = request.method;

        // Endpoint: Saludo
        if (pathname === "/api/saludo" && method === "GET") {
            return Response.json({ mensaje: "Hola" });  
        } 

        // Endpoint: Fecha actual
        if (pathname === "/api/fecha" && method === "GET") {
            return Response.json({ fechaActual: new Date().toISOString() });
        }

        // Endpoint: Recepción de datos
        if (pathname === "/api/datos" && method === "POST") {
            return Response.json({ mensaje: "Datos recibidos correctamente mediante POST" });
        }

        // Manejo de rutas no encontradas (404)
        return Response.json({ error: "Ruta no encontrada" }, { status: 404 });
    },
});

console.log(`🚀 Servidor puro corriendo en http://localhost:${server.port}`);