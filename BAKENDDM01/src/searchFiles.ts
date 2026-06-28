const server = Bun.serve({
    port: 3000,
    async fetch(request: Request): Promise <Respone> {
  const url = new URL(request.url);
        
    }
})