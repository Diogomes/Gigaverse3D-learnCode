import { describe, it, expect } from 'vitest';
import { calcularNivel } from '../../sut/core/nivel';

// DESAFIO — Módulo 14 (organização da suíte)
// it.each parametriza a tabela de níveis. Um dos casos tem o nível errado de
// propósito e deixa a suíte VERMELHA. Corrija o valor para deixá-la VERDE.
describe('desafio: tabela de níveis com it.each', () => {
  it.each([
    { xp: 0, nivel: 1 },
    { xp: 100, nivel: 2 },
    { xp: 500, nivel: 9 }, // TODO: qual o nível com 500 de XP?
  ])('XP $xp → nível $nivel', ({ xp, nivel }) => {
    expect(calcularNivel(xp)).toBe(nivel);
  });
});
