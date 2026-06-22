import { describe, it, expect } from 'vitest';
import { classificar } from '../../sut/core/classificacao';

// DESAFIO — Módulo 7 (cobertura)
// O ramo "lenda" (1000+ XP) está sem cobertura. Complete a asserção com a
// faixa correta para cobrir esse caminho e deixar a suíte VERDE.
describe('desafio: cobrir o ramo lenda', () => {
  it('1000 de XP classifica como lenda', () => {
    const faixa = classificar(1000);
    expect(faixa).toBe('novato'); // TODO: qual é a faixa com 1000 de XP?
  });
});
