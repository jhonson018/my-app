const server =Bun.serve({
    port: 3000,
    fetch(request){
        const url = new URL(request.url);
        const pathname = url.pathname;
        const method = request.method;

        if (pathname==="/api/saludo" && method === "GET"){
            return Response.json({mensaje: "Hola"});  
        } 
        if (pathname === "/api/fecha" && method === "GET") {
            return Response.json({ fechaActual: new Date().toISOString() });
        }
        if (pathname === "/api/datos" && method === "POST") {
            return Response.json({ mensaje: "Datos recibidos correctamente mediante POST" });
        }
        return Response.json({ error: "Ruta no encontrada" }, { status: 404 });
    },
    
});

console.log(`🚀 Servidor puro corriendo en http://localhost:${server.port}`);