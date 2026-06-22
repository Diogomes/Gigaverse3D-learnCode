import { describe, it, expect } from 'vitest';
import { nomeJogadorValido } from '../../sut/core/validacoes';

// O padrão AAA em destaque: cada teste separa Arrange, Act e Assert.
describe('nomeJogadorValido', () => {
  it('aceita um nome com tamanho válido', () => {
    // Arrange — preparamos a entrada
    const nome = 'Aria';
    // Act — executamos a função sob teste
    const valido = nomeJogadorValido(nome);
    // Assert — verificamos o resultado
    expect(valido).toBe(true);
  });

  it('rejeita um nome curto demais (2 caracteres)', () => {
    // Arrange
    const nome = 'Ax';
    // Act
    const valido = nomeJogadorValido(nome);
    // Assert
    expect(valido).toBe(false);
  });

  it('ignora espaços nas pontas ao medir o tamanho', () => {
    // '  Bo  ' tem 6 caracteres, mas só 2 sem os espaços → inválido
    expect(nomeJogadorValido('  Bo  ')).toBe(false);
  });
});
