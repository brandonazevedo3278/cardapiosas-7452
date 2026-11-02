import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    root: process.cwd(),
    configFile: './vite.config.ts',
  });
  await server.listen(4200);
  console.log('--- VITE SERVER RUNNING ON PORT 4200 ---');
  server.printUrls();
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
