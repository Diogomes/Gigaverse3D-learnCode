import { describe, it, expect, beforeEach } from 'vitest';
import { Carteira } from '../../sut/core/carteira';

// A Carteira tem ESTADO (saldo). Sem cuidado, um teste "vaza" para o outro.
// beforeEach recria a carteira antes de CADA teste → isolamento garantido.
describe('Carteira com setup', () => {
  let carteira: Carteira;

  beforeEach(() => {
    // Roda antes de cada it(): todo teste começa do zero.
    carteira = new Carteira();
  });

  it('começa com saldo zero', () => {
    expect(carteira.total).toBe(0);
  });

  it('depositar soma ao saldo', () => {
    carteira.depositar(100);
    expect(carteira.total).toBe(100);
  });

  it('sacar subtrai do saldo', () => {
    carteira.depositar(100);
    carteira.sacar(30);
    // Se o beforeEach não existisse, o depósito do teste anterior vazaria
    // para cá e este número estaria errado.
    expect(carteira.total).toBe(70);
  });
});
