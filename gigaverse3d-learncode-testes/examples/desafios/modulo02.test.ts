import { describe, it, expect } from 'vitest';
import { nomeJogadorValido } from '../../sut/core/validacoes';

// DESAFIO — Módulo 2 (padrão AAA)
// Escreva o corpo do teste seguindo as três fases: Arrange, Act, Assert.
// Um nome com exatamente 20 caracteres ainda é VÁLIDO (o limite superior).
describe('desafio: AAA para o limite superior do nome', () => {
  it('um nome de 20 caracteres é válido', () => {
    // Arrange — um nome com exatamente 20 caracteres
    const nome = 'A'.repeat(20);
    // Act — chame a função e guarde o resultado
    const valido = false; // TODO: troque por nomeJogadorValido(nome)
    // Assert
    expect(valido).toBe(true);
  });
});
