import { describe, it, expect } from 'vitest';
import { Carteira } from '../../sut/core/carteira';

// DESAFIO — Módulo 4 (casos de borda e erros esperados)
// Teste o "caminho infeliz": sacar de uma carteira vazia deve lançar erro.
describe('desafio: sacar de carteira vazia', () => {
  it('sacar sem saldo lança "saldo insuficiente"', () => {
    const c = new Carteira();
    // Dica: para capturar o erro, passe uma FUNÇÃO ao expect: () => c.sacar(10)
    expect(c.sacar(10)).toThrow('saldo insuficiente'); // TODO: está chamando direto, sem a arrow function
  });
});
