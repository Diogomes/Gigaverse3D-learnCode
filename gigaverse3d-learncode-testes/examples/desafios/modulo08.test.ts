import { describe, it, expect } from 'vitest';
import { calcularDano } from '../../sut/core/combate';

// DESAFIO — Módulo 8 (TDD)
// No espírito do TDD, o teste descreve o comportamento ANTES de tudo.
// Pela regra do dano mínimo, ataque igual à defesa ainda causa algum dano.
// Complete o Assert com o valor esperado para deixar VERDE.
describe('desafio: regra do dano mínimo', () => {
  it('ataque igual à defesa resulta no dano mínimo', () => {
    const dano = calcularDano(5, 5);
    expect(dano).toBe(0); // TODO: pela regra do dano mínimo, quanto deveria ser?
  });
});
