// Carteira de moedas do jogador. Mantém estado (saldo), então é ótima para
// demonstrar setup/teardown nos testes (recriar a carteira antes de cada teste).
export class Carteira {
  private saldo = 0;

  depositar(valor: number): void {
    if (valor <= 0) throw new Error('depósito deve ser positivo');
    this.saldo += valor;
  }

  sacar(valor: number): void {
    if (valor <= 0) throw new Error('saque deve ser positivo');
    if (valor > this.saldo) throw new Error('saldo insuficiente');
    this.saldo -= valor;
  }

  get total(): number {
    return this.saldo;
  }
}
