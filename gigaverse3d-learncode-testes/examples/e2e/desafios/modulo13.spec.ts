import { test, expect } from '@playwright/test';

// DESAFIO — Módulo 13 (locators semânticos e auto-waiting)
// Use um locator SEMÂNTICO para o botão (por papel + nome), em vez de um
// seletor CSS frágil, e ajuste a asserção da lista. Corrija para VERDE.
test('desafio: selecionar por papel e conferir a lista', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Nome').fill('Aria');

  // TODO: troque o seletor CSS por um locator semântico:
  // page.getByRole('button', { name: 'Adicionar' })
  await page.locator('#nao-existe').click();

  // TODO: a lista deve conter exatamente ['Aria'].
  await expect(page.getByRole('listitem')).toHaveText(['errado']);
});
