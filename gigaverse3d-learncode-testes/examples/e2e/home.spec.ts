import { test, expect } from '@playwright/test';

// Exemplo E2E (Módulo 12). Precisa dos navegadores do Playwright instalados:
//   npx playwright install --with-deps
test('a home do Gigaverse mostra o título', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Gigaverse/);
  await expect(page.getByRole('heading', { name: /Jogadores do Gigaverse/ })).toBeVisible();
});

test('adicionar um jogador faz a lista crescer', async ({ page }) => {
  await page.goto('/');
  // Locators semânticos: por label e por role (resistem a mudanças de layout).
  await page.getByLabel('Nome').fill('Aria');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  // Asserção com retry automático (sem sleep fixo).
  await expect(page.getByRole('listitem')).toHaveText(['Aria']);
});
