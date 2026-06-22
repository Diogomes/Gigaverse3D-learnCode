import { test, expect } from '@playwright/test';

// Locators semânticos (por papel/label) resistem a mudanças de layout, e as
// asserções do Playwright esperam sozinhas (auto-waiting) — sem sleep fixo.
test.describe('locators semânticos e auto-waiting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('seleciona por papel (role) e por label', async ({ page }) => {
    // getByRole encontra o cabeçalho pela semântica, não por CSS frágil.
    await expect(page.getByRole('heading', { name: /Jogadores do Gigaverse/ })).toBeVisible();
    // getByLabel acha o campo pela <label> associada.
    await expect(page.getByLabel('Nome')).toBeVisible();
    // getByRole com nome acessível encontra o botão.
    await expect(page.getByRole('button', { name: 'Adicionar' })).toBeVisible();
  });

  test('adicionar dois jogadores: a lista cresce na ordem (auto-waiting)', async ({ page }) => {
    await page.getByLabel('Nome').fill('Aria');
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await page.getByLabel('Nome').fill('Bo');
    await page.getByRole('button', { name: 'Adicionar' }).click();

    // toHaveText espera (retry automático) até a lista ter os dois itens.
    await expect(page.getByRole('listitem')).toHaveText(['Aria', 'Bo']);
  });

  test('nome vazio não adiciona nada à lista', async ({ page }) => {
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await expect(page.getByRole('listitem')).toHaveCount(0);
  });
});
