import { describe, it, expect } from 'vitest';
import { calcularDano } from '../../sut/core/combate';

// Estes testes nasceram ANTES da implementação. Cada um representa um ciclo
// red → green → refactor do TDD: primeiro o teste falha, depois o código cresce
// só o necessário para passar, depois limpa-se o código.
describe('calcularDano (construída via TDD)', () => {
  it('1º ciclo: dano é ataque menos defesa', () => {
    expect(calcularDano(10, 4)).toBe(6);
  });

  it('2º ciclo: dano mínimo é 1 quando a defesa supera o ataque', () => {
    expect(calcularDano(3, 10)).toBe(1);
  });
});
