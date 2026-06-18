import { describe, it, expect } from 'vitest';
import { calcularNivel } from '../../sut/core/nivel';

// Padrão AAA: Arrange (preparar) → Act (agir) → Assert (verificar).
describe('calcularNivel', () => {
  it('100 de XP leva ao nível 2', () => {
    // Arrange
    const xp = 100;
    // Act
    const nivel = calcularNivel(xp);
    // Assert
    expect(nivel).toBe(2);
  });

  it('0 de XP é nível 1 (caso de borda)', () => {
    expect(calcularNivel(0)).toBe(1);
  });

  it('XP negativo lança erro', () => {
    expect(() => calcularNivel(-10)).toThrow();
  });
});
