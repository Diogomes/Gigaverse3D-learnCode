import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import type { Progresso } from '../types.js';

const DIR_PROGRESSO = join(homedir(), '.gigaverse-learncode');
const ARQUIVO_PROGRESSO = join(DIR_PROGRESSO, 'progress.json');

const PROGRESSO_VAZIO: Progresso = {
  xp: 0,
  capitulosConcluidos: [],
  badges: [],
};

/** Lê o progresso salvo; retorna um progresso vazio se o arquivo não existir. */
export function carregarProgresso(): Progresso {
  try {
    if (!existsSync(ARQUIVO_PROGRESSO)) return { ...PROGRESSO_VAZIO };
    const bruto = readFileSync(ARQUIVO_PROGRESSO, 'utf-8');
    const dados = JSON.parse(bruto) as Partial<Progresso>;
    return {
      xp: dados.xp ?? 0,
      capitulosConcluidos: dados.capitulosConcluidos ?? [],
      badges: dados.badges ?? [],
    };
  } catch {
    // Arquivo corrompido: começa do zero sem quebrar o app.
    return { ...PROGRESSO_VAZIO };
  }
}

/** Salva o progresso em ~/.gigaverse-learncode/progress.json. */
export function salvarProgresso(p: Progresso): void {
  mkdirSync(DIR_PROGRESSO, { recursive: true });
  writeFileSync(ARQUIVO_PROGRESSO, JSON.stringify(p, null, 2), 'utf-8');
}

/** Marca um capítulo como concluído, concede XP e badge, e salva. */
export function concluirCapitulo(id: number, xp: number): Progresso {
  const p = carregarProgresso();
  if (!p.capitulosConcluidos.includes(id)) {
    p.capitulosConcluidos.push(id);
    p.badges.push(id);
    p.xp += xp;
    salvarProgresso(p);
  }
  return p;
}

/**
 * Regra de desbloqueio: o capítulo 1 está sempre liberado; os demais liberam
 * quando o capítulo anterior foi concluído.
 */
export function capituloDesbloqueado(id: number, p: Progresso): boolean {
  if (id <= 1) return true;
  return p.capitulosConcluidos.includes(id - 1);
}

/** Nível derivado do XP (100 XP por nível). */
export function nivel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

/** Caminho do arquivo de progresso (útil para exibir/depurar). */
export function caminhoProgresso(): string {
  return ARQUIVO_PROGRESSO;
}
