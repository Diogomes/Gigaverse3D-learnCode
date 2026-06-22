import { describe, it, expect } from 'vitest';
import { calcularNivel } from '../../sut/core/nivel';

// DESAFIO — Módulo 1
// Este teste começa VERMELHO de propósito. Corrija o valor esperado para
// deixá-lo VERDE: qual nível corresponde a 250 de XP?
// (a cada 100 de XP sobe 1 nível, e 0 XP já é o nível 1)
describe('desafio: calcularNivel com 250 de XP', () => {
  it('250 de XP leva ao nível certo', () => {
    // Arrange
    const xp = 250;
    // Act
    const nivel = calcularNivel(xp);
    // Assert — troque o 0 pelo nível esperado
    expect(nivel).toBe(0); // TODO: corrija este valor
  });
});
