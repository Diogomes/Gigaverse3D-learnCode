import { describe, it, expect } from 'vitest';
import { calcularNivel, xpParaProximoNivel } from '../../sut/core/nivel';
import { Carteira } from '../../sut/core/carteira';

// Bugs adoram os limites. Aqui testamos bordas e o "caminho infeliz" (erros).
describe('bordas de calcularNivel', () => {
  it('99, 100 e 101 de XP — o pulo de nível acontece exatamente em 100', () => {
    expect(calcularNivel(99)).toBe(1); // ainda nível 1
    expect(calcularNivel(100)).toBe(2); // vira nível 2 no limite
    expect(calcularNivel(101)).toBe(2); // logo acima, segue nível 2
  });

  it('XP negativo é entrada inválida → deve lançar erro', () => {
    // Passamos uma FUNÇÃO para o expect; o Vitest a chama e captura o erro.
    expect(() => calcularNivel(-1)).toThrow();
    // Dá para afirmar a mensagem também:
    expect(() => xpParaProximoNivel(-1)).toThrow('negativo');
  });
});

describe('bordas da Carteira', () => {
  it('sacar mais do que o saldo lança "saldo insuficiente"', () => {
    const c = new Carteira();
    c.depositar(50);
    expect(() => c.sacar(80)).toThrow('saldo insuficiente');
    expect(c.total).toBe(50); // e o saldo continua intacto após o erro
  });

  it('depositar valor não-positivo é rejeitado', () => {
    const c = new Carteira();
    expect(() => c.depositar(0)).toThrow();
    expect(() => c.depositar(-10)).toThrow();
  });
});
