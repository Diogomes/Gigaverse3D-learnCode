import { defineConfig } from 'vitest/config';

// Vitest roda os exemplos de teste UNITÁRIO e de API (Supertest também roda sob o Vitest).
// Os testes E2E (Playwright) ficam de fora — eles têm seu próprio runner.
export default defineConfig({
  test: {
    // Unitários, de API e os arquivos de desafio do curso interativo. Os E2E
    // (.spec.ts) ficam de fora — eles rodam pelo Playwright.
    include: [
      'examples/unit/**/*.test.ts',
      'examples/api/**/*.test.ts',
      'examples/desafios/**/*.test.ts',
    ],
    environment: 'node',
  },
});
