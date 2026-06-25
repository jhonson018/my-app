/**
 * @fileoverview Servidor HTTP nativo en Bun puro que implementa un CRUD completo
 * utilizando condicionales manuales y documentación estructurada con JSDoc.
 * @author Jhonson Adames
 * @version 1.0.0
 */

/**
 * Configuración e inicialización del servidor nativo de Bun.
 * Se ejecuta en el puerto 3000 de manera local.
 */
const server = Bun.serve({
  port: 3000,

  /**
   * Función central que procesa cada petición HTTP entrante al servidor.
   * * @param {Request} request - Objeto nativo que contiene los datos crudos de la petición del cliente.
   * @returns {Response} Respuesta estructurada en formato JSON para el cliente.
   */
  fetch(request) {
    // Extracción de metadatos de la petición
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;

    // =========================================================================
    // 1. MÉTODO GET (Leer/Consultar)
    // =========================================================================
    /**
     * @endpoint GET /api/productos
     * @description Devuelve la lista completa de productos disponibles.
     */
    if (pathname === "/api/productos" && method === "GET") {
      return Response.json({
        accion: "Leer productos",
        datos: [
          { id: 1, nombre: "Laptop", precio: 800 },
          { id: 2, nombre: "Mouse", precio: 25 }
        ]
      });
    }

    // =========================================================================
    // 2. MÉTODO POST (Crear/Agregar)
    // =========================================================================
    /**
     * @endpoint POST /api/productos
     * @description Recibe los datos de un nuevo producto y simula su creación.
     * @note En un entorno real, aquí se usaría 'await request.json()' para leer el body.
     */
    if (pathname === "/api/productos" && method === "POST") {
      return Response.json({
        accion: "Crear producto",
        mensaje: "El producto fue registrado exitosamente en el sistema."
      }, { status: 201 }); // 201 significa "Created" (Creado con éxito)
    }

    // =========================================================================
    // 3. MÉTODO PUT (Actualizar por completo)
    // =========================================================================
    /**
     * @endpoint PUT /api/productos
     * @description Reemplaza por completo los datos de un producto existente.
     * @tutorial Se usa PUT cuando mandas el objeto ENTERO de nuevo para sobreescribirlo.
     */
    if (pathname === "/api/productos" && method === "PUT") {
      return Response.json({
        accion: "Actualización total (PUT)",
        mensaje: "Todo el producto ID: 1 fue sobreescrito con los nuevos datos enviados."
      });
    }

    // =========================================================================
    // 4. MÉTODO PATCH (Actualizar parcialmente)
    // =========================================================================
    /**
     * @endpoint PATCH /api/productos
     * @description Modifica únicamente un campo específico de un registro (ej. solo el precio).
     * @tutorial Se usa PATCH para ahorrar ancho de banda cuando no necesitas mandar todo el objeto.
     */
    if (pathname === "/api/productos" && method === "PATCH") {
      return Response.json({
        accion: "Actualización parcial (PATCH)",
        mensaje: "El precio del producto ID: 1 fue modificado. Los demás campos quedaron intactos."
      });
    }

    // =========================================================================
    // 5. MÉTODO DELETE (Eliminar)
    // =========================================================================
    /**
     * @endpoint DELETE /api/productos
     * @description Remueve de forma definitiva un recurso del servidor.
     */
    if (pathname === "/api/productos" && method === "DELETE") {
      return Response.json({
        accion: "Eliminar recurso (DELETE)",
        mensaje: "El producto seleccionado fue borrado correctamente del sistema."
      });
    }

    // =========================================================================
    // RED DE SEGURIDAD (ERROR 404)
    // =========================================================================
    /**
     * Manejador por defecto para cualquier ruta o método no registrado arriba.
     */
    return Response.json(
      { error: "Recurso no encontrado", detalle: `El método ${method} en la ruta ${pathname} no existe.` },
      { status: 404 }
    );
  },
});

console.log(`🚀 Servidor CRUD corriendo en http://localhost:${server.port}`);