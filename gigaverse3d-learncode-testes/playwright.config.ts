import { defineConfig, devices } from '@playwright/test';

// Porta onde a página web do SUT é servida durante os testes E2E.
const PORTA = 4321;

export default defineConfig({
  testDir: 'examples/e2e',
  // Reporter "line" no terminal; o relatório HTML fica disponível com `npx playwright show-report`.
  reporter: process.env.CI ? 'line' : [['line'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORTA}`,
    // Em caso de falha, guarda trace e screenshot para depuração (Trace Viewer).
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // O Playwright sobe a página do SUT sozinho antes de rodar os testes.
  webServer: {
    command: 'npm run sut:web',
    url: `http://localhost:${PORTA}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
