import { CAPITULOS_META } from '../../content/chapters.js';
import type { Capitulo, CapituloMeta } from '../types.js';

/**
 * Acesso ao conteúdo do curso (data-driven).
 *
 * O MENU usa os metadados (CAPITULOS_META). O conteúdo completo de cada
 * capítulo vive em `content/capNN.ts` e é carregado sob demanda por
 * `carregarCapitulo(id)` via import dinâmico — assim o app não precisa
 * conhecer estaticamente todos os capítulos que ainda serão escritos.
 */
export function listarCapitulos(): CapituloMeta[] {
  return [...CAPITULOS_META].sort((a, b) => a.id - b.id);
}

export function totalCapitulos(): number {
  return CAPITULOS_META.length;
}

/**
 * Carrega o objeto Capitulo completo de content/capNN.ts.
 * Retorna null se o capítulo ainda não tiver conteúdo escrito.
 */
export async function carregarCapitulo(id: number): Promise<Capitulo | null> {
  const nn = String(id).padStart(2, '0');
  try {
    const mod = (await import(`../../content/cap${nn}.js`)) as { default: Capitulo };
    return mod.default;
  } catch {
    return null;
  }
}

/** true se o capítulo já tem conteúdo completo disponível. */
export async function temConteudo(id: number): Promise<boolean> {
  return (await carregarCapitulo(id)) !== null;
}
