// Uma compra que DEPENDE de colaboradores externos:
//   - pegarPreco: consulta o preço do item (uma "consulta", devolve valor)
//   - aoVender:   notifica que a venda ocorreu (um "comando", efeito colateral)
// As dependências são INJETADAS (passadas por parâmetro). No teste, trocamos
// cada uma por um "test double": um STUB que devolve valor controlado e um
// SPY que registra como foi chamado.
export function comprar(
  saldo: number,
  item: string,
  pegarPreco: (item: string) => number,
  aoVender: (item: string, saldoFinal: number) => void,
): number {
  const preco = pegarPreco(item);
  if (preco > saldo) throw new Error('saldo insuficiente');
  const saldoFinal = saldo - preco;
  aoVender(item, saldoFinal);
  return saldoFinal;
}
