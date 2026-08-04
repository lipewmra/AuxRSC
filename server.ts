import path from 'path';
import { createServer as createViteServer } from 'vite';
import { app } from './api/index';

const PORT = 3000;

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(expressStatic(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor RSC rodando em http://0.0.0.0:${PORT}`);
  });
}

function expressStatic(distPath: string) {
  const express = require('express');
  return express.static(distPath);
}

startServer();
