import { test, expect } from '@playwright/test';

// DESAFIO — Módulo 12 (E2E com Playwright)
// O teste abre a home e adiciona um jogador. As asserções estão erradas de
// propósito e deixam o teste VERMELHO. Corrija para deixá-lo VERDE.
test('desafio: adicionar um jogador faz a lista crescer', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Nome').fill('Aria');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  // TODO: depois de adicionar "Aria", a lista deve ter 1 item com esse texto.
  await expect(page.getByRole('listitem')).toHaveCount(0); // corrija a contagem
  await expect(page.getByRole('listitem')).toHaveText(['Outro']); // corrija o texto
});
