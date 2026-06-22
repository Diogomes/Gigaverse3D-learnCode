// Construída via TDD (test-first). A regra final foi descoberta em passos:
//   1º ciclo: dano = ataque - defesa
//   2º ciclo: o dano mínimo é 1, mesmo quando a defesa supera o ataque
// Cada passo começou com um teste VERMELHO; o código cresceu só o suficiente
// para deixá-lo VERDE; depois veio o refactor (esta linha enxuta).
export function calcularDano(ataque: number, defesa: number): number {
  return Math.max(1, ataque - defesa);
}
