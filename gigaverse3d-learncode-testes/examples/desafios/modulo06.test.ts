import { describe, it, expect, vi } from 'vitest';
import { comprar } from '../../sut/core/loja';

// DESAFIO — Módulo 6 (test doubles)
// O spy aoVender deveria ser chamado UMA vez, com ('poção', 60). Os números e
// argumentos abaixo estão errados de propósito. Corrija-os para deixar VERDE.
describe('desafio: spy da notificação de venda', () => {
  it('aoVender é chamado uma vez com (item, saldoFinal)', () => {
    const pegarPreco = vi.fn().mockReturnValue(40);
    const aoVender = vi.fn();

    const saldoFinal = comprar(100, 'poção', pegarPreco, aoVender);

    expect(saldoFinal).toBe(60);
    expect(aoVender).toHaveBeenCalledTimes(0); // TODO: quantas vezes foi chamado?
    expect(aoVender).toHaveBeenCalledWith('errado', 0); // TODO: com quais argumentos?
  });
});
