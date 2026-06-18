import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Servidor estático mínimo: entrega a página do SUT para os testes E2E.
// O Playwright sobe este servidor automaticamente (webServer no playwright.config.ts).
const dir = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(dir, 'index.html'), 'utf-8');
const porta = Number(process.env.PORT ?? 4321);

createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}).listen(porta, () => {
  console.log(`SUT web no ar em http://localhost:${porta}`);
});
