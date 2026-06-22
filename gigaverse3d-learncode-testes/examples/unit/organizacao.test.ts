import { describe, it, expect } from 'vitest';
import { calcularNivel } from '../../sut/core/nivel';
import { nomeJogadorValido } from '../../sut/core/validacoes';

// Organizar a suíte: describe agrupa por assunto (e pode aninhar), e it.each
// parametriza casos — um mesmo teste roda para uma tabela de entradas.
describe('regras de progressão', () => {
  // it.each roda o MESMO teste para cada linha da tabela: menos repetição.
  it.each([
    { xp: 0, nivel: 1 },
    { xp: 99, nivel: 1 },
    { xp: 100, nivel: 2 },
    { xp: 250, nivel: 3 },
  ])('XP $xp → nível $nivel', ({ xp, nivel }) => {
    expect(calcularNivel(xp)).toBe(nivel);
  });

  // describe aninhado agrupa um subtema dentro do tema maior.
  describe('nome do jogador', () => {
    it.each(['Aria', 'Bo123', 'a'.repeat(20)])('aceita "%s"', (nome) => {
      expect(nomeJogadorValido(nome)).toBe(true);
    });

    it.each(['', 'xy', 'a'.repeat(21)])('rejeita "%s"', (nome) => {
      expect(nomeJogadorValido(nome)).toBe(false);
    });
  });
});
