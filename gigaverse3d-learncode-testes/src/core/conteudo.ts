import type { Modulo } from '../types.js';

/**
 * Registro de carregadores de módulo (lazy import). Conforme cada fase escreve
 * o conteúdo de um módulo, adicione a entrada aqui. O menu usa
 * `moduloDisponivel` para saber o que já está liberado.
 */
const carregadores: Record<number, () => Promise<{ default: Modulo }>> = {
  1: () => import('../../content/modulo01.js'),
  2: () => import('../../content/modulo02.js'),
  3: () => import('../../content/modulo03.js'),
  4: () => import('../../content/modulo04.js'),
  5: () => import('../../content/modulo05.js'),
  6: () => import('../../content/modulo06.js'),
  7: () => import('../../content/modulo07.js'),
  8: () => import('../../content/modulo08.js'),
  9: () => import('../../content/modulo09.js'),
  10: () => import('../../content/modulo10.js'),
  11: () => import('../../content/modulo11.js'),
  12: () => import('../../content/modulo12.js'),
  13: () => import('../../content/modulo13.js'),
  14: () => import('../../content/modulo14.js'),
};

export function moduloDisponivel(id: number): boolean {
  return id in carregadores;
}

export async function carregarModulo(id: number): Promise<Modulo | null> {
  const carregar = carregadores[id];
  if (!carregar) return null;
  const modulo = await carregar();
  return modulo.default;
}
