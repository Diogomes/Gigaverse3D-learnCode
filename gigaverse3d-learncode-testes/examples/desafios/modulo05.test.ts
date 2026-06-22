import { describe, it, expect } from 'vitest';
import { Carteira } from '../../sut/core/carteira';

// DESAFIO — Módulo 5 (setup/teardown e isolamento)
// BUG: a carteira é criada UMA única vez e compartilhada entre os testes,
// então o estado de um teste vaza para o outro. Conserte o isolamento para
// que cada teste comece com uma carteira nova (dica: beforeEach).
describe('desafio: isolamento com beforeEach', () => {
  const carteira = new Carteira(); // TODO: isto não isola os testes

  it('teste A deposita 100', () => {
    carteira.depositar(100);
    expect(carteira.total).toBe(100);
  });

  it('teste B deveria começar do zero', () => {
    // Falha porque o depósito do teste A vazou para cá.
    expect(carteira.total).toBe(0);
  });
});
