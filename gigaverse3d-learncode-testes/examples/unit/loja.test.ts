import { describe, it, expect, vi } from 'vitest';
import { comprar } from '../../sut/core/loja';

// Test doubles isolam a função sob teste de suas dependências.
describe('comprar com test doubles', () => {
  it('usa um STUB para o preço e um SPY para a notificação', () => {
    // STUB: uma dependência falsa que devolve um valor controlado.
    const pegarPreco = vi.fn().mockReturnValue(30);
    // SPY/MOCK: registra como foi chamado, para verificarmos depois.
    const aoVender = vi.fn();

    const saldoFinal = comprar(100, 'espada', pegarPreco, aoVender);

    // Verificamos o RETORNO...
    expect(saldoFinal).toBe(70);
    // ...e também a INTERAÇÃO (foi chamado? com quê? quantas vezes?).
    expect(aoVender).toHaveBeenCalledTimes(1);
    expect(aoVender).toHaveBeenCalledWith('espada', 70);
  });

  it('quando o preço excede o saldo, lança erro e NÃO notifica a venda', () => {
    const pegarPreco = vi.fn().mockReturnValue(150);
    const aoVender = vi.fn();

    expect(() => comprar(100, 'dragão', pegarPreco, aoVender)).toThrow('saldo insuficiente');

    // O preço foi consultado, mas a venda NUNCA foi notificada.
    expect(pegarPreco).toHaveBeenCalledWith('dragão');
    expect(aoVender).not.toHaveBeenCalled();
  });
});
