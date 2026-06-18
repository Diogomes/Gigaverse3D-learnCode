import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const DIR = join(homedir(), '.gigaverse-learncode');
const ARQUIVO = join(DIR, 'progress-python.json');

/** XP necessário para subir cada nível. */
const XP_POR_NIVEL = 300;

export interface Progresso {
  xp: number;
  /** ids dos capítulos concluídos. */
  concluidos: number[];
}

const VAZIO: Progresso = { xp: 0, concluidos: [] };

export function carregarProgresso(): Progresso {
  try {
    if (!existsSync(ARQUIVO)) return { ...VAZIO };
    const dados = JSON.parse(readFileSync(ARQUIVO, 'utf8')) as Partial<Progresso>;
    return {
      xp: typeof dados.xp === 'number' ? dados.xp : 0,
      concluidos: Array.isArray(dados.concluidos) ? dados.concluidos : [],
    };
  } catch {
    return { ...VAZIO };
  }
}

function salvar(p: Progresso): void {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
  writeFileSync(ARQUIVO, JSON.stringify(p, null, 2), 'utf8');
}

/**
 * Marca um capítulo como concluído e soma o XP (uma única vez por capítulo).
 * Devolve o progresso atualizado.
 */
export function concluirCapitulo(id: number, xp: number): Progresso {
  const atual = carregarProgresso();
  if (atual.concluidos.includes(id)) return atual; // já contava; não soma de novo
  const novo: Progresso = {
    xp: atual.xp + xp,
    concluidos: [...atual.concluidos, id].sort((a, b) => a - b),
  };
  salvar(novo);
  return novo;
}

export function nivelDoXp(xp: number): number {
  return Math.floor(xp / XP_POR_NIVEL) + 1;
}

/** XP acumulado dentro do nível atual e o total para o próximo. */
export function progressoNivel(xp: number): { atual: number; total: number } {
  return { atual: xp % XP_POR_NIVEL, total: XP_POR_NIVEL };
}

export const CAMINHO_PROGRESSO = ARQUIVO;
