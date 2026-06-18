// Regras puras de XP/nível do Gigaverse.
// Função pura = mesmo input sempre dá o mesmo output, sem efeitos colaterais.
// Por isso é o tipo de código MAIS fácil de testar (base da pirâmide).

/** A cada 100 de XP sobe 1 nível. 0 XP = nível 1. */
export function calcularNivel(xp: number): number {
  if (xp < 0) throw new Error('XP não pode ser negativo');
  return Math.floor(xp / 100) + 1;
}

/** Quanto de XP falta para o próximo nível. */
export function xpParaProximoNivel(xp: number): number {
  if (xp < 0) throw new Error('XP não pode ser negativo');
  return 100 - (xp % 100);
}
