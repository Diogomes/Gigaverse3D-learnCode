import { describe, it, expect } from 'vitest';
import { classificar } from '../../sut/core/classificacao';

// Cobertura de ramos: um teste passando por CADA caminho do if/else.
// Juntos, estes quatro testes cobrem 100% dos ramos de classificar().
describe('classificar — cobertura de ramos', () => {
  it('abaixo de 100 → novato', () => {
    expect(classificar(50)).toBe('novato');
  });

  it('de 100 a 999 → veterano', () => {
    expect(classificar(500)).toBe('veterano');
  });

  it('1000 ou mais → lenda', () => {
    expect(classificar(1500)).toBe('lenda');
  });

  it('XP negativo → erro (o ramo de guarda também conta)', () => {
    expect(() => classificar(-1)).toThrow();
  });
});
