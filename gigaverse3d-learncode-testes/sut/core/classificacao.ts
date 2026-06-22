// Classifica o jogador pela faixa de XP. Tem vários RAMOS (branches): a
// cobertura de ramos só chega a 100% se houver um teste passando por cada um.
export type Faixa = 'novato' | 'veterano' | 'lenda';

export function classificar(xp: number): Faixa {
  if (xp < 0) throw new Error('XP não pode ser negativo'); // ramo de guarda
  if (xp < 100) return 'novato';
  if (xp < 1000) return 'veterano';
  return 'lenda';
}
