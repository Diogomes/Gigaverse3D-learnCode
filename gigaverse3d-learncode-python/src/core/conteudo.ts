import type { Capitulo } from '../types.js';

/**
 * Registro de carregadores de capítulo (lazy import). Conforme cada fase
 * escreve o conteúdo de um capítulo, adicione a entrada aqui. O menu usa
 * `capituloDisponivel` para saber o que já está liberado.
 */
const carregadores: Record<number, () => Promise<{ default: Capitulo }>> = {
  1: () => import('../../content/cap01.js'),
  2: () => import('../../content/cap02.js'),
  3: () => import('../../content/cap03.js'),
  5: () => import('../../content/cap05.js'),
  6: () => import('../../content/cap06.js'),
  7: () => import('../../content/cap07.js'),
  8: () => import('../../content/cap08.js'),
  9: () => import('../../content/cap09.js'),
  10: () => import('../../content/cap10.js'),
  11: () => import('../../content/cap11.js'),
  12: () => import('../../content/cap12.js'),
  13: () => import('../../content/cap13.js'),
  14: () => import('../../content/cap14.js'),
  15: () => import('../../content/cap15.js'),
  16: () => import('../../content/cap16.js'),
  17: () => import('../../content/cap17.js'),
  18: () => import('../../content/cap18.js'),
  19: () => import('../../content/cap19.js'),
  22: () => import('../../content/cap22.js'),
};

export function capituloDisponivel(id: number): boolean {
  return id in carregadores;
}

export async function carregarCapitulo(id: number): Promise<Capitulo | null> {
  const carregar = carregadores[id];
  if (!carregar) return null;
  const modulo = await carregar();
  return modulo.default;
}
