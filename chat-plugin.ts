export function chatApiPlugin() {
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', chatMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/chat', chatMiddleware);
    }
  };
}

async function chatMiddleware(req, res, next) {
  if (req.method !== 'POST') return next();
  
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      // Process data...
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  });
}
