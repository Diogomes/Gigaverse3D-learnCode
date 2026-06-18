import { defineConfig } from 'vitest/config';

// Vitest roda os exemplos de teste UNITÁRIO e de API (Supertest também roda sob o Vitest).
// Os testes E2E (Playwright) ficam de fora — eles têm seu próprio runner.
export default defineConfig({
  test: {
    include: ['examples/unit/**/*.test.ts', 'examples/api/**/*.test.ts'],
    environment: 'node',
  },
});
