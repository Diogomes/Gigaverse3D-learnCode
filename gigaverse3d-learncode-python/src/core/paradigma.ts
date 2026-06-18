import type { Paradigma } from '../types.js';

export interface InfoParadigma {
  rotulo: string;
  icone: string;
  /** Cor de primeiro plano aceita pelo chalk/Ink (nome ou hex). */
  cor: string;
}

/** Rótulo, ícone e cor de cada paradigma — usados nos badges da UI. */
export const PARADIGMAS: Record<Paradigma, InfoParadigma> = {
  procedural: { rotulo: 'Procedural', icone: '🧱', cor: '#f59e0b' },
  estruturas: { rotulo: 'Estruturas de dados', icone: '🧩', cor: '#22d3ee' },
  oo: { rotulo: 'Orientado a Objetos', icone: '🎭', cor: '#a78bfa' },
  funcional: { rotulo: 'Funcional', icone: 'λ', cor: '#34d399' },
  transversal: { rotulo: 'Transversal', icone: '🛠', cor: '#94a3b8' },
};

export function infoParadigma(p: Paradigma): InfoParadigma {
  return PARADIGMAS[p];
}
